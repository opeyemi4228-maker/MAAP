import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck, Scale } from "lucide-react";
import Hero from "@/components/HeaderSlider";
import AgendaBand from "@/components/AgendaBand";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { Section, SectionHeading } from "@/components/ui/Section";
import { assets } from "@/assets/assets";
import { tiers, totalSeats } from "@/lib/map";
import { latestNews } from "@/lib/news";
import { site, secondaryCta } from "@/lib/site";
import JoinCta from "@/components/JoinCta";

/* ════════════════════════════════════════════════════════════════════════════
   The homepage, laid out on the section plan of adc.org.

   Ours in content, theirs in shape: Our Story, a two-card legal desk, News &
   Updates, an event photo grid, the Chairman's Corner, Featured Programs, a
   track-by-state tool, Take Action and a closing signup. The hero and the
   masthead are deliberately untouched.

   Two sections are ours and not theirs, because leaving them out would cut the
   argument this movement actually makes: the ticket (02) and the five-tier
   structure (04). Everything else maps onto a section of the reference.

   ── WHY THIS ORDER ──────────────────────────────────────────────────────────
   The reference's own running order is not one to copy literally: it puts Take
   Action third, which asks a stranger to commit before the page has given them
   any reason to. That works for an organisation whose visitors already know
   who it is. It does not work for a movement most readers are meeting for the
   first time. So the sections are the reference's; the sequence is built to
   how people actually decide.

   Three things set it:

   1. Serial position. What a reader retains is the front and the back of a
      page, so identity takes the top (01–03, what this is and who is standing)
      and the ask takes the bottom (09–11). The evidence sits in the middle,
      where attention genuinely dips — which is the right place for it, because
      evidence is what a reader scans rather than reads.

   2. Earn, then ask. Credibility before request: the structure (04) makes the
      claim, the live count (05) proves the structure exists, the field grid
      (06) and the newsroom (07) are third-party and social proof, and the
      programmes (08) say what the movement is actually for. Only then, at 09,
      does the page ask for anything.

   3. Objections surface at the point of decision, not before. The integrity
      desk (10) — "nobody may charge you for membership" — used to sit fourth,
      where it introduced the idea of a scam to a reader who had not yet
      considered one. It now sits immediately after the ask, where that doubt
      actually arises and where answering it removes the last obstacle.

   Adjacency does the rest: the two people sections (02, 03) are neighbours, and
   the structure and the count that proves it (04, 05) are neighbours. Related
   material read together is one idea; the same material split across a page is
   two half-arguments.

   ── RHYTHM ──────────────────────────────────────────────────────────────────
   White, not cream. The reference is white paper with black type and one hot
   accent, and sections are told apart by rules rather than by alternating
   tints — so nothing here sets a background except the two bands meant to stop
   you: the black portrait band at 03 and the ember close at 11. They are
   spaced roughly a third and a whole page in, so the long white run is broken
   twice; the full-bleed photo grid at 06 breaks it a third time without
   needing a colour to do it.

   The hairline between sections is therefore load-bearing. Sections that
   follow the black band carry none — a colour edge is already a rule, and a
   grey hairline on black is just an invisible line nobody asked for.
   ════════════════════════════════════════════════════════════════════════ */

/** 01 — the four figures that sit beside the story. */
const scale = [
  { value: 37, suffix: "", label: "States and the FCT" },
  { value: 774, suffix: "", label: "Local Government Areas" },
  { value: 8809, suffix: "", label: "Wards nationwide" },
  { value: 92190, suffix: "", label: "Seats in the structure" },
];

/**
 * 09 — Take Action.
 *
 * The reference runs specific asks rather than destinations: each row is one
 * thing to go and do. Every href here is a route that exists; an action alert
 * that 404s is worse than no alert.
 */
const actions = [
  {
    href: "/join",
    title: "Register in the ward where you vote",
    body: "Membership is free and takes under two minutes. The ward you register in is what places you in the structure.",
  },
  {
    href: "/structure#find",
    title: "Find the seat your ward still needs filled",
    body: "Every seat is either held by a named officer or openly vacant. Look up yours, and see who appoints to it.",
  },
  {
    href: "/connect",
    title: "Find your chapter",
    body: "Locate the coordinators already organising in your state and local government area.",
  },
  {
    href: "/support",
    title: "Support the campaign",
    body: "Time, skills or premises. The Secretariat publishes what each state office currently needs.",
  },
];

