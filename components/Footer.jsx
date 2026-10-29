"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowRight, ArrowUpRight, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { footerColumns, socials, site, supportCta } from "@/lib/site";
import { assets } from "@/assets/assets";
import Button from "@/components/ui/Button";
import BrandIcon from "@/components/ui/BrandIcon";
import { useViewer } from "@/lib/useViewer";

/* ════════════════════════════════════════════════════════════════════════════
   THE FOOTER, on the plan of adc.org's.

   Theirs runs in four bands, and so does this one:

     1. The appeal     A white, centred band: one sentence on why support
                       matters, one filled button, one quieter link.
     2. The newsletter A dark band with a single heading and a single field.
     3. The directory  Logo and round social icons on the left, the link
                       columns across the middle, and a narrow column on the
                       right holding the ask again and Contact.
     4. The base bar   Copyright, and the legal links.

   The appeal is skipped on the homepage only. The homepage already closes on
   a full-width ember "Every ward matters" band, and two centred calls to
   action back to back read as the page asking twice.

   The top of the dark block carries the same 3px ember rule as the masthead's
   seam, so the page opens and closes on the same line.
   ════════════════════════════════════════════════════════════════════════ */

const linkClass =
  "inline-block text-[0.875rem] leading-snug text-white/65 transition-colors duration-200 hover:text-white";

function FooterLink({ link }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {link.label}
        {/* Inline, so on a wrapped label it follows the last word rather
            than being pushed to the column's far edge. */}
        <ArrowUpRight
          size={12}
          strokeWidth={2.5}
          aria-hidden="true"
          className="ml-1 inline-block align-[-1px] text-white/40"
        />
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label}
    </Link>
  );
}

/* Round, as adc.org's are. The icons are the one place the footer departs from
   the square system: a row of circles reads as "social" at a glance, where a
   row of squares reads as a toolbar. */
function SocialLink({ label, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`MAAP on ${label}`}
      className="grid size-10 place-items-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/12 transition-colors duration-300 ease-out-quart hover:bg-ember-500 hover:text-ink-950 hover:ring-ember-500"
    >
      <BrandIcon name={icon} className="size-4" />
    </a>
  );
}

