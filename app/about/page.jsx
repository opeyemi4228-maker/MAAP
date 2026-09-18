import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ShieldCheck, Scale, Users, HeartHandshake, Flag, Compass } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { coreValues, objectives, nationalExecutive, totalSeats } from "@/lib/map";
import { site, secondaryCta } from "@/lib/site";
import { assets } from "@/assets/assets";
import JoinCta from "@/components/JoinCta";

export const metadata = {
  title: "About the Movement",
  description:
    "The Movement for Atiku Amaechi Presidency (MAAP): its mission, its values, its objectives, its ticket and its National Executive.",
};

/* Values are ordered by the lib/map.js list; the icons map onto it by index so
   the two stay in step without repeating the copy here. */
const valueIcons = [ShieldCheck, Scale, Compass, Users, HeartHandshake, Flag];

const formatter = new Intl.NumberFormat("en-NG");

export default function About() {
  return (
    <>
      <PageHeader
        breadcrumb="About"
        kicker="The movement"
        title="Movement for Atiku Amaechi Presidency"
        lead="One objective: the presidential ticket of Atiku Abubakar and Rotimi Amaechi. Organising in all 36 states, the FCT, 774 Local Government Areas and over 8,000 wards."
      >
        <div className="flex flex-wrap gap-3">
          <JoinCta variant="inverse" size="lg" />
          <Button href="/structure" variant="inverseOutline" size="lg">
            See the structure
          </Button>
        </div>
      </PageHeader>

      {/* ---------------------------------------------------------- mission */}
      <section className="bg-brand-700">
        <div className="shell shell-wide py-16 lg:py-20">
          <Reveal>
            <p className="max-w-4xl text-fluid-2xl leading-tight font-bold text-white">
              MAAP exists to build a disciplined, verifiable national structure,
              ward by ward, behind the presidential ticket of Atiku Abubakar and
              Rotimi Amaechi.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- the case */}
      <Section className="bg-white">
        <SectionHeading
          index={1}
          eyebrow="Why the movement exists"
          title="Structure is the argument"
          lead="Nigerian politics is not short of declarations. It is short of organisations that can name who is responsible in a given ward, and when they were appointed. That is the gap MAAP closes."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="prose-body space-y-5">
              <p>
                A movement that cannot name who speaks for it in Oredo, or
                Gwagwalada, or Nganzai is not national. It is an announcement
                with a logo. MAAP works the other way round: structure first, one
                register, the same shape in every state.
              </p>
              <p>
                The register holds {formatter.format(totalSeats)} seats, from the
                National Executive to the tenth officer in the smallest ward.
                Each is either filled by a named member or openly vacant. There
                is no third state.
              </p>
              <p>
                Members accept the Code of Conduct and register in the ward where
                they vote. That is what places them in the structure. Office at
                LGA level and above requires verification.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-t-2 border-ink-950 pt-7">
              <h3 className="text-[0.6875rem] font-bold tracking-[0.12em] text-ink-500 uppercase">
                Our objectives
              </h3>
              <ol className="mt-7 space-y-6">
                {objectives.map((objective, index) => (
                  <li key={objective} className="flex gap-5">
                    <span className="shrink-0 font-display text-base font-extrabold text-ember-600 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="prose-body text-[0.9375rem]">{objective}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- values */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={2}
          eyebrow="Core values"
          title="What membership commits you to"
        />

        <ul className="mt-14 grid gap-px bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, index) => {
            const Icon = valueIcons[index] ?? ShieldCheck;
            return (
              <Reveal as="li" key={value.title} delay={index * 60} className="bg-white">
                <div className="h-full p-7">
                  <Icon
                    size={26}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="text-brand-600"
                  />
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-ink-950">
                    {value.title}
                  </h3>
                  <p className="prose-body mt-2.5 text-[0.9375rem]">{value.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* -------------------------------------------------------- the ticket */}
      {/* Two profiles side by side, each with its office named under it, and
          the party plate beneath them both. The pair is the movement's whole
          proposition, so it gets a section rather than a line of copy — and
          setting them as equals in the grid while labelling the offices
          differently is what keeps "joint ticket" and "who is standing for
          what" from being the same question. */}
      <Section className="border-t border-ink-200 bg-white">
        <SectionHeading
          index={3}
          eyebrow="The ticket"
          title="Atiku Abubakar and Rotimi Amaechi"
          lead="A former Vice President and a former Minister of Transportation, on the platform of the African Democratic Congress."
        />

        <ul className="mt-14 grid gap-px bg-ink-200 lg:grid-cols-2">
          {[
            {
              href: "/about/atiku",
              office: "For President",
              prefix: "H.E.",
              name: "Atiku Abubakar",
              honorific: "GCON · Waziri Adamawa",
              body: "Twenty years in Customs, to Deputy Director. Vice President from 1999 to 2007. He chaired the National Economic Council and the National Council on Privatisation, and founded the American University of Nigeria.",
              cta: "Who is Atiku?",
            },
            {
              href: "/about/amaechi",
              office: "For Vice President",
              prefix: "Rt. Hon.",
              name: "Chibuike Rotimi Amaechi",
              honorific: "CON · KSJ",
              body: "Speaker of the Rivers State House of Assembly. Governor for eight years. Minister of Transportation from 2015 to 2022, the office that delivered 1,763km of rail and 32 stations.",
              cta: "Who is Amaechi?",
            },
          ].map((person, index) => (
            <Reveal as="li" key={person.href} delay={index * 80} className="bg-white">
              <article className="flex h-full flex-col p-7 lg:p-9">
                <p className="font-display text-[0.6875rem] font-bold tracking-[0.18em] text-ember-600 uppercase">
                  {person.office}
                </p>
                <p className="mt-5 text-[0.625rem] font-bold tracking-[0.24em] text-ink-500 uppercase">
                  {person.prefix}
                </p>
                <h3 className="mt-1.5 font-display text-fluid-2xl leading-tight font-extrabold tracking-[-0.03em] text-ink-950">
                  {person.name}
                </h3>
                <p className="mt-2 text-[0.6875rem] font-bold tracking-[0.16em] text-brand-600 uppercase">
                  {person.honorific}
                </p>
                <p className="prose-body mt-5 text-[0.9375rem]">{person.body}</p>
                <div className="mt-auto pt-7">
                  <Button href={person.href} variant="outline" size="md">
                    {person.cta}
                    <ArrowRight size={16} strokeWidth={2.75} />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* The party plate. The ADC mark sits on its own rule rather than in
            the masthead lockup: the movement is not the party, and putting the
            two marks together at the top of the page would say it was. */}
        <Reveal delay={160}>
          <div className="mt-14 flex flex-col gap-6 border-t-2 border-ink-950 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <Image
                src={assets.adcLogo}
                alt={`${site.party} (${site.partyShort})`}
                sizes="80px"
                className="size-16 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <p className="font-display text-[0.6875rem] font-bold tracking-[0.18em] text-ink-500 uppercase">
                  On the platform of
                </p>
                <p className="mt-1.5 font-display text-lg font-extrabold tracking-[-0.02em] text-ink-950">
                  {site.party}
                </p>
              </div>
            </div>
            <Button href={secondaryCta.href} variant="outline" size="md" external>
              {secondaryCta.label}
              <ArrowUpRight size={16} strokeWidth={2.75} />
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------- read next */}
      <Section className="border-t border-ink-200 bg-white" tight>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/planforchange", label: "Plan for Change", body: "The agenda for Nigeria, sector by sector." },
            { href: "/structure", label: "Structure", body: "Every seat, from the National Executive to the ward." },
            { href: "/leader", label: "Leadership", body: "The character behind the record." },
            { href: "/news", label: "Newsroom", body: "Statements, coverage and campaign updates." },
          ].map((card, index) => (
            <Reveal key={card.href} delay={index * 60}>
              <Link
                href={card.href}
                className="group flex h-full flex-col border-2 border-ink-100 p-6 transition-colors duration-300 hover:border-ember-500"
              >
                <h3 className="font-display text-lg font-extrabold tracking-tight text-ink-950">
                  {card.label}
                </h3>
                <p className="prose-body mt-2 text-[0.9375rem]">{card.body}</p>
                <ArrowUpRight
                  size={20}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="mt-auto pt-6 text-ink-300 transition-colors duration-300 group-hover:text-ember-500"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------- national executive */}
      <Section className="bg-ink-950">
        <SectionHeading
          index={4}
          tone="inverse"
          eyebrow="National Executive"
          title="Fifteen offices, named as each is confirmed"
          lead="None of the fifteen has been announced yet. They are seeded first, by hand, so every application from below has a real officer to decide it. Names appear as appointments are confirmed."
        />

        {/* One "to be announced" for the section, not fifteen.

            This was fifteen cards, each repeating the same empty state under
            its own rule. Fifteen restatements of "nobody holds this yet" is
            not fifteen pieces of information — it is one, told fifteen times,
            and it made the page's longest section its least informative. The
            honest empty state is kept (a placeholder name here would be a
            fabricated officer on a political movement's public site); it is
            now stated once, in the lead above, where a reader meets it before
            the list rather than after every item in it.

            What survives is the part that does carry information: which
            fifteen offices exist, and what each is responsible for. */}
        <ul className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {nationalExecutive.map((office, index) => (
            <Reveal as="li" key={office.code} delay={Math.min(index * 40, 320)} className="bg-ink-950">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[0.9375rem] leading-snug font-bold text-white">
                    {office.title}
                  </h3>
                  {office.authority === "Super Admin" && (
                    <span className="shrink-0 bg-ember-500 px-2 py-0.5 text-[0.5625rem] font-bold tracking-[0.1em] text-ink-950 uppercase">
                      Leads
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[0.8125rem] leading-snug text-white/45">
                  {office.scope}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="bg-ember-500">
        <div className="shell shell-wide py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-fluid-3xl text-ink-950">
                Register in under two minutes.
              </h2>
              <p className="mt-4 text-fluid-lg leading-relaxed text-ink-950/70">
                Then find the seat your ward still needs filled.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <JoinCta variant="dark" size="lg" />
              <Button href="/structure" variant="outline" size="lg">
                See the structure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
