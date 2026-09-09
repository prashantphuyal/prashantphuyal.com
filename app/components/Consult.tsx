import { Check } from "lucide-react";
import { offer } from "@/lib/content";
import { Eyebrow, Headline, Section } from "./ui";
import { Reveal } from "./Reveal";
import { ConsultForm } from "./ConsultForm";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-[15px] font-bold tracking-[-0.01em]">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-fg-muted">
            <Check
              className="mt-0.5 size-4 shrink-0 text-amber-deep dark:text-amber-brand"
              strokeWidth={3}
              aria-hidden
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Consult() {
  return (
    <Section id="consult" className="border-t border-line">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{offer.eyebrow}</Eyebrow>
            <Headline lead="Let's find what's" accent="slowing you down" />
            <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-fg-muted">
              {offer.body}
            </p>
            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <List title={offer.who.title} items={offer.who.items} />
              <List title={offer.outcomes.title} items={offer.outcomes.items} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ConsultForm />
        </Reveal>
      </div>
    </Section>
  );
}
