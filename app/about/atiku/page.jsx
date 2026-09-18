import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { assets } from "@/assets/assets";
import { bio, record, offices, priorities } from "@/lib/atiku";
import JoinCta from "@/components/JoinCta";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata = {
  title: "Who is Atiku",
  description:
    "H.E. Atiku Abubakar: Deputy Director of Customs, Vice President of the Federal Republic 1999–2007, founder of the American University of Nigeria. The public record, office by office.",
};

export default function WhoIsAtiku() {
  return (
    <>
      <PageHeader
        breadcrumb="Who is Atiku"
        kicker="The presidential aspirant"
        title="Who is Atiku?"
        lead="Twenty years in the federal service. Two terms as Vice President of the Federal Republic. A working life spent arguing that the centre holds too much."
        image={assets.atikuSpeakingWide}
        imagePosition="object-[center_35%]"
      />

      {/* ------------------------------------------------------------- bio */}
      <Section className="bg-white">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading index={1} eyebrow="In brief" title="The short answer" />
            <div className="prose-body mt-12 space-y-5">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* The record, as four figures. Anything more belongs on the plan. */}
          <aside className="min-w-0">
            <h2 className="border-t-2 border-ink-950 pt-5 text-[0.6875rem] font-bold tracking-[0.12em] text-ink-500 uppercase">
              The record
            </h2>
            <dl className="mt-6 divide-y divide-ink-200 border-b border-ink-200">
              {record.map((item) => (
                <div key={item.label} className="flex items-baseline gap-4 py-4">
                  <dd className="flex shrink-0 items-baseline gap-1">
                    <Counter
                      value={item.value}
                      suffix={item.suffix}
                      className="font-display text-fluid-xl font-extrabold tracking-[-0.04em] text-brand-600 tabular-nums"
                    />
                    {item.unit && (
                      <span className="font-display text-[0.6875rem] font-bold tracking-[0.1em] text-ink-400 uppercase">
                        {item.unit}
                      </span>
                    )}
                  </dd>
                  <dt className="text-[0.8125rem] leading-snug text-content-muted">
                    {item.label}
                  </dt>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {/* --------------------------------------------------------- offices */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={2}
          eyebrow="Public offices and undertakings"
          title="Office by office, 1969 to today"
        />

        <ol className="mt-14 space-y-px bg-ink-200">
          {offices.map((office, index) => (
            <Reveal as="li" key={office.id} delay={index * 60}>
              <article className="grid gap-6 bg-white p-6 md:grid-cols-[13rem_1fr] md:gap-10 md:p-8">
                <div className="min-w-0">
                  <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-square">
                    <Image
                      src={office.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 13rem, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <p className="mt-4 font-display text-[0.6875rem] font-bold tracking-[0.12em] text-ember-600 uppercase">
                    {office.period}
                  </p>
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-fluid-xl leading-tight font-extrabold tracking-[-0.02em] text-ink-950">
                    {office.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] font-bold tracking-[0.1em] text-ink-500 uppercase">
                    {office.location}
                  </p>
                  <p className="prose-body mt-4 text-[0.9375rem]">
                    {office.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-ink-200 pt-5">
                    {office.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.875rem] leading-snug text-content-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 bg-brand-600"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------ priorities */}
      {/* Kept visibly apart from the record above, and labelled as positions
          rather than as achievements, so that nothing here can be read as
          something already done. */}
      <Section className="border-t border-ink-200 bg-white">
        <SectionHeading
          index={3}
          eyebrow="Stated positions"
          title="What the ticket is for"
          lead="Not a record — an intention. These are positions he has argued for over three decades in national politics. They are what this movement was formed to carry to the wards."
        />

        <ol className="mt-14 grid gap-px bg-ink-200 sm:grid-cols-2">
          {priorities.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 60} className="bg-white">
              <article className="flex h-full flex-col p-7 lg:p-8">
                <p className="font-display text-[0.6875rem] font-bold tracking-[0.12em] text-ember-600 tabular-nums uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-fluid-lg leading-tight font-extrabold tracking-[-0.02em] text-ink-950">
                  {item.title}
                </h3>
                <p className="prose-body mt-3 text-[0.9375rem]">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ------------------------------------------------------ photographs */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={4}
          eyebrow="In pictures"
          title="Atiku Abubakar"
        />

        <PhotoGallery
          photos={[
            { src: assets.atikuWaving, alt: "Atiku Abubakar waving, in a blue kaftan and cap" },
            { src: assets.atikuSpeaking, alt: "Atiku Abubakar speaking into a microphone" },
            { src: assets.atikuStudioSmile, alt: "Atiku Abubakar in a blue kaftan and cap, smiling" },
            { src: assets.atikuCasual, alt: "Atiku Abubakar seated, in a striped shirt, laughing" },
            { src: assets.atikuSeated, alt: "Atiku Abubakar seated in a wicker chair, hands clasped" },
            { src: assets.atikuRobeChair, alt: "Atiku Abubakar in a blue agbada, seated in a carved chair" },
            { src: assets.atikuSuitMono, alt: "Atiku Abubakar in a pinstripe suit, in black and white" },
            { src: assets.atikuLaughing, alt: "Atiku Abubakar laughing, in a patterned kaftan and cap" },
            { src: assets.atikuSpeakingBlue, alt: "Atiku Abubakar speaking, seated, in a blue kaftan" },
          ]}
        />
      </Section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="bg-brand-700">
        <div className="shell shell-wide py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-fluid-3xl text-white">
                One ticket, two records.
              </h2>
              <p className="mt-4 text-fluid-lg leading-relaxed text-white/70">
                The running mate brought the railways. Read his record next, or
                read what the two of them intend to do with the office.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/about/amaechi" variant="inverse" size="lg">
                Who is Amaechi?
                <ArrowRight size={17} strokeWidth={2.75} />
              </Button>
              <JoinCta variant="inverseOutline" size="lg" arrow={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