/**
 * 10 — the integrity desk, where the reference puts ADC Legal.
 *
 * Their two cards are "report a hate incident" and "know your rights". Ours are
 * the same shape and the same job: the one thing a stranger most needs to be
 * able to report, and the one rule they most need to know. Both are the
 * movement's own standing policy, taken from /terms, not new promises.
 */
const integrity = [
  {
    href: "/contact",
    icon: ShieldCheck,
    title: "Report impersonation or extortion",
    body: "Membership is free. MAAP never asks for payment to register or to hold office. Anyone demanding money is not acting for this movement. Tell the Secretariat.",
    cta: "Report it",
  },
  {
    href: "/terms",
    icon: Scale,
    title: "Know how office is given",
    body: "Nobody applies for a seat or nominates themselves. Each office is filled by the one named officer above it, and the appointment is recorded against their name.",
    cta: "Read the rules",
  },
];

/**
 * 06 — the photo grid, where the reference runs its conference highlights.
 *
 * Real field photography from assets/, not a placeholder set: /media carries an
 * honest empty state until the Media directorate uploads albums, and inventing
 * a gallery here to fill a band would undercut it. Mixed orientations, as the
 * reference has, so the grid reads as a contact sheet rather than a carousel.
 *
 * Two wide frames and four square ones, ordered so the grid tiles exactly with
 * no hole: on four columns that is [wide][·][·] / [·][·][wide], eight cells for
 * eight cells. On the two-column phone layout the same six tile just as
 * cleanly — a wide frame becomes a full-bleed row. An earlier arrangement used
 * a 2x2 lead frame, which left the last two cells of the third row empty and
 * rendered as a grey gap in the middle of the contact sheet.
 */
const highlights = [
  { src: assets.Camp1, span: "col-span-2", alt: "Mobilisation drive in the market" },
  { src: assets.atikuLaughing, span: "", alt: "Atiku Abubakar, laughing" },
  { src: assets.Emir, span: "", alt: "Traditional leadership visit" },
  { src: assets.Grad, span: "", alt: "Scholarship graduands" },
  { src: assets.Camp2, span: "", alt: "Supporters at a ward congress" },
  { src: assets.Abujakaduna, span: "col-span-2", alt: "The Abuja to Kaduna standard gauge line" },
];

