"use client";

import React, { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { election } from "@/lib/agenda";

/* A clock the whole page shares, ticking once a minute: the smallest unit the
   countdown shows. The server snapshot is null, so the server and the first
   client paint agree (placeholders), and the real figures land on hydration
   instead of mismatching it. */
const MINUTE = 60_000;

function subscribe(onChange) {
  const id = setInterval(onChange, MINUTE / 4);
  return () => clearInterval(id);
}
const getSnapshot = () => Math.floor(Date.now() / MINUTE);
const getServerSnapshot = () => null;

function split(minuteStamp) {
  if (minuteStamp == null) return null;
  const ms = Math.max(0, new Date(election.date).getTime() - minuteStamp * MINUTE);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / MINUTE) % 60,
  };
}

/**
 * Days, hours and minutes to the presidential poll, from lib/agenda.js.
 *
 * `tone="dark"` for ink and green fields, `tone="light"` for white ones.
 */
export default function ElectionCountdown({ tone = "dark", compact = false, inline = false, className }) {
  const left = split(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
  const dark = tone === "dark";

  /* One line of figures, for a bar with no room for the three-column block. */
  if (inline) {
    const parts = [
      [left?.days, "days"],
      [left?.hours, "hrs"],
      [left?.minutes, "min"],
    ];
    return (
      <p
        role="timer"
        aria-live="off"
        aria-label={
          left
            ? `${left.days} days, ${left.hours} hours and ${left.minutes} minutes until the presidential election on ${election.day}`
            : `Countdown to the presidential election on ${election.day}`
        }
        className={cn("flex items-baseline gap-3 tabular-nums", className)}
      >
        {parts.map(([value, unit], index) => (
          <span key={unit} aria-hidden="true" className="flex items-baseline gap-1">
            <span
              className={cn(
                "font-display text-[1.125rem] leading-none font-extrabold tracking-[-0.02em]",
                index === 0 ? "text-ember-400" : dark ? "text-white" : "text-ink-950"
              )}
            >
              {value == null ? "--" : index === 0 ? value : String(value).padStart(2, "0")}
            </span>
            <span className={cn("text-[0.625rem] font-bold tracking-[0.12em] uppercase", dark ? "text-white/50" : "text-ink-500")}>
              {unit}
            </span>
          </span>
        ))}
      </p>
    );
  }

  const units = [
    { label: "Days", value: left?.days },
    { label: "Hours", value: left?.hours },
    { label: "Minutes", value: left?.minutes },
  ];

  return (
    <div className={className}>
      <p
        role="timer"
        aria-live="off"
        aria-label={
          left
            ? `${left.days} days, ${left.hours} hours and ${left.minutes} minutes until the presidential election on ${election.day}`
            : `Countdown to the presidential election on ${election.day}`
        }
        className="grid grid-cols-3"
      >
        {units.map((unit, index) => (
          <span
            key={unit.label}
            aria-hidden="true"
            className={cn(
              "flex flex-col",
              index > 0 && "border-l pl-4 sm:pl-5",
              dark ? "border-white/15" : "border-ink-200"
            )}
          >
            <span
              className={cn(
                "font-display leading-none font-extrabold tracking-[-0.04em] tabular-nums",
                compact ? "text-fluid-2xl" : "text-fluid-3xl",
                index === 0 ? "text-ember-400" : dark ? "text-white" : "text-ink-950",
                !dark && index === 0 && "text-ember-600"
              )}
            >
              {unit.value == null ? "--" : String(unit.value).padStart(index === 0 ? 1 : 2, "0")}
            </span>
            <span
              className={cn(
                "mt-2 text-[0.625rem] font-bold tracking-[0.18em] uppercase",
                dark ? "text-white/50" : "text-ink-500"
              )}
            >
              {unit.label}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
