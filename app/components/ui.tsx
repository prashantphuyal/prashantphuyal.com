import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:px-8 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wide">
      <span className="flex items-center">
        <span className="size-2.5 rounded-full bg-ink-900 dark:bg-cream-100" />
        <span className="-ml-1 size-2.5 rounded-full bg-amber-brand" />
      </span>
      <span className="text-fg-muted">{children}</span>
    </div>
  );
}

/** Headline where the final phrase is amber, matching the reference type treatment. */
export function Headline({
  lead,
  accent,
  className = "",
}: {
  lead: string;
  accent?: string;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(1.9rem,5.2vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.02em] ${className}`}
    >
      {lead}{" "}
      {accent && <span className="text-amber-deep dark:text-amber-brand">{accent}</span>}
    </h2>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "dark";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "solid",
  external,
  className = "",
}: BtnProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-pill pl-6 pr-2 py-2 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98]";
  const styles = {
    solid:
      "bg-amber-brand text-ink-900 hover:bg-amber-bright shadow-lift hover:shadow-card",
    outline:
      "border border-line bg-surface-raised text-fg hover:border-ink-900/30 dark:hover:border-cream-100/30 shadow-lift",
    dark: "bg-ink-900 text-cream-100 hover:bg-ink-700 dark:bg-cream-100 dark:text-ink-900 dark:hover:bg-cream-300 shadow-lift",
  }[variant];

  const dot = {
    solid: "bg-ink-900 text-amber-brand",
    outline: "bg-amber-brand text-ink-900",
    dark: "bg-amber-brand text-ink-900",
  }[variant];

  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`grid size-8 place-items-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${dot}`}
      >
        <ArrowUpRight className="size-4" strokeWidth={2.6} aria-hidden />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {inner}
    </Link>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-pill border border-current/15 px-3 py-1.5 text-[12.5px] font-medium">
      {children}
    </span>
  );
}