/** 08 — Featured Programmes, the reference's three-card row. */
const programmes = [
  {
    href: "/planforchange",
    image: assets.Abujakaduna,
    title: "Plan for Change",
    body: "What the ticket intends to do with the office, sector by sector — from transport and power to education and security.",
    cta: "Read the plan",
    external: false,
  },
  {
    href: secondaryCta.href,
    image: assets.adcLogo,
    contain: true,
    title: "ADC party registration",
    body: `Membership of MAAP is not membership of a party. Registering with the ${site.party} is a separate step, taken on the party's own register.`,
    cta: "Register with the ADC",
    external: true,
  },
  {
    href: "/media#activities",
    image: assets.Camp2,
    title: "Ward congresses",
    body: "Congresses, town halls and registration drives, listed by zone and state with the officer who convened each one.",
    cta: "See what's on",
    external: false,
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ═══════════════════════════════════════════════════ the agenda ══ */}
      {/* Unnumbered, like the hero: it is the answer to "what will they do",
          which a voter needs before "who is organising". */}
      <AgendaBand />

      {/* ══════════════════════════════════════════════ 01 · our story ══ */}
      <Section className="border-t border-ink-200">
        <div className="grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading
              index={1}
              eyebrow="Our story"
              title="Who we are"
              lead="A membership movement organising in every ward in Nigeria, behind one presidential ticket — with a register that can name who is responsible in each one."
            />

            <div className="prose-body mt-12 space-y-5">
              <p>
                A movement that cannot name who speaks for it in Oredo, or
                Gwagwalada, or Nganzai is not national. It is an announcement
                with a logo. MAAP works the other way round: structure first, one
                register, the same shape in every state.
              </p>
              <p>
                Membership is free. Members accept the Code of Conduct and register
                in the ward where they vote. That is what places them in the
                structure.
              </p>
            </div>

            <div className="mt-9">
              <Button href="/about" variant="dark" size="lg">
                Learn more about the movement
                <ArrowRight size={17} strokeWidth={2.75} />
              </Button>
            </div>
          </div>

          {/* The scale, as four figures on a ruled list — the reference sets
              its story block against a narrow secondary column, not against a
              second paragraph of equal weight. */}
          <aside className="min-w-0">
            <h2 className="border-t-2 border-ink-950 pt-5 text-[0.6875rem] font-bold tracking-[0.12em] text-ink-500 uppercase">
              The scale of it
            </h2>
            <dl className="mt-6 divide-y divide-ink-200 border-b border-ink-200">
              {scale.map((item) => (
                <div key={item.label} className="flex items-baseline gap-4 py-4">
                  <dd className="shrink-0">
                    <Counter
                      value={item.value}
                      suffix={item.suffix}
                      className="font-display text-fluid-xl font-extrabold tracking-[-0.04em] text-brand-600 tabular-nums"
                    />
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

      {/* ══════════════════════════════════════════════ 02 · the ticket ══ */}
      {/* Ours, not the reference's. The movement is named for two men; a front
          page that introduced neither would be at odds with its own masthead. */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={2}
          eyebrow="The ticket"
          title="Who is standing, and for what"
          lead="A former Vice President of the Federal Republic and a former Minister of Transportation, on the platform of the African Democratic Congress."
        />

        <ul className="mt-14 grid gap-px bg-ink-200 lg:grid-cols-2">
          {[
            {
              href: "/about/atiku",
              portrait: assets.atikuStudioSmile,
              office: "For President",
              name: "Atiku Abubakar",
              lead: "Twenty years in Customs, to Deputy Director. Vice President from 1999 to 2007. Founder of the American University of Nigeria.",
            },
            {
              href: "/about/amaechi",
              portrait: assets.Amaechi7,
              office: "For Vice President",
              name: "Chibuike Rotimi Amaechi",
              lead: "Speaker of the Rivers State House of Assembly. Governor for eight years. Minister of Transportation from 2015 to 2022, the office that delivered 1,763km of rail and 11,300 jobs.",
            },
          ].map((person, index) => (
            <Reveal as="li" key={person.href} delay={index * 80} className="bg-white">
              <article className="flex h-full flex-col gap-7 p-7 sm:flex-row lg:p-8">
                <div className="relative aspect-4/5 w-full shrink-0 sm:w-40 lg:w-44">
                  <Image
                    src={person.portrait}
                    alt={person.name}
                    fill
                    sizes="(min-width: 640px) 11rem, 100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                  <p className="font-display text-[0.6875rem] font-bold tracking-[0.18em] text-ember-600 uppercase">
                    {person.office}
                  </p>
                  <h3 className="mt-3 font-display text-fluid-xl leading-tight font-extrabold tracking-[-0.03em] text-ink-950">
                    {person.name}
                  </h3>
                  <p className="prose-body mt-4 text-[0.9375rem]">{person.lead}</p>
                  <div className="mt-auto pt-7">
                    <Button href={person.href} variant="dark" size="md">
                      Read his record
                      <ArrowRight size={16} strokeWidth={2.75} />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ══════════════════════════════════ 03 · the chairman's corner ══ */}
      {/* The reference's two-column portrait block. Third person, not a quote:
          inventing words and attributing them to a living politician is not a
          thing a campaign site gets to do, and the reference's own version is
          descriptive text plus a "learn more" link anyway. */}
      <section className="bg-ink-950">
        <div className="shell shell-wide py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
            <Reveal>
              <div className="relative mx-auto aspect-square w-full max-w-xs lg:max-w-none">
                <Image
                  src={assets.atikuSpeaking}
                  alt="H.E. Atiku Abubakar"
                  fill
                  sizes="(min-width: 1024px) 20rem, 18rem"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="min-w-0">
                <p className="eyebrow eyebrow-inverse">
                  <span className="text-ember-400">03</span>
                  From the head of the ticket
                </p>

                <h2 className="mt-5 text-fluid-3xl text-white">
                  Hear from Atiku Abubakar
                </h2>

                <div className="mt-6 space-y-5 text-fluid-lg leading-relaxed text-white/70">
                  <p>
                    Twenty years in the federal service. Eight as Vice President. One
                    argument throughout: the centre holds more than it can use.
                    The government closest to a problem should have the power to
                    fix it.
                  </p>
                  <p>
                    He chaired the National Economic Council and the National Council
                    on Privatisation. Those reforms ended the state monopoly on
                    telephones. He founded the American University of Nigeria,
                    and built it in Yola.
                  </p>
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/about/atiku" variant="inverse" size="lg">
                    Learn more
                    <ArrowRight size={17} strokeWidth={2.75} />
                  </Button>
                  <Button href="/planforchange" variant="inverseOutline" size="lg">
                    Plan for Change
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ 04 · the structure ══ */}
      {/* Ours, not the reference's, and kept because it is the movement's whole
          proposition: five tiers, every seat named. */}
      <Section>
        <SectionHeading
          index={4}
          eyebrow="How we are organised"
          title="Five tiers, from the ward up"
          lead={`Every office at every level exists as a named seat — ${new Intl.NumberFormat("en-NG").format(totalSeats)} of them — filled by a named officer, or openly vacant and waiting on the authority above it to appoint.`}
          actions={
            <Button href="/structure" variant="outline" size="md">
              See the full structure
              <ArrowRight size={16} strokeWidth={2.75} />
            </Button>
          }
        />

        <ol className="mt-14 grid gap-px bg-ink-200 sm:grid-cols-2 lg:grid-cols-5">
          {tiers.map((tier, index) => (
            <Reveal as="li" key={tier.key} delay={index * 60} className="bg-white">
              <div className="h-full p-6">
                <span className="font-display text-fluid-2xl font-extrabold tracking-[-0.04em] text-ink-200 tabular-nums">
                  {String(tier.rank).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold tracking-tight text-ink-950">
                  {tier.name}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-content-subtle">
                  {tier.scope}
                </p>
                <p className="mt-5 border-t border-ink-200 pt-4 text-[0.6875rem] font-bold tracking-[0.12em] text-ember-600 uppercase">
                  {tier.seatsPerUnit} seats each
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ═══════════════════════════════════════ 05 · field highlights ══ */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={5}
          eyebrow="Highlights"
          title="From the field"
          lead="Congresses, rallies and visits, photographed by the movement's own people. The full archive grows as the Media directorate uploads each album."
          actions={
            <Button href="/media#photographs" variant="outline" size="md">
              The gallery
              <ArrowRight size={16} strokeWidth={2.75} />
            </Button>
          }
        />

        {/* A contact sheet: one wide lead frame and five supporting ones, all
            flush to a single px gutter. auto-rows keeps the row height
            fixed so the spans actually tile instead of leaving holes. */}
        <Reveal>
          <ul className="mt-14 grid auto-rows-36 grid-cols-2 gap-px bg-ink-200 sm:auto-rows-44 md:grid-cols-4">
            {highlights.map((shot, index) => (
              <li key={index} className={shot.span}>
                <div className="relative h-full w-full overflow-hidden bg-white">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ══════════════════════════════════════ 06 · news and updates ══ */}
      {/* The reference lists these as dated rows rather than as picture cards:
          date, headline, arrow. It reads as a wire feed, which is what a
          newsroom preview is, and it lets three real headlines carry the band
          without three images having to be found for them. */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={6}
          eyebrow="News &amp; updates"
          title="From the newsroom"
          actions={
            <Button href="/news" variant="outline" size="md">
              All news
              <ArrowRight size={16} strokeWidth={2.75} />
            </Button>
          }
        />

        <ul className="mt-14 border-t-2 border-ink-950">
          {latestNews.slice(0, 3).map((article, index) => (
            <Reveal as="li" key={article.id} delay={index * 70}>
              <Link
                href="/news"
                className="group flex flex-col gap-3 border-b border-ink-200 py-7 transition-colors duration-300 hover:bg-ink-50 md:flex-row md:items-baseline md:gap-10 md:px-2"
              >
                <span className="shrink-0 text-[0.8125rem] text-content-subtle tabular-nums md:w-56">
                  {article.date}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-fluid-lg leading-snug font-extrabold tracking-[-0.02em] text-ink-950 transition-colors duration-300 group-hover:text-brand-700">
                    {article.title}
                  </span>
                  <span className="mt-2 block text-[0.625rem] font-bold tracking-[0.12em] text-ember-600 uppercase">
                    {article.category}
                  </span>
                </span>

                <ArrowUpRight
                  size={22}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="hidden shrink-0 self-start text-ink-300 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember-500 md:block"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ═════════════════════════════════════ 07 · featured programmes ══ */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={7}
          eyebrow="Featured programmes"
          title="What the movement is running"
        />

        <ul className="mt-14 grid gap-px bg-ink-200 md:grid-cols-3">
          {programmes.map((programme, index) => (
            <Reveal as="li" key={programme.href} delay={index * 70} className="bg-white">
              <Link
                href={programme.href}
                {...(programme.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col transition-colors duration-300 hover:bg-ink-50"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-ink-50">
                  <Image
                    src={programme.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={
                      programme.contain
                        ? "object-contain p-10"
                        : "object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    }
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-fluid-lg leading-tight font-extrabold tracking-[-0.02em] text-ink-950 transition-colors duration-300 group-hover:text-brand-700">
                    {programme.title}
                  </h3>
                  <p className="prose-body mt-3 text-[0.9375rem]">{programme.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 font-display text-[0.75rem] font-bold tracking-[0.12em] text-ember-600 uppercase">
                    {programme.cta}
                    {programme.external ? (
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.75}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    ) : (
                      <ArrowRight
                        size={15}
                        strokeWidth={2.75}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    )}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ════════════════════════════════════════════ 08 · take action ══ */}
      {/* The reference's signature block: not a grid of destinations but a
          ruled list of specific asks, each one a thing to go and do. Rows, not
          cards — a card implies browsing, a row implies a task. */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={8}
          eyebrow="Take action"
          title="Four things you can do today"
          actions={
            <Button href="/join" variant="outline" size="md">
              Start with membership
              <ArrowRight size={16} strokeWidth={2.75} />
            </Button>
          }
        />

        <ul className="mt-14 border-t-2 border-ink-950">
          {actions.map((action, index) => (
            <Reveal as="li" key={action.href} delay={index * 60}>
              <Link
                href={action.href}
                className="group flex items-start gap-6 border-b border-ink-200 py-7 transition-colors duration-300 hover:bg-ink-50 md:gap-10 md:px-2"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-display text-[0.75rem] font-extrabold text-ember-600 tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-fluid-lg leading-snug font-extrabold tracking-[-0.02em] text-ink-950 transition-colors duration-300 group-hover:text-brand-700">
                    {action.title}
                  </span>
                  <span className="prose-body mt-2 block text-[0.9375rem]">
                    {action.body}
                  </span>
                </span>

                <ArrowUpRight
                  size={22}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ink-300 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember-500"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ══════════════════════════════════════ 09 · the integrity desk ══ */}
      <Section className="border-t border-ink-200">
        <SectionHeading
          index={9}
          eyebrow="Integrity desk"
          title="If something looks wrong, say so"
          lead="The two questions people ask most — and who to tell when the answer does not match what they hear locally."
        />

        <ul className="mt-14 grid gap-px bg-ink-200 md:grid-cols-2">
          {integrity.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.href} delay={index * 80} className="bg-white">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-ink-50 lg:p-8"
                >
                  <Icon
                    size={28}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="text-brand-600"
                  />
                  <h3 className="mt-6 font-display text-fluid-lg leading-tight font-extrabold tracking-[-0.02em] text-ink-950">
                    {item.title}
                  </h3>
                  <p className="prose-body mt-3 text-[0.9375rem]">{item.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 font-display text-[0.75rem] font-bold tracking-[0.12em] text-ember-600 uppercase">
                    {item.cta}
                    <ArrowRight
                      size={15}
                      strokeWidth={2.75}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* ═══════════════════════════════════════════ 10 · be the change ══ */}
      {/* The reference closes on a centred signup. Ours closes on the one
          action the whole page has been building towards. */}
      <section className="bg-ember-500">
        <div className="shell py-20 text-center lg:py-24">
          <Reveal>
            <p className="eyebrow eyebrow-center text-ink-950/60">
              Be the change
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-fluid-4xl text-ink-950">
              Every ward matters.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-fluid-lg leading-relaxed text-ink-950/70">
              Registration is free and takes under two minutes. Then find the
              seat your ward still needs filled.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <JoinCta variant="dark" size="lg" />
              <Button href="/structure" variant="outline" size="lg">
                See the structure
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
