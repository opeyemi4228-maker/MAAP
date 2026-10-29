"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import JoinCta from "@/components/JoinCta";
import { election } from "@/lib/agenda";

/* The caption under the panel. Order is the order of the ticket, and each name
   carries its office, because a reader who cannot tell which man is standing
   for what has learned nothing from two portraits. This is also why both
   figures are `alt=""`: naming them here and in alt text reads them twice. */
const ticket = [
  { prefix: "H.E.", name: "Atiku Abubakar", office: "For President" },
  { prefix: "Rt. Hon.", name: "Rotimi Amaechi", office: "For Vice President" },
];

/* The sentence that rides the ribbon: the ticket and what it is for, in the
   words a poster would use. */
const RIBBON = "Atiku · Amaechi · Affordable Nigeria";

/* ════════════════════════════════════════════════════════════════════════════
   THE HERO

   One rounded panel: the argument on the left, the two men on the right, and a
   ribbon sweeping across them. The shape is the reference the campaign asked
   for — a tinted card with a pill above the headline and the figure bleeding
   off the card's own edge.

   ── WHY THE PANEL IS LIGHT BUT THE STAGE IS NOT ────────────────────────────
   Both men are photographed in white and pale blue, and white on a pale ground
   is a figure you have to look for. A wholly light card would lose them. So the
   card is a soft green tint, which keeps the copy side clean and quiet, and the
   men stand inside a deep green arch that gives their clothes an edge to read
   against. The arch is also the poster device the campaign's own artwork uses.

   ── ONE BOX, ONE SET OF PERCENTAGES ────────────────────────────────────────
   The arch, both men and the ribbon are positioned as percentages of one
   `aspect-[4/3]` stage. They used to be anchored from different corners in
   different units, and at any width where the copy made the card taller than
   planned the layers slid apart and the ribbon ran across both men's mouths.
   Sharing one fixed-ratio box means every coordinate below scales together, at
   every width, or not at all — and the ribbon's SVG carries the same 4:3
   viewBox, so its text never stretches.

   ── THE COMPOSITION, IN STAGE PERCENTAGES ──────────────────────────────────
     Arch      bottom 0, 3%–97% across, full height, a half-round top. Wider and
               taller than the pair on purpose: it has to stand behind both
               heads, or a pale cap ends up on the pale card with nothing to
               read against, which is the whole reason the arch exists.
     Amaechi   bottom 0, left 50%, 88% tall, drawn first, so he stands behind.
     Atiku     bottom 0, left 6%, 96% tall, drawn last, so he stands in front,
               and carrying the shadow that falls onto the man behind him.

   ── WHY ATIKU IS IN FRONT, AND LARGER-HEADED ───────────────────────────────
   The two photographs are not framed alike. Amaechi's runs head to below the
   waist; Atiku's is a much tighter portrait, cap to mid-chest. Matched by head
   size, Atiku's bust would end in mid-air a third of the way up the card, and
   matched by height his head would be the only thing in the frame.

   Standing him in front resolves it: a nearer figure has a larger head and is
   cropped sooner by the bottom edge, so the difference in framing reads as
   depth rather than as an error in scale. It also puts the head of the ticket
   in front of his running mate, which is the right way round.

   He faces the viewer's right in the photograph as supplied, which is into the
   composition and towards Amaechi. Mirroring him would turn him out of the card
   and away from his own running mate, so the file is used as it came.

   The pair spans 6%–94% and overlaps for about six points at every width. Set
   side by side they read as two cut-outs filed next to each other; overlapping,
   with the front figure's shadow falling on the one behind, they read as two
   men standing together, which is what a joint ticket is.

   ── ROUNDED CORNERS ────────────────────────────────────────────────────────
   The rest of the site is deliberately square (`--radius-card: 0`). The panel
   and its controls are the one exception, because the reference's whole
   character is the soft card. Nothing outside this component inherits it.
   ════════════════════════════════════════════════════════════════════════ */

