import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import AgendaIcon from "@/components/AgendaIcon";
import ElectionCountdown from "@/components/ElectionCountdown";
import JoinCta from "@/components/JoinCta";
import { election, framing, pillars, sources, subsidy, themes } from "@/lib/agenda";

export const metadata = {
  title: "The Agenda",
  description:
    "Atiku Abubakar's 12-point agenda for the 2027 election: a targeted petrol subsidy, a $10 billion fund for young people and women, education without the debt, and a leaner federal government. Every commitment linked to its source.",
};

/* ════════════════════════════════════════════════════════════════════════════
   /agenda — what the ticket will do.

   Built for the reader who has heard one pledge secondhand, usually the
   subsidy, and has come to check it. So the page answers in that order:

     1. The argument, and the date it will be settled on.
     2. The pledge they came for, set out in the campaign's own terms.
     3. The other eleven points, grouped by what they change in a household.
     4. Where every line came from.
     5. What to do about it.

   Every commitment is read from lib/agenda.js, which carries its source. This
   page adds layout, not claims.
   ════════════════════════════════════════════════════════════════════════ */

const totalPoints = pillars.length;

/* Numbered straight through the themes, 01 to 12, so a point can be cited by
   number without saying which theme it sits in. */
const numberOf = Object.fromEntries(pillars.map((pillar, index) => [pillar.slug, index + 1]));

function SourceLink({ source, className }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "group inline-flex items-start gap-1.5 text-[0.75rem] leading-snug text-ink-500 transition-colors hover:text-brand-700"
      }
    >
      <span>
        <span className="font-semibold">Source:</span> {source.label}, {source.date}
      </span>
      <ArrowUpRight size={12} strokeWidth={2.5} aria-hidden="true" className="mt-0.5 shrink-0" />
    </a>
  );
}

