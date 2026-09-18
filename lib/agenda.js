/**
 * The agenda: what the ticket says it will do, in one place.
 *
 * ── THE RULE FOR THIS FILE ──────────────────────────────────────────────────
 * Every commitment here is one Atiku Abubakar or his campaign has made in
 * public, and every pillar carries the source it was taken from. Nothing is
 * extrapolated, costed or improved on. If a figure is not in the source, it is
 * not in this file.
 *
 * That is not caution for its own sake. A campaign site that overstates its
 * own candidate hands the other side the correction, and the correction is
 * what gets shared. When the ADC publishes its full manifesto, it supersedes
 * this summary. Update the pillar and its `source` together.
 *
 * `forYou` is the one field written by the movement rather than taken from the
 * source. It says, in a sentence a trader would use, who the commitment is
 * aimed at. It must never add a promise the commitments do not already make.
 *
 * House style is that of lib/atiku.js: short sentences, one idea each.
 * ───────────────────────────────────────────────────────────────────────────
 */

/* ── Sources ────────────────────────────────────────────────────────────── */

const src = {
  twelvePoints: {
    label: "Atiku releases 12-point plan (Politics Nigeria)",
    url: "https://politicsnigeria.com/2026/09/13/2027-atiku-releases-12-points-plan-for-nigeria/",
    date: "13 September 2026",
  },
  twelvePointsArbiterz: {
    label: "12-point plan: subsidy, $10bn fund (Arbiterz)",
    url: "https://arbiterz.com/atiku-unveils-12-point-plan-for-2027-presidential-bid-pledges-subsidy-review-and-10bn-youth-fund",
    date: "14 September 2026",
  },
  subsidyClarified: {
    label: "Atiku's campaign clarifies the subsidy plan (Legit.ng)",
    url: "https://www.legit.ng/politics/1727200-atiku-update-plan-restore-subsidy/",
    date: "25 August 2026",
  },
  subsidyRestoring: {
    label: "“I'm restoring subsidy to cut fuel, transport costs” (Vanguard)",
    url: "https://www.vanguardngr.com/2026/09/im-restoring-subsidy-to-cut-fuel-transport-costs-atiku/",
    date: "12 September 2026",
  },
  acceptance: {
    label: "Acceptance speech as ADC presidential candidate (The Eagle Online)",
    url: "https://theeagleonline.com.ng/my-priorities-if-elected-president-in-2027-by-atiku-abubakar/",
    date: "27 April 2026",
  },
  inec: {
    label: "INEC moves 2027 presidential election to January 16 (The Guardian)",
    url: "https://guardian.ng/politics/inec-moves-2027-presidential-election-to-january-16/",
    date: "February 2026",
  },
};

/* ── The election ───────────────────────────────────────────────────────── */

/**
 * INEC's revised timetable. The countdown reads `date`, so if INEC moves the
 * poll again, this is the only line that changes.
 */
export const election = {
  date: "2027-01-16T08:00:00+01:00",
  label: "Presidential and National Assembly elections",
  day: "Saturday 16 January 2027",
  governorship: "Saturday 6 February 2027",
  source: src.inec,
};

/* ── The argument ───────────────────────────────────────────────────────── */

/**
 * The campaign's own framing of the election, from the spokesperson's
 * clarification of the subsidy plan. Attributed to him, not to Atiku.
 */
export const framing = {
  quote:
    "The choice is not removal of subsidy versus restoration of subsidy. It is Expensive Nigeria versus Affordable Nigeria.",
  by: "Phrank Shaibu",
  role: "Spokesperson to Atiku Abubakar",
  source: src.subsidyClarified,
};

/* ── The headline pledge ────────────────────────────────────────────────── */

/**
 * The subsidy, set out in full, because it is the pledge most people will have
 * heard secondhand and most likely heard wrong. An aide's early description
 * ("restore it and remove it later") was publicly disowned by the campaign as
 * misleading. What follows is the corrected version.
 */