/* Both portraits are drawn at quality 92. The default 75 re-encodes the cut-out
   a second time, and the large flat gradients in Atiku's pale robe are exactly
   what a low-quality webp pass smears — he came out visibly softer than Amaechi
   beside him, which read as a worse photograph rather than a worse setting.

   The ribbon rides the last sixth of the stage, under Amaechi's folded arms —
   his arms are the pose, and a band across them reads as a band across him.
   Drawn in the stage's own 4:3 units, 400 x 300.

   It is clipped to the arch, so both ends finish on the arch's own edges. Left
   unclipped, the path ran past the arch and stopped dead on the pale card, a
   cut end hanging in the gap beside the copy. */
const RIBBON_PATH = "M-8,286 C70,268 150,258 236,252 C310,247 372,243 412,234";

/* The arch in the same units: 3%–97% across (12–388), a half-round top of
   radius 188, flat sides down to the foot. */
const ARCH_PATH = "M12,300 V188 A188,188 0 0 1 388,188 V300 Z";

function Stage() {
  const id = React.useId().replace(/:/g, "");

  return (
    <div className="relative aspect-[6/5] w-full self-end sm:aspect-[4/3]">
      {/* The arch. Its flat foot is the card's bottom edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[3%] bottom-0 h-full rounded-t-full bg-brand-700"
      />
      {/* A soft ring inside the arch, so the green is not a flat slab. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[12%] bottom-0 h-[86%] rounded-t-full border border-white/15"
      />

      {/* Drawn first, so he stands behind. */}
      <Image
        src={assets.ticketAmaechi}
        alt=""
        priority
        quality={92}
        sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 40vw, 88vw"
        className="absolute bottom-0 left-[50%] h-[88%] w-auto object-contain object-bottom"
      />
      {/* Head of the ticket, and drawn last, so he stands in front. */}
      <Image
        src={assets.ticketAtiku}
        alt=""
        priority
        quality={92}
        sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 46vw, 100vw"
        className="absolute bottom-0 left-[6%] h-[96%] w-auto object-contain object-bottom drop-shadow-[14px_10px_22px_rgba(0,0,0,0.3)]"
      />

      {/* Too small to read on a phone, where it would only be an orange stripe
          through two faces' worth of photograph. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        className="absolute inset-0 hidden h-full w-full sm:block"
      >
        <defs>
          <path id={`${id}-ribbon`} d={RIBBON_PATH} />
          <clipPath id={`${id}-arch`}>
            <path d={ARCH_PATH} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id}-arch)`}>
          <use href={`#${id}-ribbon`} fill="none" stroke="var(--color-ember-500)" strokeWidth="19" />
          <text
            className="font-display"
            fill="var(--color-ink-950)"
            fontSize="10"
            fontWeight="800"
            letterSpacing="1.4"
            dominantBaseline="central"
            textAnchor="middle"
          >
            <textPath href={`#${id}-ribbon`} startOffset="52%">
              {RIBBON.toUpperCase()}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
}

/* The campaign tape between the hero and the agenda. The call to vote, said
   the way a rally chant says it: short, repeated, impossible to miss. Every
   phrase is the ticket's own, or the movement's tagline. It is decorative
   (aria-hidden) because each of these facts is stated in text on the page. */
const tape = [
  "Vote ADC",
  "Atiku for President",
  "Amaechi for Vice President",
  "Affordable Nigeria",
  election.day,
  "Every ward matters",
];

function Tape() {
  const run = (copy) =>
    tape.map((phrase) => (
      <span key={`${copy}-${phrase}`} className="flex shrink-0 items-center gap-6 pr-6">
        <span>{phrase}</span>
        <span aria-hidden="true" className="size-1.5 rotate-45 bg-ink-950" />
      </span>
    ));

  return (
    <div aria-hidden="true" className="overflow-hidden bg-ember-500 text-ink-950">
      {/* Two identical runs, moved by exactly half their width, loop without
          a seam. Paused on hover so it can be read. */}
      <div className="flex w-max animate-marquee py-3.5 font-display text-[0.8125rem] font-extrabold tracking-[0.16em] whitespace-nowrap uppercase hover:[animation-play-state:paused] sm:py-4 sm:text-[0.875rem]">
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="shell shell-wide pt-5 pb-7 sm:pt-6 lg:pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-50 sm:rounded-[2rem] lg:rounded-[2.75rem]">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)]">
              {/* ── the argument ─────────────────────────────────────────────
                  What a voter asks, in the order they ask it: which election
                  and when, what this ticket is for, and what to do about it.
                  The three named pledges that used to sit here have gone: the
                  agenda band directly below now sets out all twelve, and the
                  hero was answering a question the next screen answers
                  better. */}
              <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-11 lg:py-12 lg:pr-6 lg:pl-14">
                <p className="flex w-fit items-center gap-2.5 rounded-full border border-ink-950/12 bg-white/80 py-2 pr-4 pl-2">
                  <span className="flex items-center rounded-full bg-white p-1">
                    <Image
                      src={assets.adcLogo}
                      alt="African Democratic Congress"
                      sizes="32px"
                      className="h-4 w-auto"
                    />
                  </span>
                  <span className="text-[0.625rem] font-bold tracking-[0.14em] text-ink-700 uppercase sm:text-[0.6875rem]">
                    ADC 2027 · {election.day}
                  </span>
                </p>

                <h1 className="mt-6">
                  <span className="sr-only">
                    From Expensive Nigeria to Affordable Nigeria.
                  </span>
                  <span
                    aria-hidden="true"
                    className="block font-display text-fluid-lg font-extrabold tracking-[-0.03em] text-ink-400 line-through decoration-ember-500 decoration-[0.09em]"
                  >
                    Expensive Nigeria.
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1.5 block text-fluid-4xl text-content"
                  >
                    {/* No rule under this word: on two lines it lands between
                        them and reads as a strike through "Nigeria". The ember
                        is already carried by the struck line above. */}
                    <span className="text-brand-700">Affordable</span>
                    <br />
                    Nigeria.
                  </span>
                </h1>

                <p className="prose-body mt-5 max-w-[36ch]">
                  A movement organising in every ward in Nigeria behind one
                  presidential ticket, and a plan for what it costs to live
                  here.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <JoinCta
                    variant="primary"
                    size="lg"
                    className="rounded-full whitespace-nowrap"
                    arrowClassName="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <Button
                    href="/agenda"
                    variant="outline"
                    size="lg"
                    className="rounded-full whitespace-nowrap"
                  >
                    The 12-point plan
                    <ArrowRight
                      size={17}
                      strokeWidth={2.75}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>
                </div>

                <p className="mt-6 text-[0.75rem] text-content-subtle">
                  Membership is free and takes under two minutes.
                </p>
              </div>

              {/* ── the ticket ──────────────────────────────────────────── */}
              <Stage />
            </div>
          </div>
        </Reveal>

        {/* The caption. Outside the panel, so the panel stays a picture and the
            naming stays type — and so the two names sit on the page's own
            baseline grid rather than floating over a photograph. */}
        <Reveal delay={90}>
          <ul className="mt-5 flex flex-col gap-x-10 gap-y-3 px-1 sm:flex-row">
            {ticket.map((person) => (
              <li key={person.name} className="flex items-baseline gap-2.5">
                <span aria-hidden="true" className="size-1.5 shrink-0 bg-ember-500" />
                <p>
                  <span className="text-[0.625rem] font-bold tracking-[0.2em] text-ink-500 uppercase">
                    {person.prefix}{" "}
                  </span>
                  <span className="font-display text-[0.9375rem] font-extrabold tracking-[-0.01em] text-ink-950">
                    {person.name}
                  </span>
                  <span className="ml-2 text-[0.625rem] font-bold tracking-[0.16em] text-brand-700 uppercase">
                    {person.office}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Tape />
    </section>
  );
}
