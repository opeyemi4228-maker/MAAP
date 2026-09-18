"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/* How long the panel waits before closing once the pointer leaves. Long enough
   to survive a diagonal move from the label down to the second row, which cuts
   across the corner of the trigger; short enough that it does not feel stuck
   open when the pointer has genuinely gone somewhere else. */
const CLOSE_DELAY = 180;

/**
 * A masthead item with a dropdown, for desktop.
 *
 * ── TWO TARGETS, NOT ONE ───────────────────────────────────────────────────
 * The label is a link and the chevron is a button. The usual shortcut, one
 * element that opens on hover and navigates on click, breaks for two groups of
 * people: keyboard users, for whom there is no hover, and anyone on a large
 * tablet, for whom the first tap is both the hover and the click, so the page
 * changes before the menu can be read. Split, each target does one thing: the
 * label goes to the item's own page, the chevron opens the list.
 *
 * ── TWO KINDS OF MENU ──────────────────────────────────────────────────────
 * Our Leaders is a menu of people, and Media is a menu of places. People get a
 * portrait and their office, because a face is found faster than a name is
 * read. Places get neither — a thumbnail of "the newsroom" is decoration — so a
 * row only draws what its data actually carries: `image`, `office` and the
 * footer link (`allLabel` on the parent) are all optional, and a menu without
 * them is simply narrower and quieter.
 *
 * ── KEYBOARD ───────────────────────────────────────────────────────────────
 * Enter or Space on the chevron toggles. Arrow Down from either target opens
 * and moves into the list; Up and Down move within it. Escape closes and puts
 * focus back on the chevron, so the user is where they started. Tabbing out of
 * the item closes it rather than leaving a panel open over the page.
 *
 * ── WHEN CLOSED ────────────────────────────────────────────────────────────
 * `inert`, not only `opacity-0`. A transparent panel still takes focus and
 * clicks, which would put two invisible links in the tab order of every page.
 * ───────────────────────────────────────────────────────────────────────────
 */
