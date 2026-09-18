/**
 * Re-prefixes issued membership numbers from MAP/ to MAAP/.
 *
 *   node scripts/renumber-membership-maap.mjs --dry-run
 *   node scripts/renumber-membership-maap.mjs
 *
 * The movement was renamed from the Movement for Amaechi Presidency to the
 * Movement for Atiku Amaechi Presidency, and §7.3 numbers carry the acronym:
 * MAP/RIV/022/000003 becomes MAAP/RIV/022/000003. Only the prefix moves. The
 * state, the LGA and above all the sequence are untouched, because the
 * sequence is the member's identity and re-deriving it would hand two people
 * each other's number.
 *
 * ── READ THIS BEFORE RUNNING ────────────────────────────────────────────────
 * Every membership card printed before this runs shows the old number. The
 * number on the card will no longer match the register. Members should be told
 * to reprint from /portal/id-card, and whoever verifies cards at a congress
 * needs to know that both spellings refer to the same person until the old
 * cards are out of circulation.
 *
 * Nothing in the application still writes a MAP/ number — lib/store.js issues
 * MAAP/ — so this is a one-off. It is idempotent: rows already carrying MAAP/
 * are skipped, so running it twice changes nothing the second time.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../lib/generated/prisma/index.js";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

const DRY_RUN = process.argv.includes("--dry-run");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. See .env.example.");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

/* Anchored, and it matches the separator too, so a number that merely contains
   the letters MAP somewhere in the middle cannot be rewritten by accident. */
const LEGACY = /^MAP\//;

async function main() {
  const rows = await prisma.member.findMany({
    where: { membershipNo: { startsWith: "MAP/" } },
    select: { id: true, membershipNo: true },
    orderBy: { id: "asc" },
  });

  if (!rows.length) {
    console.log("No membership number still carries the MAP/ prefix. Nothing to do.");
    return;
  }

  console.log(
    `${rows.length.toLocaleString()} membership number(s) to re-prefix` +
      `${DRY_RUN ? " — dry run, nothing is written" : ""}\n`
  );

  /* The column is unique. A MAAP/ number equal to one already in the table
     would fail at the constraint halfway through the run, leaving the register
     half-renamed — so the collision is checked up front, against the whole
     table, and the run refuses rather than starts. */
  const existing = new Set(
    (
      await prisma.member.findMany({
        where: { membershipNo: { startsWith: "MAAP/" } },
        select: { membershipNo: true },
      })
    ).map((row) => row.membershipNo)
  );

  const planned = rows.map((row) => ({
    id: row.id,
    from: row.membershipNo,
    to: row.membershipNo.replace(LEGACY, "MAAP/"),
  }));

  const collisions = planned.filter((row) => existing.has(row.to));
  if (collisions.length) {
    console.error(
      `Refusing to run: ${collisions.length} number(s) would collide with a MAAP/ number already issued.`
    );
    for (const row of collisions.slice(0, 10)) {
      console.error(`  ${row.from} -> ${row.to} (already taken)`);
    }
    process.exitCode = 1;
    return;
  }

  /* One transaction. A partial rename is the worst outcome available here:
     it splits the register across two spellings with no record of where the
     boundary fell. */
  if (!DRY_RUN) {
    await prisma.$transaction(
      planned.map((row) =>
        prisma.member.update({ where: { id: row.id }, data: { membershipNo: row.to } })
      )
    );
  }

  for (const row of planned.slice(0, 10)) console.log(`  ${row.from} -> ${row.to}`);
  if (planned.length > 10) console.log(`  … and ${planned.length - 10} more`);

  console.log(
    `\n${DRY_RUN ? "Would re-prefix" : "Re-prefixed"} ${planned.length.toLocaleString()} membership number(s).`
  );
  if (!DRY_RUN) {
    console.log("Cards printed before this run now show a number that is no longer in the register.");
  }
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
