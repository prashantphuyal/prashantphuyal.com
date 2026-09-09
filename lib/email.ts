import { AwsClient } from "aws4fetch";

/**
 * Sends the lead notification through the Amazon SES v2 HTTPS API.
 *
 * Uses aws4fetch (SigV4 over Web Crypto) rather than the AWS SDK: the SDK
 * pulls in Node built-ins and a lot of weight, which is a poor fit for the
 * Cloudflare Workers runtime this deploys to.
 */

export type Lead = {
  name: string;
  business: string;
  email: string;
  phone: string;
  companySize: string;
  help: string[];
  message: string;
  submittedAt: string;
};

/** Verified SES sender. MAIL_FROM is the canonical name; SES_FROM_EMAIL is an alias. */
function fromAddress() {
  const addr = process.env.MAIL_FROM || process.env.SES_FROM_EMAIL;
  if (!addr) return "";
  const name = process.env.MAIL_FROM_NAME?.trim();
  // Quote the display name so commas/periods in it can't break the header.
  return name ? `"${name.replace(/"/g, "")}" <${addr}>` : addr;
}

export function sesConfigured() {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      fromAddress() &&
      process.env.LEAD_NOTIFY_EMAIL
  );
}

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildBodies(lead: Lead) {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Business", lead.business],
    ["Email", lead.email],
    ["Phone / WhatsApp", lead.phone],
    ["Company size", lead.companySize || "—"],
    ["Needs help with", lead.help.length ? lead.help.join(", ") : "—"],
    ["Submitted", lead.submittedAt],
  ];

  const text = [
    "New consultation request",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    lead.message,
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f8f4ec;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#16110d">
  <div style="max-width:560px;margin:0 auto;padding:28px 20px">
    <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6f6156">
      prashantphuyal.com
    </p>
    <h1 style="margin:0 0 20px;font-size:22px;letter-spacing:-.02em">New consultation request</h1>
    <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden">
      ${rows
        .map(
          ([k, v]) => `<tr>
        <td style="padding:11px 14px;font-size:12px;font-weight:700;color:#6f6156;white-space:nowrap;border-bottom:1px solid #f1ebdf">${esc(
          k
        )}</td>
        <td style="padding:11px 14px;font-size:14px;border-bottom:1px solid #f1ebdf">${esc(v)}</td>
      </tr>`
        )
        .join("")}
    </table>
    <p style="margin:20px 0 6px;font-size:12px;font-weight:700;color:#6f6156">MESSAGE</p>
    <div style="background:#fff;border-radius:14px;padding:14px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(
      lead.message
    )}</div>
    <p style="margin:22px 0 0;font-size:13px">
      <a href="mailto:${esc(lead.email)}" style="color:#e08c00;font-weight:700">Reply to ${esc(
        lead.name
      )}</a>
    </p>
  </div>
</body></html>`;

  return { text, html };
}

/** Throws on failure so the caller can fall back to another channel. */
export async function sendLeadEmail(lead: Lead) {
  const region = process.env.AWS_REGION || "us-east-1";
  const from = fromAddress();
  const to = process.env.LEAD_NOTIFY_EMAIL!;

  const aws = new AwsClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region,
    service: "ses",
  });

  const { text, html } = buildBodies(lead);

  const res = await aws.fetch(
    `https://email.${region}.amazonaws.com/v2/email/outbound-emails`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        FromEmailAddress: from,
        Destination: { ToAddresses: [to] },
        // So hitting reply in the inbox goes straight to the lead.
        ReplyToAddresses: [lead.email],
        Content: {
          Simple: {
            Subject: {
              Data: `New enquiry — ${lead.name}, ${lead.business}`,
              Charset: "UTF-8",
            },
            Body: {
              Text: { Data: text, Charset: "UTF-8" },
              Html: { Data: html, Charset: "UTF-8" },
            },
          },
        },
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`SES responded ${res.status}: ${detail.slice(0, 400)}`);
  }
}