export default function AgendaPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ hero ══ */}
      <header className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_85%_10%,color-mix(in_oklch,var(--color-brand-600)_55%,transparent)_0%,transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
        />

        <div className="shell shell-wide pt-14 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_26rem] xl:items-end xl:gap-16">
            <div>
              <Reveal>
                <p className="flex flex-wrap items-center gap-3 text-[0.6875rem] font-bold tracking-[0.2em] text-white/70 uppercase">
                  <span className="bg-ember-500 px-2 py-1 text-ink-950">ADC 2027</span>
                  The {totalPoints}-point agenda
                </p>
              </Reveal>

              <Reveal delay={70}>
                {/* Two lines, one idea each: the country as it is, struck out,
                    over the country the plan is for. Read aloud it is the
                    sentence in the sr-only span.

                    Each line is kept whole, so the size is set by the width it
                    has: about 12.5em per line, in a column that loses 30rem to
                    the countdown from xl. */}
                <h1 className="mt-7 text-[clamp(1.75rem,7vw,4.25rem)] xl:text-[clamp(2.25rem,7vw-2.5rem,4.25rem)]">
                  <span className="sr-only">From Expensive Nigeria to Affordable Nigeria.</span>
                  <span aria-hidden="true" className="block whitespace-nowrap text-white/35 line-through decoration-ember-500 decoration-[0.08em]">
                    Expensive Nigeria.
                  </span>
                  <span aria-hidden="true" className="block whitespace-nowrap text-ember-400">
                    Affordable Nigeria.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-7 max-w-[52ch] text-fluid-lg leading-relaxed text-white/70">
                  Atiku Abubakar&rsquo;s plan for the 2027 election, point by
                  point. In plain language, with a link to where each commitment
                  was made.
                </p>
              </Reveal>

              <Reveal delay={210}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href="#subsidy" variant="ember" size="lg">
                    The subsidy plan
                    <ArrowDown size={17} strokeWidth={2.75} aria-hidden="true" />
                  </Button>
                  <Button href="#points" variant="inverseOutline" size="lg">
                    All {totalPoints} points
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* The date the argument is settled on. */}
            <Reveal delay={180}>
              <aside
                aria-label="Election countdown"
                className="max-w-xl border border-white/15 bg-white/[0.04] backdrop-blur-sm xl:max-w-none"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
                  <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-white/60 uppercase">
                    Presidential election
                  </p>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-ember-400 opacity-70 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-ember-400" />
                  </span>
                </div>
                <div className="px-6 py-7">
                  <ElectionCountdown />
                  <p className="mt-7 font-display text-lg font-extrabold tracking-[-0.02em]">
                    {election.day}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-white/55">
                    Governorship and State Assembly: {election.governorship}
                  </p>
                </div>
                <div className="border-t border-white/10 px-6 py-3.5">
                  <SourceLink
                    source={election.source}
                    className="group inline-flex items-start gap-1.5 text-[0.6875rem] leading-snug text-white/45 transition-colors hover:text-white"
                  />
                </div>
              </aside>
            </Reveal>
          </div>

          {/* The four themes, as a table of contents. */}
          <nav aria-label="Agenda themes" className="mt-14 lg:mt-20">
            <ul className="grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {themes.map((theme, index) => (
                <li
                  key={theme.slug}
                  /* The padding lives here, on the <li>, not on the <Link>
                     inside it. `first:` matches an element that is the first
                     child of its own parent — and every one of these links is
                     the first child of its own <li>, so `first:pl-0` on the
                     link stripped the left padding off all four columns and
                     jammed three of them up against the divider to their left.
                     On the <li> it means what it reads as: only the first
                     column loses its inset, so its text lines up with the
                     page's left edge, and only the last loses its right one. */
                  className="border-b border-white/15 sm:px-5 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <Link
                    href={`#${theme.slug}`}
                    className="group flex h-full flex-col gap-2 py-5 transition-colors"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-[0.6875rem] font-bold tracking-[0.18em] text-ember-400 uppercase">
                        {String(index + 1).padStart(2, "0")} · {theme.pillars.length} points
                      </span>
                      <ArrowDown
                        size={15}
                        aria-hidden="true"
                        className="text-white/40 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white"
                      />
                    </span>
                    <span className="font-display text-lg font-extrabold tracking-[-0.02em] group-hover:text-ember-300">
                      {theme.title}
                    </span>
                    <span className="text-[0.8125rem] leading-snug text-white/55">{theme.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════ the framing ══ */}
      <section className="bg-ember-500 text-ink-950">
        <div className="shell shell-wide py-14 lg:py-20">
          <Reveal>
            <figure className="grid gap-8 lg:grid-cols-[4rem_minmax(0,1fr)] lg:gap-10">
              <Quote size={48} strokeWidth={2.5} aria-hidden="true" className="text-ink-950/25" />
              <div>
                <blockquote className="max-w-5xl font-display text-fluid-3xl leading-[1.08] font-extrabold tracking-[-0.03em] text-balance">
                  &ldquo;{framing.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex flex-col gap-2 text-[0.875rem] sm:flex-row sm:items-center sm:gap-4">
                  <span>
                    <span className="font-bold">{framing.by}</span>
                    <span className="text-ink-950/70">, {framing.role}</span>
                  </span>
                  <span aria-hidden="true" className="hidden h-4 w-px bg-ink-950/25 sm:block" />
                  <SourceLink
                    source={framing.source}
                    className="inline-flex items-start gap-1.5 text-[0.75rem] text-ink-950/70 underline-offset-2 hover:underline"
                  />
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ the subsidy plan ══ */}
      <section id="subsidy" className="section scroll-mt-24 bg-white">
        <div className="shell shell-wide">
          <SectionHeading
            index={1}
            eyebrow={subsidy.kicker}
            title={subsidy.title}
            lead={subsidy.lead}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            {/* Who, and in his words */}
            <div className="flex flex-col gap-10 lg:sticky lg:top-[calc(var(--masthead-offset,6rem)+2rem)] lg:self-start">
              <Reveal>
                <h3 className="text-[0.6875rem] font-bold tracking-[0.16em] text-ink-500 uppercase">
                  Who feels it first
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {subsidy.beneficiaries.map((who) => (
                    <li
                      key={who}
                      className="border border-ink-950 px-4 py-2.5 font-display text-[0.875rem] font-bold tracking-[-0.01em] text-ink-950"
                    >
                      {who}
                    </li>
                  ))}
                </ul>
                <p className="prose-body mt-5 text-[0.9375rem]">
                  Cheaper fuel is cheaper transport, and cheaper transport is
                  cheaper food on the way to market.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <figure className="relative bg-brand-900 p-8 text-white lg:p-10">
                  <div aria-hidden="true" className="absolute top-0 left-0 h-1 w-20 bg-ember-500" />
                  <blockquote className="font-display text-fluid-3xl leading-none font-extrabold tracking-[-0.035em]">
                    &ldquo;{subsidy.voice.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-bold">{subsidy.voice.by}</p>
                    <p className="mt-1.5 max-w-sm text-[0.875rem] leading-relaxed text-white/65">
                      {subsidy.voice.context}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            {/* The terms */}
            <div>
              <Reveal>
                <h3 className="border-t-2 border-ink-950 pt-5 text-[0.6875rem] font-bold tracking-[0.16em] text-ink-500 uppercase">
                  The terms, as the campaign has set them
                </h3>
                <dl className="mt-2 divide-y divide-ink-200 border-b border-ink-200">
                  {subsidy.terms.map((term, index) => (
                    <div
                      key={term.label}
                      className="grid gap-2 py-6 sm:grid-cols-[2.5rem_11rem_minmax(0,1fr)] sm:gap-5"
                    >
                      <span
                        aria-hidden="true"
                        className="hidden font-display text-[0.8125rem] font-extrabold text-ember-600 tabular-nums sm:block"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <dt className="text-[0.75rem] font-bold tracking-[0.1em] text-ink-500 uppercase sm:pt-1">
                        {term.label}
                      </dt>
                      <dd>
                        <p className="font-display text-fluid-xl leading-tight font-extrabold tracking-[-0.025em] text-ink-950">
                          {term.value}
                        </p>
                        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-content-muted">
                          {term.detail}
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-8 bg-ink-950 p-8 text-white lg:p-10">
                  <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-ember-400 uppercase">
                    {subsidy.exit.title}
                  </p>
                  <p className="mt-3 font-display text-fluid-xl leading-snug font-extrabold tracking-[-0.02em]">
                    {subsidy.exit.body}
                  </p>
                  <figure className="mt-7 border-l-2 border-ember-500 pl-5">
                    <blockquote className="text-[0.9375rem] leading-relaxed text-white/75 italic">
                      &ldquo;{subsidy.exit.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 text-[0.75rem] font-semibold text-white/50">
                      {subsidy.exit.by}
                    </figcaption>
                  </figure>
                </div>
              </Reveal>

              <ul className="mt-6 space-y-2">
                {subsidy.sources.map((source) => (
                  <li key={source.url}>
                    <SourceLink source={source} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ the 12 points ══ */}
      <section id="points" className="section scroll-mt-24 border-t border-ink-200 bg-ink-50">
        <div className="shell shell-wide">
          <SectionHeading
            index={2}
            eyebrow={`The ${totalPoints} points`}
            title="Everything the ticket has committed to"
            lead="Grouped by what each one changes in a household. The grouping and order are ours, for reading; the commitments are the campaign's."
          />

          <div className="mt-16 space-y-20 lg:space-y-28">
            {themes.map((theme, themeIndex) => (
              <div
                key={theme.slug}
                id={theme.slug}
                className="grid scroll-mt-28 gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14"
              >
                {/* Theme label, pinned while its points scroll past. */}
                <div>
                  <div className="lg:sticky lg:top-[calc(var(--masthead-offset,6rem)+2rem)]">
                    <p className="font-display text-[0.75rem] font-extrabold tracking-[0.18em] text-ember-600 uppercase">
                      Theme {String(themeIndex + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-fluid-3xl text-ink-950">{theme.title}</h3>
                    <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-content-muted">
                      {theme.line}
                    </p>
                  </div>
                </div>

                <ul className="grid gap-px border border-ink-200 bg-ink-200 md:grid-cols-2">
                  {theme.pillars.map((pillar) => {
                    const n = numberOf[pillar.slug];
                    const number = String(n).padStart(2, "0");
                    return (
                      <li
                        key={pillar.slug}
                        id={`point-${pillar.slug}`}
                        /* An odd point out spans the row, rather than leaving
                           a grey hole beside it. */
                        className="scroll-mt-28 bg-white md:last:odd:col-span-2"
                      >
                        <article className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-white lg:p-9">
                          <div className="flex items-start justify-between gap-4">
                            <span className="grid size-12 place-items-center bg-brand-600 text-white transition-colors duration-300 group-hover:bg-ember-500 group-hover:text-ink-950">
                              <AgendaIcon name={pillar.icon} size={22} strokeWidth={2} />
                            </span>
                            <span
                              aria-hidden="true"
                              className="font-display text-fluid-3xl leading-none font-extrabold tracking-[-0.05em] text-ink-200 tabular-nums transition-colors duration-300 group-hover:text-ember-500"
                            >
                              {number}
                            </span>
                          </div>

                          <h4 className="mt-7 font-display text-fluid-xl leading-tight font-extrabold tracking-[-0.025em] text-ink-950">
                            <span className="sr-only">Point {n}: </span>
                            {pillar.title}
                          </h4>
                          <p className="mt-3 text-[0.9375rem] leading-relaxed text-content-muted">
                            {pillar.pledge}
                          </p>

                          <ul className="mt-6 space-y-2.5 border-t border-ink-200 pt-6">
                            {pillar.commitments.map((line) => (
                              <li key={line} className="flex gap-3 text-[0.875rem] leading-snug text-ink-800">
                                <Check
                                  size={16}
                                  strokeWidth={3}
                                  aria-hidden="true"
                                  className="mt-0.5 shrink-0 text-brand-600"
                                />
                                {line}
                              </li>
                            ))}
                          </ul>

                          <p className="mt-6 border-l-2 border-ember-500 bg-ember-50 px-4 py-3 text-[0.8125rem] leading-snug text-ink-800">
                            <span className="font-bold text-ink-950">What it means: </span>
                            {pillar.forYou}
                          </p>

                          <div className="mt-auto space-y-1.5 pt-6">
                            <SourceLink source={pillar.source} />
                            {pillar.also && <SourceLink source={pillar.also} />}
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ the sources ══ */}
      <section className="section-tight border-t border-ink-200 bg-white">
        <div className="shell shell-wide grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14">
          <div>
            <h2 className="text-fluid-2xl text-ink-950">Read it yourself</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-content-muted">
              This page summarises public statements. When the ADC publishes its
              full manifesto, the manifesto takes precedence.
            </p>
          </div>
          <ol className="divide-y divide-ink-200 border-y border-ink-200">
            {sources.map((source, index) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-5 transition-colors hover:bg-ink-50 sm:px-3"
                >
                  <span className="font-display text-[0.8125rem] font-extrabold text-ember-600 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink-950 group-hover:text-brand-700">
                      {source.label}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-ink-500">{source.date}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="text-ink-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-700"
                  />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ the ask ══ */}
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_100%_at_50%_0%,var(--color-brand-600)_0%,transparent_70%)]"
        />
        <div className="shell py-20 text-center lg:py-28">
          <Reveal>
            <p className="eyebrow eyebrow-center eyebrow-inverse text-white/60">
              {election.day}
            </p>
            <h2 className="mx-auto mt-6 max-w-4xl text-fluid-4xl">
              A plan only wins if every ward <span className="text-ember-400">hears it.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-fluid-lg leading-relaxed text-white/70">
              Join the movement, then take the agenda to the people who will
              vote in your polling unit.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <JoinCta variant="ember" size="lg" />
              <Button href="/structure#find" variant="inverseOutline" size="lg">
                Find your coordinator
                <ArrowRight size={17} strokeWidth={2.75} aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
