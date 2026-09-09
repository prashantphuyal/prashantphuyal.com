import { ArrowUpRight, Check } from "lucide-react";
import { ventures } from "@/lib/content";
import { Eyebrow, Headline, Section } from "./ui";
import { Reveal } from "./Reveal";

const skins = {
  amber: {
    card: "bg-amber-brand text-ink-900 border-transparent",
    kind: "bg-ink-900/12 text-ink-900",
    body: "text-ink-900/75",
    tick: "text-ink-900",
    arrow: "bg-ink-900 text-amber-brand",
  },
  ink: {
    card: "bg-ink-900 text-cream-100 border-transparent dark:bg-ink-800",
    kind: "bg-cream-100/12 text-cream-100",
    body: "text-cream-100/70",
    tick: "text-amber-brand",
    arrow: "bg-amber-brand text-ink-900",
  },
  outline: {
    card: "bg-surface-raised text-fg border-line",
    kind: "bg-ink-900/8 text-fg dark:bg-cream-100/10",
    body: "text-fg-muted",
    tick: "text-amber-deep dark:text-amber-brand",
    arrow: "bg-amber-brand text-ink-900",
  },
} as const;

export function Ventures() {
  return (
    <Section id="ventures">
      <div className="mb-9">
        <Eyebrow>Ventures</Eyebrow>
        <Headline lead="What I'm" accent="Building" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ventures.map((v, i) => {
          const s = skins[v.accent];
          const external = v.href.startsWith("http");
          return (
            <Reveal key={v.name} delay={i * 0.08}>
              <article
                className={`flex h-full flex-col rounded-[26px] border p-6 shadow-lift transition-transform duration-300 hover:-translate-y-1 ${s.card}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`rounded-pill px-3 py-1.5 text-[12px] font-semibold ${s.kind}`}
                  >
                    {v.kind}
                  </span>
                  <a
                    href={v.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`Open ${v.name}`}
                    className={`grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-200 hover:rotate-45 ${s.arrow}`}
                  >
                    <ArrowUpRight className="size-[17px]" strokeWidth={2.6} aria-hidden />
                  </a>
                </div>

                <h3 className="font-display mt-5 text-2xl font-bold tracking-[-0.02em]">
                  {v.name}
                </h3>
                <p className={`mt-2.5 text-[14px] leading-relaxed ${s.body}`}>{v.blurb}</p>

                <ul className="mt-5 flex flex-col gap-2 border-t border-current/12 pt-4">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[13.5px] font-medium">
                      <Check className={`size-4 shrink-0 ${s.tick}`} strokeWidth={3} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
