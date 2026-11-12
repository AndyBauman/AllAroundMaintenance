/** Hidden input real visitors never see; form-filling bots populate it. */
export const HONEYPOT_FIELD = "company_site";
/** Milliseconds between the form mounting and submit, measured on the client. */
export const ELAPSED_FIELD = "form_elapsed_ms";

const MIN_FILL_MS = 3000;

export type SpamSignals = {
  name?: string | null;
  message?: string | null;
  honeypot?: unknown;
  elapsedMs?: unknown;
};

/** Single word of letters with several capitals mid-word, e.g. "fVveoAxYnqbFXTnQ". */
function isRandomToken(value: string | null | undefined): boolean {
  const t = (value ?? "").trim();
  if (t.length < 8 || !/^[A-Za-z]+$/.test(t)) return false;
  return (t.slice(1).match(/[A-Z]/g) ?? []).length >= 3;
}

/** Returns a reason string when the submission looks automated, otherwise null. */
export function detectSpam(s: SpamSignals): string | null {
  if (typeof s.honeypot === "string" && s.honeypot.trim()) return "honeypot";

  if (s.elapsedMs != null && s.elapsedMs !== "") {
    const elapsed = Number(s.elapsedMs);
    if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) return "too_fast";
  }

  if (isRandomToken(s.name) && isRandomToken(s.message)) return "random_text";

  return null;
}
