import { aboutFacts, aboutParas, site } from "@/lib/content";
import { Button, Section } from "./ui";
import { Reveal } from "./Reveal";
import { PortraitCard } from "./Portrait";

export function About() {
  return (
    <div className="bg-ink-900 text-cream-100 dark:bg-ink-800">
      <Section id="about">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="order-2 md:order-1">
            <div className="relative mx-auto max-w-[380px]">
              <PortraitCard />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 md:order-2">
            <div className="mb-3.5 inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wide">
              <span className="flex items-center">
                <span className="size-2.5 rounded-full bg-cream-100" />
                <span className="-ml-1 size-2.5 rounded-full bg-amber-brand" />
              </span>
              <span className="text-cream-100/60">About me</span>
            </div>

            <h2 className="font-display text-[clamp(1.9rem,5.2vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.02em]">
              Who is{" "}
              <span className="text-amber-brand">
                {site.firstName} {site.lastName}
              </span>
              ?
            </h2>

            <div className="mt-5 flex flex-col gap-3.5">
              {aboutParas.map((p) => (
                <p key={p.slice(0, 24)} className="text-[14.5px] leading-relaxed text-cream-100/70">
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-cream-100/12 pt-6">
              {aboutFacts.map((f) => (
                <div key={f.k}>
                  <dt className="text-[12px] font-semibold tracking-wide text-cream-100/45 uppercase">
                    {f.k}
                  </dt>
                  <dd className="mt-1 text-[14px] font-semibold">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <Button href="#consult">Get a free consultation</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
