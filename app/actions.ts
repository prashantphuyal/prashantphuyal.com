"use server";

import { sendLeadEmail, sesConfigured, type Lead } from "@/lib/email";

export type LeadState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

const MAX = { name: 120, business: 160, email: 200, phone: 40, message: 2000 };

const CONTACT_EMAIL = "prashant@blanxer.com";

function clean(v: FormDataEntryValue | null, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Honeypot — bots fill hidden fields
  if (clean(formData.get("company_website"), 200)) {
    return { ok: true, message: "Thanks — I'll be in touch shortly." };
  }

  const lead: Lead = {
    name: clean(formData.get("name"), MAX.name),
    business: clean(formData.get("business"), MAX.business),
    email: clean(formData.get("email"), MAX.email),
    phone: clean(formData.get("phone"), MAX.phone),
    companySize: clean(formData.get("companySize"), 80),
    help: formData.getAll("help").map((v) => String(v).slice(0, 80)),
    message: clean(formData.get("message"), MAX.message),
    submittedAt: new Date().toISOString(),
  };

  const errors: Record<string, string> = {};
  if (lead.name.length < 2) errors.name = "Your name, please.";
  if (lead.business.length < 2) errors.business = "Your business name, please.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email))
    errors.email = "That email doesn’t look right.";
  // Digit count only — any country's number is fine.
  if (lead.phone.replace(/\D/g, "").length < 7)
    errors.phone = "A number I can reach you on, please.";
  if (lead.message.length < 10) errors.message = "Tell me a bit about the business.";

  if (Object.keys(errors).length) {
    return { ok: false, message: "A few fields need fixing.", errors };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const failures: string[] = [];

  // Primary channel: email via SES.
  if (sesConfigured()) {
    try {
      await sendLeadEmail(lead);
      return { ok: true, message: "Thanks — I'll be in touch shortly." };
    } catch (err) {
      failures.push(`SES: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Fallback channel: a JSON webhook, if one is configured.
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`responded ${res.status}`);
      return { ok: true, message: "Thanks — I'll be in touch shortly." };
    } catch (err) {
      failures.push(`webhook: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Nothing configured at all — local dev. Log it so it isn't silently dropped.
  if (!failures.length) {
    console.warn(
      "[lead] no delivery channel configured (set SES vars or LEAD_WEBHOOK_URL); lead was:",
      JSON.stringify(lead)
    );
    return { ok: true, message: "Thanks — I'll be in touch shortly." };
  }

  // Every configured channel failed. Never lose the lead silently.
  console.error("[lead] delivery failed —", failures.join(" | "), JSON.stringify(lead));
  return {
    ok: false,
    message: `Couldn't send that, sorry. Please email me directly at ${
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL
    }.`,
  };
}
