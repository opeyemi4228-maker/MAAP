/**
 * The ticket, as the site introduces it.
 *
 * `atiku.js` and `amaechi.js` hold each man's full record. This file holds only
 * the introduction: who each one is, what he stands for on the ticket, and the
 * page that answers the rest. The navigation dropdown and /leaders both read
 * from it, so the one-line summary in the masthead and the summary on the
 * page cannot drift apart. Every figure comes from the records themselves.
 *
 * Order matters and is not alphabetical: head of the ticket first.
 */

import { assets } from "@/assets/assets";
import * as atiku from "@/lib/atiku";
import * as amaechi from "@/lib/amaechi";

export const leaders = [
  {
    slug: "atiku",
    href: "/about/atiku",
    question: "Who is Atiku?",
    office: "For President",
    prefix: "H.E.",
    name: "Atiku Abubakar",
    honorific: "GCON · Waziri Adamawa",
    /* The two portraits are a matched pair: both from the studio sitting,
       both on a pale backdrop, both standing square to camera. */
    portrait: assets.atikuStudioSmile,
    summary:
      "Twenty years in Customs, to Deputy Director. Vice President from 1999 to 2007. Founder of the American University of Nigeria.",
    /* The dropdown has one line to spend. */
    line: "Vice President, 1999 to 2007",
    record: atiku.record,
    offices: atiku.offices,
  },
  {
    slug: "amaechi",
    href: "/about/amaechi",
    question: "Who is Amaechi?",
    office: "For Vice President",
    prefix: "Rt. Hon.",
    name: "Chibuike Rotimi Amaechi",
    honorific: "CON · KSJ",
    portrait: assets.Amaechi7,
    summary:
      "Speaker of the Rivers State House of Assembly. Governor for eight years. Minister of Transportation from 2015 to 2022, the office that delivered 1,763km of rail and 32 stations.",
    line: "Minister of Transportation, 2015 to 2022",
    record: amaechi.record,
    offices: amaechi.offices,
  },
];

/**
 * Both careers on one axis, oldest first.
 *
 * The two records overlap in a way neither profile page can show on its own:
 * the year Atiku took office as Vice President is the year Amaechi became
 * Speaker. Sorted on the first year in each period ("1999 to 2007" → 1999);
 * where two begin in the same year, the head of the ticket leads.
 */
export function sharedTimeline() {
  return leaders
    .flatMap((leader, rank) =>
      leader.offices.map((office) => ({
        ...office,
        key: `${leader.slug}-${office.id}`,
        start: Number.parseInt(office.period, 10),
        rank,
        leader,
      }))
    )
    .sort((a, b) => a.start - b.start || a.rank - b.rank);
}
