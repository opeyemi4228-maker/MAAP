import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { pillars, subsidy, themes } from "@/lib/agenda";

/* ════════════════════════════════════════════════════════════════════════════
   The agenda, on the homepage.

   Directly under the hero, because the hero says who and this says what, and
   "what will you do about the price of fuel" is the question a voter arrives
   with.

   ── WHY IT IS LIGHT, NOT BLACK ──────────────────────────────────────────────
   This band used to be a black field with a green glow behind it. Directly
   beneath a dark hero it read as a continuation of the hero rather than as the
   first thing the page says, so the page appeared to open with two heroes and
   no content. White gives the hero an edge to end on, and it is the ground the
   rest of the homepage is already set on, so the agenda now reads as part of
   the page instead of an interruption in it.

   ── WHY FOUR CARDS AND NOT TWELVE ROWS ──────────────────────────────────────
   It previously carried, in one screen: a heading, a standfirst, a link to the
   agenda, a feature panel with a kicker, a headline, a subheading, a paragraph,
   four term chips, a pull quote and a button, then eleven numbered rows each
   with an icon, a title, a theme and an arrow, then a twelfth link to the same
   agenda page the heading already linked to. Three routes to one destination
   and about forty elements competing for the same glance.

   The twelve commitments already arrive grouped into four themes, each with a
   sentence of its own. Four groups is something a reader can hold; twelve
   items is a list they skim and abandon. So the homepage now shows the pledge
   most people have actually heard of, then the four themes as the shape of the
   rest, then one way through to the whole thing. Nothing is hidden — /agenda
   still carries all twelve, with sources — and the homepage still never
   restates a commitment in words of its own.
   ════════════════════════════════════════════════════════════════════════ */

export default function AgendaBand() {
  return (
    <section aria-labelledby="agenda-band" className="section bg-white">
      <div className="shell shell-wide">
        {/* Heading. One standfirst, and no link: the two below are enough, and
            a third pointing at the same page only splits the decision. */}
        <div className="max-w-3xl">
          <Reveal>
            <p className="flex items-center gap-3 text-[0.6875rem] font-bold tracking-[0.2em] text-ink-500 uppercase">
              <span className="bg-ember-500 px-2 py-1 text-ink-950">ADC 2027</span>
              The {pillars.length}-point agenda
            </p>
            <h2 id="agenda-band" className="mt-6 text-fluid-4xl text-content">
              Twelve commitments. <span className="text-ember-600">One ticket.</span>
            </h2>
            <p className="prose-body mt-6">
              What Atiku Abubakar has committed to, in plain language. Every
              point links to where he said it.
            </p>
          </Reveal>
        </div>

        {/* ─────────────────────────────────────────────── the headline pledge
            Kept as the one feature, because it is the pledge most people have
            already heard of and the one most likely to have reached them wrong.
            The four term chips and the pull quote that used to sit here are on
            /agenda#subsidy, which is where somebody who wants the detail is
            going anyway. */}
        <Reveal delay={80}>
          <article className="mt-16 border-t-3 border-ember-500 bg-ink-50">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:p-12">
              <div className="min-w-0">
                <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-ember-600 uppercase">
                  {subsidy.kicker}
                </p>
                <h3 className="mt-5 text-fluid-3xl text-content">Bring back the subsidy.</h3>
                <p className="mt-3 font-display text-fluid-lg leading-snug font-bold tracking-[-0.02em] text-brand-700">
                  This time, on what Nigeria makes.
                </p>
              </div>

              <div className="flex min-w-0 flex-col items-start">
                <p className="prose-body text-[1rem]">{subsidy.lead}</p>
                <div className="mt-8">
                  <Button href="/agenda#subsidy" variant="primary" size="md">
                    How the subsidy works
                    <ArrowRight size={16} strokeWidth={2.75} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* ──────────────────────────────────────────────── the other eleven
            As the four themes they already belong to, rather than as eleven
            rows. Each card says what the theme changes and how many
            commitments sit under it, and opens that part of the agenda. */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {themes.map((theme, index) => (
            <Reveal key={theme.slug} delay={index * 70}>
              <Link
                href={`/agenda#${theme.slug}`}
                className="group flex h-full flex-col border-t-2 border-ink-950 pt-6"
              >
                <h3 className="font-display text-fluid-lg leading-tight font-extrabold tracking-[-0.02em] text-content transition-colors duration-200 group-hover:text-brand-700">
                  {theme.title}
                </h3>
                <p className="prose-body mt-3 text-[0.9375rem]">{theme.line}</p>
                <p className="mt-6 flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.12em] text-ink-500 uppercase">
                  {theme.pillars.length}{" "}
                  {theme.pillars.length === 1 ? "commitment" : "commitments"}
                  <ArrowRight
                    size={14}
                    strokeWidth={2.75}
                    aria-hidden="true"
                    className="text-ember-600 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14">
            <Button href="/agenda" variant="outline" size="lg">
              Read the full agenda, with sources
              <ArrowRight size={17} strokeWidth={2.75} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
