/**
 * The presidential aspirant's record.
 *
 * The companion to `amaechi.js`, and deliberately its twin: same shape, same
 * discipline. One place for the figures, so the hero, the profile and the
 * about page cannot drift apart.
 *
 * Everything here is public record — offices held, dates served, institutions
 * founded. Where a claim belongs to the campaign rather than to the record it
 * is set in `priorities` and worded as an intention, not as a fact already
 * achieved. Nothing in `record` is a projection.
 *
 * ── HOUSE STYLE: SHORT SENTENCES, SHORT BLOCKS ──────────────────────────────
 * This copy is read on a phone, often on a slow connection, by people deciding
 * in under a minute whether this movement is serious. It is not read by people
 * studying it.
 *
 * Two rules, and the second matters more than it looks.
 *
 * 1. One idea per sentence. No semicolons stitching three clauses into one. An
 *    early draft of the bio below averaged 32 words a sentence and scored
 *    grade 18 — postgraduate — which on a national campaign site is a way of
 *    excluding most of the country. Keep sentences under about 20 words.
 *
 * 2. Length is not weight. A paragraph does not become more true, more
 *    serious or more persuasive by getting longer; it just gets skipped. Say
 *    the thing and stop. Every paragraph here has been cut at least once
 *    after it was already correct, because "correct" was never the bar.
 *
 * If you are adding copy: write it, then delete a third of it. The facts
 * survive that. The padding does not.
 */

import { assets } from "@/assets/assets";

/** The three-paragraph answer to the page's own question. */
export const bio = [
  "Born in Jada, Adamawa State, in 1946. He studied law at Ahmadu Bello University, Zaria, then spent twenty years in the Nigeria Customs Service. He left in 1989 as Deputy Director, its second most senior post.",
  "He was Vice President from 1999 to 2007, chairing the National Economic Council and the National Council on Privatisation. Those reforms opened the economy to competition. Nigeria had a few hundred thousand phone lines in 2001. Ten years later, tens of millions.",
  "Outside government he built one of Nigeria's largest logistics companies, and in 2005 founded the American University of Nigeria at Yola. He now stands for President on the ADC platform, with Rotimi Amaechi as his running mate.",
];

/**
 * The four figures that carry the record. Nothing else belongs in this list.
 *
 * Each one is a count of something that happened, not an estimate and not a
 * promise. The AUN entry is rendered as "1st" rather than as a year, because a
 * counter that animates up to 2005 reads as a quantity and not as a date.
 */
export const record = [
  { value: 8, suffix: "", unit: "YRS", label: "Vice President of the Federal Republic" },
  { value: 20, suffix: "", unit: "YRS", label: "Nigeria Customs Service, to Deputy Director" },
  { value: 1, suffix: "st", unit: "", label: "American-style university in sub-Saharan Africa, founded at Yola" },
  { value: 35, suffix: "+", unit: "YRS", label: "In national public life" },
];

/** Offices and undertakings, oldest first. */
export const offices = [
  {
    id: 1,
    image: assets.atikuSuitPortrait,
    period: "1969 to 1989",
    title: "Nigeria Customs Service",
    location: "Federal Republic of Nigeria",
    description:
      "Twenty years in the federal civil service. He entered on a diploma in law and left as Deputy Director, the second most senior post in the service. He retired in 1989, aged forty-two.",
    achievements: [
      "Rose through every grade of the service on examination and promotion",
      "Headed the Murtala Muhammed Airport command, then the Customs Training School",
      "Left with a working knowledge of the federal revenue machinery few politicians bring to office",
    ],
  },
  {
    id: 2,
    image: assets.atikuSuitSeated,
    period: "1989 to 1999",
    title: "Business, and the return to civilian politics",
    location: "Nigeria",
    description:
      "He built a logistics and services group around the oil and gas ports. He entered party politics as military rule ended, first with the People's Front. In 1998 he helped found the Peoples Democratic Party.",
    achievements: [
      "Founded the port logistics business that grew into one of Nigeria's largest indigenous service groups",
      "Built interests in agriculture, beverages, printing and real estate, employing at scale outside government",
      "A founding member of the PDP at its formation in 1998",
    ],
  },
  {
    id: 3,
    image: assets.atikuAgbadaSeated,
    period: "1999",
    title: "Governor-elect, Adamawa State",
    location: "Adamawa State",
    description:
      "He won the 1999 governorship of his home state. He stood down before taking office, to run instead as Olusegun Obasanjo's deputy.",
    achievements: [
      "Elected Governor of Adamawa State at the return to civilian rule",
      "Gave up the office he had just won to take the national ticket",
    ],
  },
  {
    id: 4,
    image: assets.atikuSuitGesture,
    period: "1999 to 2007",
    title: "Vice President of the Federal Republic of Nigeria",
    location: "Federal Republic of Nigeria",
    description:
      "Two full terms, holding the economic brief. He chaired the National Economic Council, which sets policy with the thirty-six states, and the National Council on Privatisation, which reformed the public enterprises.",
    achievements: [
      "Chairman, National Council on Privatisation — the reform and divestment of federal public enterprises",
      "Chairman, National Economic Council — economic coordination between the Federation and the states",
      "Oversaw the telecommunications liberalisation of 2001, which ended the state monopoly on telephony",
      "Served on the economic team through the banking consolidation and the Paris Club debt settlement",
    ],
  },
  {
    id: 5,
    image: assets.atikuStudioGaze,
    period: "2005",
    title: "Founder, American University of Nigeria",
    location: "Yola, Adamawa State",
    description:
      "He founded and paid for the first American-style university in sub-Saharan Africa. He built it in Yola, not in a commercial capital. It stayed open right through the insurgency in the North East.",
    achievements: [
      "The first university in the region built on the American liberal-arts model",
      "Sited in the North East, the region with the fewest private universities",
      "Kept open, and turned to relief work, through the height of the insurgency",
    ],
  },
];

/**
 * What the ticket says it is for.
 *
 * These are positions, not achievements, and the page sets them under a
 * heading that says so. They are drawn from the aspirant's own long-stated
 * platform: a smaller federal centre, a private sector that does the hiring,
 * and an education system treated as infrastructure.
 */
export const priorities = [
  {
    title: "Restructuring and true federalism",
    body: "Move powers and money from the federal centre to the states. The level of government closest to a problem should be the one with the authority to fix it.",
  },
  {
    title: "A private sector that does the hiring",
    body: "Government's job is to set the rules, build the infrastructure and then get out of the way. Jobs at the scale Nigeria needs will be created by businesses, not by the federal payroll.",
  },
  {
    title: "Education as infrastructure",
    body: "Treat schools and technical training as investment, not running cost. The regions with the youngest populations have the most children out of school. That gap has to close.",
  },
  {
    title: "Security built on policing, not garrisons",
    body: "Make policing local, and accountable to the communities it serves. Give the armed forces back the job they were meant to do.",
  },
  {
    title: "One country, deliberately",
    body: "This ticket joins the North East and the South South. Unity is built by sharing power, not by talking about it.",
  },
];