function Appeal() {
  return (
    <section aria-labelledby="footer-appeal" className="border-t border-ink-200 bg-white">
      <div className="shell py-20 text-center lg:py-28">
        <p className="eyebrow eyebrow-center text-ember-600">Support the movement</p>
        <h2
          id="footer-appeal"
          className="mx-auto mt-5 max-w-3xl text-fluid-3xl text-ink-950"
        >
          Your support builds the structure, ward by ward.
        </h2>
        <p className="prose-body mx-auto mt-5 max-w-xl">
          A day of your time, a skill, a room for a ward meeting. Every seat
          filled makes the structure stronger. Let&rsquo;s move forward together.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <Button href={supportCta.href} variant="primary" size="lg">
            Support the campaign
            <ArrowRight
              size={17}
              strokeWidth={2.75}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
          <Link
            href="/structure#find"
            className="group inline-flex items-center gap-2 font-display text-[0.8125rem] font-extrabold tracking-[0.1em] text-ink-950 uppercase underline decoration-ember-500 decoration-2 underline-offset-[6px] transition-colors hover:text-brand-700"
          >
            Take action
            <ArrowRight
              size={15}
              strokeWidth={2.75}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  /* A member who has already joined should not be invited to join, anywhere.
     The footer is on every page, so leaving it alone would undo the work done
     on all the others. The link is replaced rather than removed so the column
     keeps its shape and still leads somewhere useful. */
  const { member } = useViewer();
  const columns = member
    ? footerColumns.map((column) => ({
        ...column,
        links: column.links.map((link) =>
          link.href === "/join" ? { label: "Your membership", href: "/portal" } : link
        ),
      }))
    : footerColumns;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      // TODO: point at the real subscription endpoint once it exists.
      await new Promise((resolve) => setTimeout(resolve, 700));
      toast.success("You're on the list. Look out for updates from the movement.");
      setEmail("");
    } catch {
      toast.error("That didn't go through. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer>
      {pathname !== "/" && <Appeal />}

      <div className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div aria-hidden="true" className="h-0.75 bg-ember-500" />
        {/* The hero's green, once, as light from the top corner. Enough to
            tie the footer to the top of the page without tinting the ink. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_100%_0%,color-mix(in_oklch,var(--color-brand-700)_38%,transparent)_0%,transparent_70%)]"
        />

        {/* ---------------------------------------------------- newsletter */}
        <div className="border-b border-white/10">
          <div className="shell grid gap-8 py-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16">
            <div className="lg:col-span-5">
              <h2 className="font-display text-fluid-2xl font-extrabold tracking-[-0.03em]">
                Join our newsletter
              </h2>
              <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-white/60">
                Statements, events and new appointments in your state, as they
                happen.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="h-14 w-full min-w-0 border border-white/20 bg-white/[0.06] px-5 text-[0.9375rem] text-white transition-colors duration-200 placeholder:text-white/40 focus:border-ember-400 focus:bg-white/10 focus:outline-none sm:flex-1 sm:border-r-0"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "group inline-flex h-14 shrink-0 items-center justify-center gap-2.5 border-2 border-ember-500 bg-ember-500 px-8",
                    "font-display text-[0.8125rem] font-extrabold tracking-[0.1em] text-ink-950 uppercase",
                    "transition-colors duration-300 ease-out-quart hover:border-white hover:bg-white",
                    "disabled:pointer-events-none disabled:opacity-60"
                  )}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                      Subscribing
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight
                        size={17}
                        strokeWidth={2.75}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-3 text-[0.75rem] text-white/45">
                Unsubscribe at any time. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>

        {/* ----------------------------------------------------- directory */}
        <div className="shell grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Identity */}
          <div className="lg:col-span-3">
            <Link href="/" aria-label={`${site.name} home`} className="inline-flex items-center gap-3">
              <Image
                src={assets.maapMark}
                alt=""
                sizes="96px"
                className="h-11 w-auto shrink-0 object-contain"
              />
              <span aria-hidden="true" className="h-9 w-px bg-white/15" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[0.5rem] font-bold tracking-[0.26em] text-white/50 uppercase">
                  Movement for
                </span>
                <span className="mt-1.5 font-display text-[0.9375rem] font-extrabold tracking-[-0.01em] uppercase">
                  Atiku Amaechi
                  <br />
                  Presidency
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-[0.875rem] leading-relaxed text-white/55">
              Organising in all 36 states, the FCT, 774 local governments and
              over 8,000 wards.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <SocialLink {...social} />
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7 xl:gap-x-10"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-display text-[0.75rem] font-extrabold tracking-[0.14em] text-white uppercase">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* The ask, again, and the party. adc.org ends its directory on a
              Donate button and a Contact link; ours ends on Support, Contact,
              and whose platform the ticket stands on. */}
          <div className="flex flex-col gap-4 sm:max-w-xs lg:col-span-2">
            <Button href={supportCta.href} variant="ember" size="md" full>
              Support
            </Button>
            <Button href="/contact" variant="inverseOutline" size="md" full>
              Contact
            </Button>

            <a
              href={site.partyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-3 border-t border-white/10 pt-6"
            >
              <span className="shrink-0 bg-white p-1">
                <Image
                  src={assets.adcLogo}
                  alt=""
                  sizes="40px"
                  className="size-8 object-contain"
                />
              </span>
              <span className="text-[0.6875rem] leading-snug text-white/55 transition-colors group-hover:text-white">
                On the platform of the {site.party}
              </span>
            </a>
          </div>
        </div>

        {/* ── The people it is all for ──────────────────────────────────────
            A band, not two thumbnails in a 20rem column. These are the only
            two photographs of the movement in the field that the repository
            holds, so they are given the width to be read as photographs: each
            one half the page, captioned over its own foot, both linking to
            the rest of them.

            The caption sits on a scrim rather than under the frame. A line of
            grey type under a photograph is a credit; a line over the bottom of
            it is what the picture is of, and it keeps the two frames reading
            as one strip.

            Add a third photograph and the grid becomes three across at lg on
            its own — nothing here counts to two.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="border-t border-white/10">
          <div className="shell py-12 lg:py-16">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-ember-400 uppercase">
                  The movement, in the field
                </p>
                <h2 className="mt-3 font-display text-fluid-xl font-extrabold tracking-[-0.025em]">
                  Nigerians, ward by ward.
                </h2>
              </div>
              <Link
                href="/media#photographs"
                className="group inline-flex items-center gap-2 font-display text-[0.75rem] font-extrabold tracking-[0.1em] text-white uppercase transition-colors hover:text-ember-400"
              >
                All photographs
                <ArrowRight
                  size={14}
                  strokeWidth={3}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <ul className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
              {[
                { src: assets.Camp2, alt: "Supporters at a ward congress" },
                { src: assets.Camp1, alt: "Mobilisation drive in the market" },
              ].map((photo) => (
                <li key={photo.alt} className="group relative bg-ink-900">
                  <Link href="/media#photographs" className="block">
                    <span className="relative block aspect-16/9 overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink-950/90 to-transparent"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5 text-[0.8125rem] font-semibold text-white">
                        <span aria-hidden="true" className="h-0.75 w-5 shrink-0 bg-ember-500" />
                        {photo.alt}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------ base bar */}
        <div className="border-t border-white/10">
          <div className="shell flex flex-col gap-4 py-6 text-[0.8125rem] text-white/50 lg:flex-row lg:items-center lg:justify-between">
            <p>
              Copyright © {year} {site.movement}. All rights reserved.
            </p>

            {/* Standing policy from /terms, repeated in the base bar of every
                page so nobody has to go looking for it before they are asked
                for a "registration fee". */}
            <p className="flex items-center gap-2 text-white/60">
              <ShieldCheck size={15} className="shrink-0 text-ember-400" aria-hidden="true" />
              Membership is free. MAAP never asks for payment.
            </p>

            <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms of Use
              </Link>
              <Link href="/news" className="transition-colors hover:text-white">
                Press
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
