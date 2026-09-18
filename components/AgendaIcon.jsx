import React from "react";
import {
  Banknote,
  Fuel,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  Network,
  Scissors,
  Ship,
  ShieldCheck,
  Wheat,
  Zap,
} from "lucide-react";

/* lib/agenda.js names its icons as strings so it stays plain data. This is the
   one place those names become components, and the only icons it can name. */
const icons = {
  Banknote,
  Fuel,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  Network,
  Scissors,
  Ship,
  ShieldCheck,
  Wheat,
  Zap,
};

export default function AgendaIcon({ name, ...props }) {
  const Icon = icons[name] ?? ShieldCheck;
  return <Icon aria-hidden="true" {...props} />;
}
