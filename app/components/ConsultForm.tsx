"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { companySizeOptions, helpOptions } from "@/lib/content";
import { submitLead, type LeadState } from "../actions";

const initial: LeadState = { ok: false, message: "" };

const fieldBase =
  "w-full rounded-2xl border bg-surface-raised px-4 py-3 text-[15px] text-fg placeholder:text-fg-muted/70 transition-colors focus:border-amber-brand focus:outline-none";

function Label({ htmlFor, children, hint }: { htmlFor: string; children: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13.5px] font-semibold">
      {children}
      {hint && <span className="ml-1.5 font-normal text-fg-muted">{hint}</span>}
    </label>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[12.5px] font-medium text-red-600 dark:text-red-400">{msg}</p>;
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-2 rounded-pill bg-ink-900 py-2.5 pr-2 pl-6 text-[15px] font-semibold text-cream-100 shadow-lift transition-all hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cream-100 dark:text-ink-900 dark:hover:bg-cream-300"
    >
      {pending ? "Sending…" : "Request my free consultation"}
      <span className="grid size-8 place-items-center rounded-full bg-amber-brand text-ink-900 transition-transform group-hover:rotate-45">
        {pending ? (
          <Loader2 className="size-4 animate-spin" strokeWidth={2.6} aria-hidden />
        ) : (
          <ArrowUpRight className="size-4" strokeWidth={2.6} aria-hidden />
        )}
      </span>
    </button>
  );
}

export function ConsultForm() {
  const [state, action] = useActionState(submitLead, initial);

  if (state.ok) {
    return (
      <div className="rounded-[26px] border border-line bg-surface-raised p-8 text-center shadow-card sm:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-amber-brand">
          <Check className="size-7 text-ink-900" strokeWidth={3} aria-hidden />
        </span>
        <h3 className="font-display mt-5 text-2xl font-bold tracking-[-0.02em]">
          Request received
        </h3>
        <p className="mx-auto mt-2.5 max-w-md text-[14.5px] leading-relaxed text-fg-muted">
          {state.message} I read these myself, so you&apos;ll get a real reply.
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="rounded-[26px] border border-line bg-surface-raised p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Ram Bahadur"
            aria-invalid={!!state.errors?.name}
            className={`${fieldBase} ${state.errors?.name ? "border-red-500" : "border-line"}`}
          />
          <Err msg={state.errors?.name} />
        </div>

        <div>
          <Label htmlFor="business">Business name</Label>
          <input
            id="business"
            name="business"
            autoComplete="organization"
            required
            placeholder="Your company Pvt. Ltd."
            aria-invalid={!!state.errors?.business}
            className={`${fieldBase} ${state.errors?.business ? "border-red-500" : "border-line"}`}
          />
          <Err msg={state.errors?.business} />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@business.com"
            aria-invalid={!!state.errors?.email}
            className={`${fieldBase} ${state.errors?.email ? "border-red-500" : "border-line"}`}
          />
          <Err msg={state.errors?.email} />
        </div>

        <div>
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+977 … or any country code"
            aria-invalid={!!state.errors?.phone}
            className={`${fieldBase} ${state.errors?.phone ? "border-red-500" : "border-line"}`}
          />
          <Err msg={state.errors?.phone} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="companySize" hint="(optional)">
            Company size
          </Label>
          <select
            id="companySize"
            name="companySize"
            defaultValue=""
            className={`${fieldBase} border-line`}
          >
            <option value="">How many people?</option>
            {companySizeOptions.map((o: string) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="mb-2 text-[13.5px] font-semibold">
            What do you need help with?
            <span className="ml-1.5 font-normal text-fg-muted">(pick any)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {helpOptions.map((o) => (
              <label
                key={o}
                className="cursor-pointer rounded-pill border border-line px-3.5 py-2 text-[13px] font-medium transition-colors select-none has-checked:border-transparent has-checked:bg-amber-brand has-checked:text-ink-900 hover:border-fg-muted"
              >
                <input type="checkbox" name="help" value={o} className="sr-only" />
                {o}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <Label htmlFor="message">What&apos;s going on?</Label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="What you sell, and what's slowing you down."
            aria-invalid={!!state.errors?.message}
            className={`${fieldBase} resize-y ${
              state.errors?.message ? "border-red-500" : "border-line"
            }`}
          />
          <Err msg={state.errors?.message} />
        </div>
      </div>

      {/* Honeypot — hidden from humans, tempting to bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company_website">Website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {!state.ok && state.message && (
        <p
          role="alert"
          className="mt-5 rounded-2xl border border-red-500/40 bg-red-500/8 px-4 py-3 text-[13.5px] font-medium text-red-700 dark:text-red-300"
        >
          {state.message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Submit />
        <p className="text-[12.5px] text-fg-muted">
          Free, no obligation. Your details stay with me.
        </p>
      </div>
    </form>
  );
}