export default function NavDropdown({ item, active, pathname, hidden }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const closeTimer = useRef(null);
  const panelId = useId();
  const hasPortraits = item.children.some((child) => child.image);

  const cancelClose = () => clearTimeout(closeTimer.current);

  const close = useCallback((returnFocus = false) => {
    clearTimeout(closeTimer.current);
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  const focusItem = (index) => {
    const links = panelRef.current?.querySelectorAll("a");
    if (!links?.length) return;
    links[(index + links.length) % links.length].focus();
  };

  /* A route change, or the masthead retracting on scroll, closes the panel.
     Left open, it would hang in space beneath a masthead that has left. */
  /* eslint-disable-next-line react-hooks/set-state-in-effect --
       Synchronising with the router and the masthead, both external to this
       component, which is what an effect is for. */
  useEffect(() => setOpen(false), [pathname, hidden]);

  // A click anywhere else closes it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onKeyDown = (event) => {
    const inPanel = panelRef.current?.contains(document.activeElement);

    if (event.key === "Escape" && open) {
      event.preventDefault();
      close(true);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        // The panel is inert until the next render lifts it.
        requestAnimationFrame(() => focusItem(0));
      } else {
        const links = [...(panelRef.current?.querySelectorAll("a") ?? [])];
        focusItem(inPanel ? links.indexOf(document.activeElement) + 1 : 0);
      }
    } else if (event.key === "ArrowUp" && open && inPanel) {
      event.preventDefault();
      const links = [...panelRef.current.querySelectorAll("a")];
      focusItem(links.indexOf(document.activeElement) - 1);
    }
  };

  return (
    <li
      ref={rootRef}
      className="relative"
      /* Hover opens on a mouse only. On touch, pointerenter fires as part of
         the tap, which would open the panel and navigate in the same gesture. */
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
      }}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget)) close();
      }}
      onKeyDown={onKeyDown}
    >
      <div className="group relative flex items-center">
        {/* Hover plate spans both targets, so they read as one item. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 bg-brand-50 transition-[opacity,transform] duration-300 ease-out-quart",
            open ? "scale-100 opacity-100" : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          )}
        />

        <Link
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
          className={cn(
            "relative flex items-center py-2.5 pr-1 pl-3",
            "font-display text-[0.75rem] font-bold tracking-[0.11em] whitespace-nowrap uppercase",
            "transition-colors duration-200",
            active || open ? "text-brand-700" : "text-content-muted hover:text-brand-700"
          )}
        >
          {item.label}
        </Link>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Hide" : "Show"} ${item.label.toLowerCase()}`}
          onClick={() => {
            cancelClose();
            setOpen((value) => !value);
          }}
          className={cn(
            "grid h-10 w-7 place-items-center pr-2 transition-colors duration-200",
            active || open ? "text-brand-700" : "text-content-muted hover:text-brand-700"
          )}
        >
          <ChevronDown
            size={14}
            strokeWidth={2.75}
            aria-hidden="true"
            className={cn(
              "transition-transform duration-300 ease-out-quart",
              open && "rotate-180"
            )}
          />
        </button>

        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-3 bottom-1 h-0.75 origin-center bg-ember-500 transition-transform duration-300 ease-out-quart",
            active ? "scale-x-100" : "scale-x-0"
          )}
        />
      </div>

      {/* pt-3 is a bridge, not spacing. The panel is visually detached from the
          bar, but the padding is still part of the <li>, so the pointer never
          crosses dead space on its way down and the panel never flickers shut. */}
      <div
        id={panelId}
        ref={panelRef}
        inert={!open}
        className={cn(
          "absolute top-full left-1/2 z-10 -translate-x-1/2 pt-3",
          hasPortraits ? "w-[25rem]" : "w-[19rem]",
          "transition-[opacity,translate] duration-200 ease-out-quart motion-reduce:transition-none",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
      >
        <div className="border-t-3 border-ember-500 bg-surface shadow-e4">
          <ul className="p-2">
            {item.children.map((child) => {
              const current = pathname === child.href;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group/row flex items-center gap-4 p-3 transition-colors duration-200 focus-visible:bg-brand-50",
                      current ? "bg-brand-50" : "hover:bg-ink-50"
                    )}
                  >
                    {/* 48x60 CSS pixels. A face is recognised faster than a
                        name is read, so the portrait is what the eye finds. */}
                    {child.image && (
                      <span className="relative h-15 w-12 shrink-0 overflow-hidden bg-ink-100">
                        <Image
                          src={child.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover object-top"
                        />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      {child.office && (
                        <span className="mb-1 block font-display text-[0.625rem] font-bold tracking-[0.16em] text-ember-600 uppercase">
                          {child.office}
                        </span>
                      )}
                      <span className="block font-display text-[0.9375rem] leading-tight font-extrabold tracking-tight text-ink-950 group-hover/row:text-brand-700">
                        {child.label}
                      </span>
                      <span className="mt-1 block truncate text-[0.75rem] text-content-muted">
                        {child.description}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="shrink-0 -translate-x-1 text-ink-300 opacity-0 transition-[opacity,translate,color] duration-200 group-hover/row:translate-x-0 group-hover/row:text-brand-700 group-hover/row:opacity-100"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Only where the parent has a page that is more than its children
              added together. Leaders does (/leaders sets the two men side by
              side); Media does not — both of its destinations are already the
              rows above, and a third link to one of them would be noise. */}
          {item.allLabel && (
            <Link
              href={item.href}
              className="group/all flex items-center justify-between gap-4 border-t border-hairline px-5 py-3.5 font-display text-[0.6875rem] font-bold tracking-[0.12em] text-content-muted uppercase transition-colors duration-200 hover:bg-ink-50 hover:text-brand-700 focus-visible:bg-brand-50"
            >
              {item.allLabel}
              <ArrowRight
                size={14}
                strokeWidth={2.75}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/all:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