export const subsidy = {
  slug: "subsidy",
  kicker: "The headline pledge",
  title: "Bring back the subsidy. This time, on what Nigeria makes.",
  lead: "Atiku has pledged to restore a targeted petrol subsidy, to bring down the cost of fuel, of transport and of moving food to market.",
  /* The four properties the campaign has committed to, in its own words. */
  terms: [
    {
      label: "What it pays for",
      value: "Domestic refining and production",
      detail: "Not imported fuel. The campaign calls it a production subsidy.",
    },
    { label: "Who it is for", value: "Targeted", detail: "Aimed at bringing down the cost of living, not paid on every litre imported." },
    { label: "How big", value: "Capped", detail: "A fixed limit, not an open-ended bill." },
    { label: "Who checks it", value: "Independently audited", detail: "Checked by auditors outside the scheme itself." },
  ],
  exit: {
    title: "When it ends",
    body: "Measurable exit conditions, built in from the start, rather than a fixed withdrawal date.",
    quote:
      "You do not remove scaffolding because the calendar says so. You remove it when the building can stand securely on its own.",
    by: "Phrank Shaibu, spokesperson",
  },
  /* Atiku's own line, from his posts on X explaining the plan. */
  voice: {
    quote: "I choose the Aba shoemaker.",
    by: "Atiku Abubakar",
    context:
      "Explaining why support should go to what Nigerians produce, not to what the country imports.",
  },
  beneficiaries: ["Bus drivers", "Traders", "Barbers", "Tailors"],
  sources: [src.subsidyClarified, src.subsidyRestoring, src.twelvePoints],
};

/* ── The twelve points ──────────────────────────────────────────────────── */

/**
 * Grouped into four themes for reading. The grouping and the order are the
 * movement's, not the campaign's. The source lists the points but does not
 * rank them, and nothing here should be read as a ranking.
 *
 * `icon` is a lucide-react export name, resolved in components/AgendaIcon.jsx,
 * so this file stays plain data that a server component can import.
 */
