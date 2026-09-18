import { leaders } from "@/lib/leaders";

/**
 * Single source of truth for site chrome.
 *
 * Nav links used to be written inline in both Navbar and Footer as relative
 * hrefs (`href="governance"`), which resolve against the *current* path and so
 * broke on any nested route. Everything is rooted here instead.
 */

/**
 * The site belongs to the movement, not to either half of the ticket.
 *
 * `name` is MAAP. It is what the masthead, the page titles and the structured
 * data identify. The two men the movement exists to support are carried
 * separately, and in their stated order — Atiku Abubakar for President, Rotimi
 * Amaechi for Vice President — so that neither the copy nor a future
 * contributor has to guess which way round the ticket runs.
 *
 * `runningMate` is deliberately not called `aspirant2`: a ticket has a
 * presidential candidate and a running mate, and naming the fields after the
 * offices is what stops the pair being rendered as interchangeable.
 */
export const site = {
  name: "Movement for Atiku Amaechi Presidency",
  shortName: "MAAP",
  acronym: "MAAP",
  tagline: "Every ward matters.",
  movement: "Movement for Atiku Amaechi Presidency (MAAP)",

  /** Head of the ticket. */
  aspirant: "H.E. Atiku Abubakar",
  aspirantShort: "Atiku Abubakar",
  aspirantHonorific: "GCON • Waziri Adamawa",
  aspirantOffice: "President",

  /** The running mate. */
  runningMate: "Rt. Hon. Chibuike Rotimi Amaechi",
  runningMateShort: "Rotimi Amaechi",
  runningMateHonorific: "CON • KSJ",
  runningMateOffice: "Vice President",

  /** How the ticket is named when both halves are set on one line. */
  ticket: "Atiku Abubakar and Rotimi Amaechi",

  party: "African Democratic Congress",
  partyShort: "ADC",
  partyUrl: "https://adc.org.ng",
  url: "https://amaechi.ng",
};

/**
 * Primary navigation: the items of the platform plan §3.1, plus the Join
 * action carried separately as `primaryCta`. Activities, Gallery and Videos are
 * one "Media" item — three bars' worth of space for one idea, an event and the
 * record of it.
 *
 * An item with `children` opens a dropdown on desktop and lists them indented
 * in the mobile drawer. The parent keeps its own `href`: the label still goes
 * somewhere when clicked, and the dropdown is a shortcut past that page rather
 * than the only way through it.
 *
 * Deliberately short: long navigation bars collapse badly on the small Android
 * screens most visitors arrive on. Amaechi's own record pages (The Journey,
 * Plan for Change, Leadership) sit under About rather than competing with the
 * movement's structure for space in the bar.
 */
export const navigation = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    description: "The movement, the mission, and the ticket.",
  },
  {
    label: "Our Leaders",
    href: "/leaders",
    description: "The two men the movement was formed to support.",
    allLabel: "Meet the ticket",
    children: leaders.map((leader) => ({
      label: leader.question,
      href: leader.href,
      office: leader.office,
      name: leader.name,
      description: leader.line,
      image: leader.portrait,
    })),
  },
  {
    label: "Agenda",
    href: "/agenda",
    description: "The 12-point plan: subsidy, jobs, schools, security.",
  },
  {
    label: "Structure",
    href: "/structure",
    description: "How MAAP is organised, and who coordinates your area.",
  },
  /* Media and News as one menu. They answer the same visitor question — "what
     is the movement doing, and what is being said about it" — so they share a
     slot, and the bar gives the movement's name back the room a seventh link
     was taking. The label stays "Media", the short word, because that is the
     width that matters on a laptop-sized masthead. */
  {
    label: "Media",
    href: "/media",
    description: "Activities, photographs, video and the newsroom.",
    children: [
      {
        label: "Media",
        href: "/media",
        description: "The calendar, and photographs and video from the field.",
      },
      {
        label: "News",
        href: "/news",
        description: "Statements, press releases and coverage.",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Reach the Secretariat and your zonal office.",
  },
];

export const primaryCta = {
  label: "Join MAAP",
  href: "/join",
};

export const secondaryCta = {
  label: "ADC Registration",
  href: "https://adc.org.ng/membership",
  external: true,
};

export const supportCta = {
  label: "Support",
  href: "/support",
};

/** §3.2: four columns, being the movement, taking part, media and reaching us. */
export const footerColumns = [
  {
    title: "The Movement",
    links: [
      { label: "The 12-Point Agenda", href: "/agenda" },
      { label: "About MAAP", href: "/about" },
      { label: "Structure", href: "/structure" },
      { label: "Our Leaders", href: "/leaders" },
      { label: "Who is Atiku?", href: "/about/atiku" },
      { label: "Who is Amaechi?", href: "/about/amaechi" },
      { label: "Plan for Change", href: "/planforchange" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Join MAAP", href: "/join" },
      { label: "Find Your Coordinator", href: "/structure#find" },
      { label: "Activities", href: "/media#activities" },
      { label: "Support the Campaign", href: "/support" },
      {
        label: "ADC Party Registration",
        href: "https://adc.org.ng/membership",
        external: true,
      },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "Newsroom", href: "/news" },
      { label: "Photographs", href: "/media#photographs" },
      { label: "Videos", href: "/media#video" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact the Secretariat", href: "/contact" },
      { label: "Find Your Chapter", href: "/connect" },
      { label: "Zonal Offices", href: "/contact#zonal" },
    ],
  },
];

export const socials = [
  { label: "X", href: "https://x.com/map9ja?s=11", icon: "x" },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@map.9ja?_r=1&_t=ZS-94FStXknDvN",
    icon: "tiktok",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61588365249213",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/map.9ja?igsh=MTViMGhkOXlla2w4YQ==",
    icon: "instagram",
  },
];

/** Headline record figures, reused by the hero, banner and stat rails. */
export const record = [
  { value: 1763, suffix: "+", unit: "KM", label: "Standard gauge rail delivered" },
  { value: 32, suffix: "", unit: "", label: "Modern train stations built" },
  { value: 11300, suffix: "+", unit: "", label: "Jobs created" },
  { value: 30, suffix: "+", unit: "YRS", label: "In public service" },
];
