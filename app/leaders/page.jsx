import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import JoinCta from "@/components/JoinCta";
import { leaders, sharedTimeline } from "@/lib/leaders";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Our Leaders",
  description:
    "H.E. Atiku Abubakar for President and Rt. Hon. Chibuike Rotimi Amaechi for Vice President: who they are, what each has held, and where the two careers meet.",
};

/* One marker colour per man, used on the timeline and in its key. Ember for
   the head of the ticket and brand green for the running mate, so the two can
   be told apart at a glance in a list where they alternate. */
const tone = {
  atiku: { dot: "bg-ember-500", text: "text-ember-600" },
  amaechi: { dot: "bg-brand-600", text: "text-brand-700" },
};

/**
 * Our Leaders: the ticket, introduced.
 *
 * ── WHAT THIS PAGE IS FOR ──────────────────────────────────────────────────
 * The two profile pages answer "who is he?" in full, one man at a time. This
 * page answers the question a visitor usually has first, which is smaller:
 * who are these two, and why these two together? So it is an introduction and
 * a hand-off, not a third copy of the records. Each man gets a summary, his
 * four figures, and a clear way through to the rest.
 *
 * ── EQUAL, NOT IDENTICAL ───────────────────────────────────────────────────
 * The two cards are set at the same size, in the same grid, with the same
 * structure. That says "joint ticket". The office label above each name is
 * what says who is standing for what, so the layout never has to rank them.
 * Head of the ticket is first in reading order, and that is the only ranking.
 *
 * ── THE TIMELINE ───────────────────────────────────────────────────────────
 * The one thing only this page can show. Separately, each profile is a list of
 * offices. On one axis they show how the two careers relate: Customs and
 * business while Amaechi entered Rivers politics, then 1999, when one became
 * Vice President and the other became Speaker. It lists titles and dates and
 * nothing else, as a pointer to the profiles rather than a replacement for them.
 *
 * Nothing on this page is written here. Every summary, figure and office comes
 * from lib/atiku.js and lib/amaechi.js through lib/leaders.js, so this page and
 * the profiles cannot disagree.
 * ───────────────────────────────────────────────────────────────────────────
 */
export default function Leaders() {
  const timeline = sharedTimeline();

  return (
    <>
      <PageHeader
        breadcrumb="Our Leaders"
        kicker="The ticket"
        title="Our Leaders"
        lead="A former Vice President of the Federal Republic for President, and a former Minister of Transportation for Vice President, on the platform of the African Democratic Congress."
      />

      {/* ------------------------------------------------------ the ticket */}
      <Section className="bg-white">
        <SectionHeading
          index={1}
          eyebrow="The ticket"
          title="Who is standing, and for what"
        />

        <ul className="mt-14 grid gap-px bg-ink-200 lg:grid-cols-2">
          {leaders.map((leader, index) => (
            <Reveal as="li" key={leader.slug} delay={index * 90} className="bg-white">
              <article className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                  <div className="relative aspect-4/5 w-36 shrink-0 overflow-hidden bg-ink-100 sm:w-40 lg:w-44">
                    <Image
                      src={leader.portrait}
                      alt={`${leader.prefix} ${leader.name}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 11rem, 10rem"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-display text-[0.6875rem] font-bold tracking-[0.18em] text-ember-600 uppercase">
                      {leader.office}
                    </p>
                    <p className="mt-4 text-[0.625rem] font-bold tracking-[0.24em] text-ink-500 uppercase">
                      {leader.prefix}
                    </p>
                    <h2 className="mt-1.5 font-display text-fluid-2xl leading-[1.05] font-extrabold tracking-[-0.03em] text-ink-950">
                      {leader.name}
                    </h2>
                    <p className="mt-2.5 text-[0.6875rem] font-bold tracking-[0.16em] text-brand-600 uppercase">
                      {leader.honorific}
                    </p>
                  </div>
                </div>

                <p className="prose-body mt-7 text-[0.9375rem]">{leader.summary}</p>

                {/* Four figures, two by two. Numbers are what a skimming reader
                    stops on, so they get the weight; the labels stay quiet. */}
                <dl className="mt-8 grid grid-cols-2 gap-px border-y border-ink-200 bg-ink-200">
                  {leader.record.map((item) => (
                    <div key={item.label} className="bg-white py-5 pr-4 odd:pl-0 even:pl-5">
                      <dd className="flex items-baseline gap-1">
                        <Counter
                          value={item.value}
                          suffix={item.suffix}
                          className="font-display text-fluid-xl font-extrabold tracking-[-0.04em] text-brand-600 tabular-nums"
                        />
                        {item.unit && (
                          <span className="font-display text-[0.625rem] font-bold tracking-[0.1em] text-ink-400 uppercase">
                            {item.unit}
                          </span>
                        )}
                      </dd>
                      <dt className="mt-1.5 text-[0.8125rem] leading-snug text-content-muted">
                        {item.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-8">
                  <Button href={leader.href} variant="primary" size="md">
                    {leader.question}
                    <ArrowRight size={16} strokeWidth={2.75} />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- timeline */}
      <Section className="border-t border-ink-200 bg-ink-50">
        <SectionHeading
          index={2}
          eyebrow="Side by side"
          title="Two careers, one timeline"
          lead="Every public office each man has held, on the same axis. In 1999 one became Vice President of the Federal Republic, and the other became Speaker of the Rivers State House of Assembly."
        />

        {/* The key. Colour is never the only signal: every row also names its
            man in text, so the timeline reads the same without colour vision. */}
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3" aria-label="Key">
          {leaders.map((leader) => (
            <li key={leader.slug} className="flex items-center gap-2.5">
              <span aria-hidden="true" className={cn("size-2.5", tone[leader.slug].dot)} />
              <span className="font-display text-[0.75rem] font-bold tracking-[0.1em] text-ink-700 uppercase">
                {leader.name}
              </span>
            </li>
          ))}
        </ul>

        <ol className="mt-10 border-t-2 border-ink-950">
          {timeline.map((entry, index) => (
            <Reveal
              as="li"
              key={entry.key}
              delay={Math.min(index, 6) * 50}
              className="border-b border-ink-200"
            >
              <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1.25rem_1fr] sm:gap-6 sm:py-6">
                <p className="font-display text-[0.8125rem] font-bold tracking-[0.04em] text-ink-500 tabular-nums">
                  {entry.period}
                </p>

                <span aria-hidden="true" className="hidden justify-center pt-1.5 sm:flex">
                  <span className={cn("size-2.5", tone[entry.leader.slug].dot)} />
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-snug font-extrabold tracking-tight text-ink-950">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem]">
                    <span
                      className={cn(
                        "flex items-center gap-2 font-bold",
                        tone[entry.leader.slug].text
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn("size-2 sm:hidden", tone[entry.leader.slug].dot)}
                      />
                      {entry.leader.name}
                    </span>
                    <span aria-hidden="true" className="text-ink-300">
                      ·
                    </span>
                    <span className="text-content-muted">{entry.location}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          {leaders.map((leader) => (
            <Button key={leader.slug} href={leader.href} variant="outline" size="md">
              {leader.question}
              <ArrowRight size={16} strokeWidth={2.75} />
            </Button>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="bg-brand-700">
        <div className="shell shell-wide py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-fluid-3xl text-white">Two records. One plan.</h2>
              <p className="mt-4 text-fluid-lg leading-relaxed text-white/70">
                What the ticket intends to do with the office, sector by sector,
                and the movement organising in every ward to carry it there.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/planforchange" variant="inverse" size="lg">
                Plan for Change
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
