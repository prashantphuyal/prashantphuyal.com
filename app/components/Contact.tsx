import { site } from "@/lib/content";
import { Socials } from "./Socials";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="size-8" />
            <span className="font-display text-[16px] font-bold tracking-[-0.02em]">
              {site.firstName}
              <span className="text-amber-brand">.</span>
            </span>
          </div>
          <p className="mt-3 text-[13.5px] text-fg-muted">
            © {new Date().getFullYear()} {site.name} · Blanxer Technology Pvt. Ltd.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] font-semibold">
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-amber-brand decoration-2 underline-offset-2"
            >
              {site.email}
            </a>
            <span className="text-fg-muted" aria-hidden>
              ·
            </span>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-amber-brand decoration-2 underline-offset-2"
            >
              {site.whatsapp}
            </a>
          </div>
        </div>
        <Socials />
      </div>
    </footer>
  );
}
