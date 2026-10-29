import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";

import { assets } from "@/assets/assets";
import { election } from "@/lib/agenda";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════════════
   THE FRAME FOR SIGNING IN AND JOINING.

   Both pages used to be a PageHeader over a form floating in the middle of an
   empty white page: two outsized boxes, a button, and nothing else on screen.
   Nothing said whose site it was, what an account is for, or why it is safe to
   type a phone number into it — on the one page in the product where a
   stranger is being asked to hand something over.

   So the screen is split. The form keeps the reading side, at a width that
   suits a form rather than the page's text measure. The other half is the
   movement: the mark, what the account actually gives you, the date it is all
   for, and the promise that membership is free. On a phone that panel folds
   into a short band above the form — the mark and one line — because at 390px
   the argument is not worth the scroll, and the form is what they came for.

   Nothing in the panel is decoration. `points` is what this particular form
   gets you, which is the one thing most likely to carry someone over the line.
   ════════════════════════════════════════════════════════════════════════ */

export default function AuthShell({ kicker, title, lead, points = [], children, footer }) {
  return (
    /* The full-height rule is for the split only. On a phone the two are
       stacked rows of one grid, and a min-height on the container stretches
       BOTH of them: the band grew to half the screen and pushed the form,
       which is the only thing anybody came here for, below the fold. */
    <div className="grid lg:min-h-[calc(100vh-var(--masthead-offset,0px))] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      {/* ── The form ──────────────────────────────────────────────────── */}
      <div className="flex flex-col bg-white px-5 py-8 sm:px-8 lg:justify-center lg:px-14 lg:py-16 xl:px-20">
        <div className="mx-auto w-full max-w-[26rem]">
          {/* The site's masthead is off on these routes, so this is the whole
              way back to it. It sits above the heading rather than floating in
              a corner, because it is the first thing somebody who landed here
              by mistake goes looking for. */}
          <Link
            href="/"
            className="group -ml-2 mb-8 inline-flex items-center gap-2 px-2 py-2 font-display text-[0.75rem] font-bold tracking-[0.08em] text-ink-500 uppercase transition-colors hover:text-ink-950"
          >
            <ArrowLeft
              size={16}
              strokeWidth={2.75}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to home
          </Link>

          <header>
            {kicker && (
              <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-ember-600 uppercase">
                {kicker}
              </p>
            )}
            <h1 className="mt-3 font-display text-fluid-2xl font-extrabold tracking-[-0.03em] text-ink-950">
              {title}
            </h1>
            {lead && (
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-content-muted">{lead}</p>
            )}
          </header>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8 border-t border-ink-200 pt-6">{footer}</div>}
        </div>
      </div>

      {/* ── The movement ──────────────────────────────────────────────── */}
      {/* Order-first on a phone so the mark is the first thing on screen, and
          the panel there is a band rather than a column. */}
      <aside className="relative isolate order-first overflow-hidden bg-brand-900 text-white lg:order-last">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_80%_0%,var(--color-brand-600)_0%,var(--color-brand-800)_45%,var(--color-brand-950)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
        />

        <div className="flex h-full flex-col px-5 py-8 sm:px-8 lg:px-12 lg:py-16">
          <Link href="/" aria-label={`${site.name} home`} className="flex items-center gap-3">
            <Image
              src={assets.maapMark}
              alt=""
              sizes="80px"
              className="h-9 w-auto shrink-0 object-contain lg:h-11"
            />
            <span aria-hidden="true" className="h-8 w-px bg-white/20 lg:h-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.5rem] font-bold tracking-[0.24em] text-white/55 uppercase">
                Movement for
              </span>
              <span className="mt-1 font-display text-[0.8125rem] font-extrabold tracking-[-0.01em] uppercase lg:text-[0.9375rem]">
                Atiku Amaechi Presidency
              </span>
            </span>
          </Link>

          {/* Everything below the mark is the argument, and a phone does not
              get it: there, the band is the mark and the free-membership line
              only, and the form starts straight after. */}
          <div className="mt-12 hidden flex-1 flex-col lg:flex">
            <p className="font-display text-fluid-2xl leading-[1.05] font-extrabold tracking-[-0.03em]">
              Every ward matters.
              <span className="mt-3 block text-ember-400">Yours included.</span>
            </p>

            {points.length > 0 && (
              <ul className="mt-9 space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-5 shrink-0 place-items-center bg-ember-500 text-ink-950"
                    >
                      <Check size={13} strokeWidth={3.5} />
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Who the account is for, in the order of the ticket. It fills
                the middle of the panel with the one thing a member joining
                this movement is actually joining. */}
            <div className="mt-auto pt-10">
              <div className="grid grid-cols-2 border-t border-white/15 pt-6">
                {[
                  { prefix: "H.E.", name: site.aspirantShort, office: "For President" },
                  { prefix: "Rt. Hon.", name: site.runningMateShort, office: "For Vice President" },
                ].map((person, index) => (
                  <div
                    key={person.name}
                    className={cn("min-w-0 pr-4", index > 0 && "border-l border-white/15 pl-4")}
                  >
                    <p className="text-[0.5rem] font-bold tracking-[0.22em] text-white/45 uppercase">
                      {person.prefix}
                    </p>
                    <p className="mt-1 truncate font-display text-[0.9375rem] font-extrabold tracking-[-0.01em]">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-[0.5625rem] font-bold tracking-[0.16em] text-ember-400 uppercase">
                      {person.office}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-8 border-t border-white/15 pt-6 text-[0.625rem] font-bold tracking-[0.18em] text-white/50 uppercase">
                Election day · {election.day}
              </p>
            </div>
          </div>

          {/* The one promise that belongs on this screen at every size: the
              answer to "is this the kind of registration that ends with
              somebody asking me for money". */}
          <p className="mt-6 flex items-center gap-2 text-[0.75rem] font-semibold text-white/70 lg:mt-8">
            <ShieldCheck size={15} className="shrink-0 text-ember-400" aria-hidden="true" />
            Membership is free. MAAP never asks for payment.
          </p>
        </div>
      </aside>
    </div>
  );
}

/**
 * One field, everywhere in this flow.
 *
 * The old inputs were 3.25rem tall with a 2px grey box around them, which at
 * two fields on an empty page read as two grey slabs. These are 3rem, the
 * border is a hairline until the field is focused or wrong, and the error sits
 * under the field it belongs to and is wired to it by `aria-describedby`, so a
 * screen reader hears the problem while the field is focused rather than in a
 * summary at the top of the page.
 */
export function AuthField({
  id,
  label,
  hint,
  error,
  action,
  children,
  className,
  ...props
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="block text-[0.75rem] font-bold tracking-[0.08em] text-ink-700 uppercase"
        >
          {label}
        </label>
        {action}
      </div>

      {children ?? (
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "mt-2 h-12 w-full border bg-white px-3.5 text-[0.9375rem] text-ink-950",
            "transition-[border-color,box-shadow] placeholder:text-ink-400",
            "focus:outline-none focus:ring-2",
            error
              ? "border-red-600 focus:border-red-600 focus:ring-red-600/25"
              : "border-ink-300 focus:border-brand-600 focus:ring-brand-600/25"
          )}
          {...props}
        />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[0.75rem] leading-snug text-content-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-[0.75rem] leading-snug font-semibold text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
