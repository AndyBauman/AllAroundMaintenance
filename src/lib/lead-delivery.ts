import { createHash } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { LEGAL_NAME } from "@/lib/constants";
import type { QuoteLead } from "@/lib/lead";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

type StoredLead = Omit<QuoteLead, "company_website" | "rendered_at">;

export type DeliveryResult = { ok: true } | { ok: false; status: number };

function configured() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
  const publishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    "";
  const leadSecret = process.env.LEAD_DB_SECRET?.trim() || "";
  const resendKey = process.env.RESEND_API_KEY?.trim() || "";
  const to = (process.env.LEAD_TO_EMAIL || process.env.NOTIFY_EMAIL || "")
    .split(/[,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const from = process.env.LEAD_FROM_EMAIL?.trim() || process.env.RESEND_FROM?.trim() || "";
  return { supabaseUrl, serviceKey, publishableKey, leadSecret, resendKey, to, from };
}

function admin(): SupabaseClient | null {
  const { supabaseUrl, serviceKey } = configured();
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function gate(): { client: SupabaseClient; secret: string } | null {
  const { supabaseUrl, publishableKey, leadSecret } = configured();
  if (!supabaseUrl || !publishableKey || !leadSecret) return null;
  return {
    secret: leadSecret,
    client: createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    }),
  };
}

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const real = request.headers.get("x-real-ip")?.trim();
  return real || null;
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

function emailText(lead: StoredLead): string {
  const line = (label: string, value: string | null) => `${label}: ${value || "(not given)"}`;
  return [
    `New quote request from the ${LEGAL_NAME} website`,
    "",
    line("Name", lead.name),
    line("Email", lead.email),
    line("Phone", lead.phone),
    line("Heard", lead.heard_from),
    line(lead.heard_from === "Referral" ? "Referral" : "Heard detail", lead.heard_detail),
    line("Services", lead.services.length ? lead.services.join(", ") : null),
    line("Street", lead.street),
    line("City", lead.city),
    line("State", lead.state),
    line("ZIP", lead.zip),
    "",
    "How we can help:",
    lead.message,
    "",
    line("Page", lead.page_url),
    line("Referrer", lead.referrer),
    line("UTM source", lead.utm_source),
    line("UTM medium", lead.utm_medium),
    line("UTM campaign", lead.utm_campaign),
    line("UTM term", lead.utm_term),
    line("UTM content", lead.utm_content),
    line("gclid", lead.gclid),
    line("fbclid", lead.fbclid),
    `Received: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} Pacific`,
  ].join("\n");
}

async function sendEmail(lead: StoredLead): Promise<{ ok: true } | { ok: false; error: string }> {
  const { resendKey, to, from } = configured();
  if (!resendKey || to.length === 0 || !from) {
    const missing = [
      !resendKey ? "RESEND_API_KEY" : "",
      to.length === 0 ? "LEAD_TO_EMAIL" : "",
      !from ? "LEAD_FROM_EMAIL" : "",
    ].filter(Boolean);
    return { ok: false, error: `${missing.join(", ")} is not set` };
  }

  const services = lead.services.slice(0, 3).join(", ");
  const subject = `New quote request: ${lead.name}${services ? ` (${services})` : ""}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject,
        text: emailText(lead),
        reply_to: lead.email,
      }),
    });
    if (!res.ok) return { ok: false, error: `Resend responded ${res.status}` };
    return { ok: true };
  } catch {
    return { ok: false, error: "Resend request failed" };
  }
}

/**
 * Save the lead first, then email it. A saved lead is a success even when
 * email is not configured yet. Nothing is stored when neither store nor
 * email can accept it.
 */
function leadPayload(lead: StoredLead, ipHash: string | null, userAgent: string | null) {
  return {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    heard_from: lead.heard_from,
    heard_detail: lead.heard_detail,
    services: lead.services,
    street: lead.street,
    city: lead.city,
    state: lead.state,
    zip: lead.zip,
    message: lead.message,
    page_url: lead.page_url,
    referrer: lead.referrer,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_term: lead.utm_term,
    utm_content: lead.utm_content,
    gclid: lead.gclid,
    fbclid: lead.fbclid,
    user_agent: userAgent,
    ip_hash: ipHash,
  };
}

export async function deliverLead(lead: StoredLead, request: Request): Promise<DeliveryResult> {
  const db = admin();
  const gated = db ? null : gate();
  const ip = clientIp(request);
  const ipHash = ip ? hashIp(ip) : null;
  const userAgent = request.headers.get("user-agent")?.slice(0, 400) || null;

  if (db && ipHash) {
    const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const { count, error } = await db
      .from("site_leads")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);
    if (!error && (count ?? 0) >= RATE_MAX) return { ok: false, status: 429 };
  }

  let savedId: string | null = null;
  if (db) {
    const { data, error } = await db
      .from("site_leads")
      .insert({ ...leadPayload(lead, ipHash, userAgent), email_status: "pending" })
      .select("id")
      .single();
    if (error) console.error("[lead] could not store the request");
    else savedId = typeof data?.id === "string" ? data.id : null;
  } else if (gated) {
    const { data, error } = await gated.client.rpc("accept_site_lead", {
      payload: leadPayload(lead, ipHash, userAgent),
      secret: gated.secret,
    });
    if (error?.message?.includes("rate_limited")) return { ok: false, status: 429 };
    if (error) console.error("[lead] could not store the request");
    else savedId = typeof data === "string" ? data : null;
  } else {
    console.error("[lead] SUPABASE_URL and a database key are not set");
  }

  const emailed = await sendEmail(lead);
  const emailUpdate = emailed.ok
    ? { email_status: "sent", email_error: null }
    : { email_status: "failed", email_error: emailed.error };
  if (db && savedId) {
    const { error } = await db.from("site_leads").update(emailUpdate).eq("id", savedId);
    if (error) console.error("[lead] could not record the email result");
  } else if (gated && savedId) {
    const { error } = await gated.client.rpc("record_site_lead_email", {
      lead_id: savedId,
      email_status: emailUpdate.email_status,
      email_error: emailUpdate.email_error,
      secret: gated.secret,
    });
    if (error) console.error("[lead] could not record the email result");
  }

  if (emailed.ok || savedId) return { ok: true };
  console.error(`[lead] request was not delivered: ${emailed.error}`);
  return { ok: false, status: 503 };
}
