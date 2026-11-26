import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/lead-delivery";
import { leadFieldErrors, quoteLeadSchema, spamReason } from "@/lib/lead";

export const runtime = "nodejs";

/**
 * Quote form intake. Validates, drops obvious bots, saves to site_leads when
 * Supabase is configured, then emails through Resend. A lead is not reported
 * as sent unless it was saved or emailed.
 */

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = quoteLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the highlighted fields.", fieldErrors: leadFieldErrors(parsed.error) }, { status: 400 });
  }

  const { company_website, rendered_at, ...stored } = parsed.data;
  const spam = spamReason({
    honeypot: company_website,
    renderedAt: rendered_at,
    name: stored.name,
    message: stored.message,
  });
  if (spam) {
    console.warn(`[lead] dropped as spam (${spam})`);
    return NextResponse.json({ ok: true });
  }

  const result = await deliverLead(stored, request);
  if (!result.ok) {
    return NextResponse.json({ error: "Something went wrong sending your request." }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