export const themes = [
  {
    slug: "cost-of-living",
    title: "Cost of living",
    line: "Cheaper to move, to power a shop, to feed a family.",
    pillars: [
      {
        slug: "subsidy",
        icon: "Fuel",
        title: "Restore a targeted petrol subsidy",
        pledge: "A capped, audited subsidy on domestic refining and production, to reduce the cost of fuel and transport.",
        forYou: "For anyone who pays a bus fare, runs a generator or moves goods.",
        commitments: [
          "Targeted, capped and independently audited",
          "Supports local refining and production, not imported fuel",
          "Measurable exit conditions instead of a fixed end date",
        ],
        source: src.subsidyClarified,
      },
      {
        slug: "electricity",
        icon: "Zap",
        title: "Fair electricity billing",
        pledge: "Review the tariff classification system to end what he calls discriminatory billing.",
        forYou: "For households and small businesses billed by band rather than by the supply they get.",
        commitments: [
          "Review the service-based tariff classification",
          "Treat reliable power as the foundation of industrialisation",
        ],
        source: src.twelvePoints,
      },
      {
        slug: "agriculture",
        icon: "Wheat",
        title: "Safe, affordable farming",
        pledge: "Secure farming communities, lower the cost of production and widen farmers' access to finance.",
        forYou: "For farmers who cannot reach their land, and families paying for what they cannot grow.",
        commitments: [
          "Improve security in farming communities",
          "Lower production costs",
          "Increase access to agricultural financing",
        ],
        source: src.twelvePoints,
      },
      {
        slug: "borders",
        icon: "Handshake",
        title: "Reopen the land borders to trade",
        pledge: "Reopen Nigeria's land borders to legitimate commercial activity.",
        forYou: "For traders and border communities whose livelihoods depend on cross-border commerce.",
        commitments: ["Restore land borders to legitimate commercial activity"],
        source: src.twelvePoints,
      },
    ],
  },
  {
    slug: "opportunity",
    title: "Opportunity",
    line: "Capital for the young, school without the debt, ports that bring work.",
    pillars: [
      {
        slug: "youth-fund",
        icon: "Banknote",
        title: "A $10 billion fund for young people and women",
        pledge: "A $10 billion startup and entrepreneurship financing programme for young people and women.",
        forYou: "For the young founder or the woman in business who has an idea and no access to capital.",
        commitments: ["$10 billion in startup and entrepreneurship financing", "Open to young people and women"],
        source: src.twelvePointsArbiterz,
      },
      {
        slug: "education",
        icon: "GraduationCap",
        title: "Education without the debt",
        pledge: "Free and compulsory primary and secondary education, and a review of student loans under NELFUND that considers debt forgiveness.",
        forYou: "For parents paying fees, and graduates carrying student loans.",
        commitments: [
          "Free and compulsory primary and secondary education",
          "Review the Nigerian Education Loan Fund (NELFUND)",
          "Consider debt forgiveness for loan beneficiaries",
          "Invest in school infrastructure and teacher welfare",
        ],
        source: src.acceptance,
        also: src.twelvePoints,
      },
      {
        slug: "ports",
        icon: "Ship",
        title: "Revive the Eastern ports",
        pledge: "Revive the ports at Port Harcourt, Calabar and Warri, and develop the Ibom Deep Sea Port.",
        forYou: "For importers paying to route goods through Lagos, and the communities around idle ports.",
        commitments: [
          "Revive Port Harcourt, Calabar and Warri",
          "Develop the deep sea port in Akwa Ibom",
        ],
        source: src.twelvePoints,
      },
    ],
  },
  {
    slug: "safety-and-care",
    title: "Safety and care",
    line: "Protect lives and property. Make basic healthcare affordable.",
    pillars: [
      {
        slug: "security",
        icon: "ShieldCheck",
        title: "Decisive action on insecurity",
        pledge: "Strengthen the armed forces, the police and other agencies with recruitment, equipment, training and welfare.",
        forYou: "For every community that has learned to plan its day around the road being unsafe.",
        commitments: [
          "Massive new recruitment into the security services",
          "Modern, adequate equipment and training",
          "Improved welfare for personnel",
          "Coordination, intelligence sharing and accountability across agencies",
        ],
        source: src.acceptance,
        also: src.twelvePoints,
      },
      {
        slug: "healthcare",
        icon: "HeartPulse",
        title: "Affordable basic healthcare",
        pledge: "Institutional reform and investment in primary healthcare, with an emphasis on prevention.",
        forYou: "For families who travel for hours, or pay out of pocket, for basic care.",
        commitments: [
          "Increase access to quality, affordable basic healthcare",
          "Massive investment in primary healthcare",
          "Properly equipped medical centres of excellence across the country",
        ],
        source: src.acceptance,
        also: src.twelvePoints,
      },
    ],
  },
  {
    slug: "government",
    title: "Government that works",
    line: "A leaner centre. More power, and more money, closer to you.",
    pillars: [
      {
        slug: "local-government",
        icon: "Landmark",
        title: "Real local government autonomy",
        pledge: "Implement the Supreme Court judgment on local government autonomy, with allocations paid directly to councils.",
        forYou: "For the ward whose council has never controlled its own budget.",
        commitments: [
          "Enforce the Supreme Court ruling on autonomy",
          "Direct transfer of allocations to local governments",
        ],
        source: src.twelvePoints,
      },
      {
        slug: "restructuring",
        icon: "Network",
        title: "Restructure the federation",
        pledge: "Devolve powers to states and local governments by restructuring the Exclusive and Concurrent Legislative Lists.",
        forYou: "For states that know their own problems and lack the authority to fix them.",
        commitments: [
          "Restructure the Exclusive and Concurrent Legislative Lists",
          "A leaner federal government",
          "Redirect government spending towards household costs and opportunity",
        ],
        source: src.twelvePoints,
      },
      {
        slug: "oronsaye",
        icon: "Scissors",
        title: "Cut waste: implement the Oronsaye Report",
        pledge: "Implement the Oronsaye Report to reduce government waste and eliminate duplication.",
        forYou: "For taxpayers funding agencies that do the same job twice.",
        commitments: ["Reduce government waste", "Eliminate duplication in the federal bureaucracy"],
        source: src.twelvePoints,
      },
    ],
  },
];

/** Flat, for anything that needs all twelve in one list. */
export const pillars = themes.flatMap((theme) =>
  theme.pillars.map((pillar) => ({ ...pillar, theme: theme.title }))
);

/** Every distinct source, oldest first, for the "read it yourself" list. */
export const sources = [
  src.acceptance,
  src.subsidyClarified,
  src.subsidyRestoring,
  src.twelvePoints,
  src.twelvePointsArbiterz,
];
