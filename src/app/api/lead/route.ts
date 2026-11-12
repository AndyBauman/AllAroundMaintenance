import { NextResponse } from "next/server";
import { LEGAL_NAME, PHONE } from "@/lib/constants";
import { ELAPSED_FIELD, HONEYPOT_FIELD, detectSpam } from "@/lib/spam-guard";

export const runtime = "nodejs";

/**
 * Lead intake with no database: validate, drop obvious bots, email the lead through Resend.
 *
 * Required env (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   Resend API key
 *   NOTIFY_EMAIL     where leads go (comma-separated for several inboxes)
 * Optional:
 *   RESEND_FROM      verified sender, e.g. "All Around Maintenance Website <leads@yourdomain.com>"
 *
 * If the env is missing the visitor is told to call. A lead is never silently dropped.
 */

const CALL_US = `Please call ${PHONE} and we'll take care of you right away.`;

function oneLine(v: unknown, max = 200): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]+/g, " ").trim().slice(0, max) : "";
}

function multiLine(v: unknown, max = 4000): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g, " ").trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const lead = {
    name: oneLine(body.name, 120),
    phone: oneLine(body.phone, 40),
    email: oneLine(body.email, 160),
    service: oneLine(body.service, 120),
    location: oneLine(body.location, 120),
    address: oneLine(body.address, 200),
    message: multiLine(body.message),
    heard: oneLine(body.heard, 80),
    contextCity: oneLine(body.context_city, 80),
    page: oneLine(body.page, 200),
  };

  if (!lead.name || lead.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please enter your name and a phone number with area code." }, { status: 400 });
  }
  if (lead.email && !EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ error: "That email address doesn't look right. Please check it or leave it blank." }, { status: 400 });
  }

  // Bots get a normal-looking success so they don't adapt; nothing is sent.
  const spam = detectSpam({ name: lead.name, message: lead.message, honeypot: body[HONEYPOT_FIELD], elapsedMs: body[ELAPSED_FIELD] });
  if (spam) {
    console.warn(`[lead] dropped as spam (${spam})`);
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.NOTIFY_EMAIL ?? "")
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || to.length === 0) {
    console.error("[lead] RESEND_API_KEY or NOTIFY_EMAIL is not set; lead could not be delivered.");
    return NextResponse.json({ error: `Our online form isn't connected yet. ${CALL_US}` }, { status: 503 });
  }

  const from = process.env.RESEND_FROM?.trim() || "All Around Maintenance Website <onboarding@resend.dev>";
  const subject = `New estimate request: ${lead.service || "General"} (${lead.name})`;
  const text = [
    `New estimate request from the ${LEGAL_NAME} website`,
    ``,
    `Name:     ${lead.name}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email || "(not given)"}`,
    `Service:  ${lead.service || "(not selected)"}`,
    `City/ZIP: ${lead.location || "(not given)"}`,
    `Address:  ${lead.address || "(not given)"}`,
    `Heard:    ${lead.heard || "(not given)"}`,
    ``,
    `Message:`,
    lead.message || "(none)",
    ``,
    `Submitted from: ${lead.page || "(unknown page)"}${lead.contextCity ? ` (city page: ${lead.contextCity})` : ""}`,
    `Received: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} Pacific`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, ...(lead.email ? { reply_to: lead.email } : {}) }),
    });
    if (!res.ok) {
      console.error(`[lead] Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return NextResponse.json({ error: `We couldn't send your request just now. ${CALL_US}` }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] Resend request failed", err);
    return NextResponse.json({ error: `We couldn't send your request just now. ${CALL_US}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
