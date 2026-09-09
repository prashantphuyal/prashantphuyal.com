import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { socials } from "@/lib/content";

/** lucide ships no TikTok or WhatsApp mark, so both are inlined. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.85-2.48V9.78a5.62 5.62 0 1 0 4.94 5.58V8.66a7.32 7.32 0 0 0 4.27 1.38V6.95a4.28 4.28 0 0 1-3.21-1.13Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.25-.67.84-.82 1.01-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.3.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.39-.77-1.9-.2-.5-.41-.42-.56-.42-.15 0-.31-.02-.48-.02-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.77 2.72 4.3 3.72 2.1.83 2.53.66 2.98.62.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

const icons = {
  instagram: Instagram,
  tiktok: TikTokIcon,
  linkedin: Linkedin,
  facebook: Facebook,
  whatsapp: WhatsAppIcon,
  mail: Mail,
} as const;

/** Links that shouldn't open a new tab (mailto/tel schemes). */
const sameTab = new Set(["mail"]);

export function Socials({
  className = "",
  compact = false,
  omit = [],
}: {
  className?: string;
  /** Smaller icons + tighter gap, for narrow columns like the hero rail. */
  compact?: boolean;
  /** Icon keys to leave out (e.g. ["mail"] where the address is already shown). */
  omit?: string[];
}) {
  const items = socials.filter((s) => !omit.includes(s.icon));
  return (
    <ul className={`flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"} ${className}`}>
      {items.map((s) => {
        const Icon = icons[s.icon];
        const newTab = !sameTab.has(s.icon);
        return (
          <li key={s.label}>
            <a
              href={s.href}
              {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={s.label}
              title={s.label}
              className={`grid place-items-center rounded-full bg-ink-900 text-cream-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-brand hover:text-ink-900 dark:bg-cream-100 dark:text-ink-900 dark:hover:bg-amber-brand ${
                compact ? "size-8" : "size-9"
              }`}
            >
              <Icon className={compact ? "size-[14px]" : "size-[15px]"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
