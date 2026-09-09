import { clients, metrics } from "@/lib/content";
import { Eyebrow, Headline, Section } from "./ui";
import { Reveal } from "./Reveal";

export function Proof() {
  return (
    <Section id="proof" className="border-y border-line">
      <div className="mb-9">
        <Eyebrow>Proof</Eyebrow>
        <Headline lead="A Bit of" accent="Proof" />
      </div>

      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.07}>
            <div className="h-full rounded-[22px] border border-line bg-surface-raised p-5 shadow-lift">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="font-display block text-[clamp(1.75rem,4.5vw,2.5rem)] leading-none font-bold tracking-[-0.03em] text-amber-deep dark:text-amber-brand">
                  {m.value}
                </span>
                <span className="mt-2 block text-[13px] leading-snug font-medium text-fg-muted">
                  {m.label}
                </span>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <p className="mb-4 text-[13px] font-semibold tracking-wide text-fg-muted uppercase">
            Brands running on Blanxer
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {clients.map((c) => (
              <li
                key={c}
                className="font-display rounded-pill border border-line bg-surface-raised px-4 py-2.5 text-[15px] font-bold tracking-[-0.01em] shadow-lift"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
