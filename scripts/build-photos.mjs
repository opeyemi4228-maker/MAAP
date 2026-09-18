/**
 * Derives the web-ready photographs of the ticket from the campaign's shoot.
 *
 * What the campaign supplied is the folder "AA & Amaechi Pictures": thirteen
 * 4000x6000 studio frames of Atiku (24MB between them, and near-identical —
 * one sitting, one outfit) plus WhatsApp-sized exports of everything else.
 * The originals are far too heavy to commit and far larger than any slot on the
 * site, so they stay where they were delivered and this script writes the
 * derivatives into assets/photos/.
 *
 * Run it with `npm run photos:build -- "<path to the supplied folder>"`. It is
 * idempotent, and the outputs are committed, so a normal build never needs it —
 * it exists so the selection and the sizing are a recorded derivation.
 *
 * ── WHAT IS NOT HERE, AND WHY ──────────────────────────────────────────────
 *   · Eleven of the thirteen studio frames. They are the same pose a second
 *     apart; two are kept, the one looking up and the one smiling at camera.
 *   · Four of the Amaechi exports (WA0110, WA0111, WA0115, WA0116). They are
 *     byte-identical to Amaechi7, Amaechi11, Amaechi10 and Amaechi6, which are
 *     already in assets/. Copying them again would ship each face twice.
 * ───────────────────────────────────────────────────────────────────────────
 */

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "assets", "photos");

/* The largest any slot renders is a full-bleed page header on a 2x screen,
   and that sits under a 75% scrim. 2000px on the long edge is honest there. */
const LONG_EDGE = 2000;

const PHOTOS = [
  // Atiku, studio
  ["BMT07787 copy.jpg", "atiku-studio-gaze.webp"],
  ["BMT07818 copy.jpg", "atiku-studio-smile.webp"],
  ["IMG-20260829-WA0151.jpg", "atiku-agbada-seated.webp"],
  ["IMG-20260829-WA0154.jpg", "atiku-robe-chair.webp"],
  ["IMG-20260829-WA0156.jpg", "atiku-waving.webp"],
  ["IMG-20260829-WA0155.jpg", "atiku-casual.webp"],
  ["IMG-20260829-WA0150.jpg", "atiku-suit-gesture.webp"],
  ["IMG-20260829-WA0157.jpg", "atiku-suit-seated.webp"],
  ["IMG-20260829-WA0172.jpg", "atiku-suit-portrait.webp"],
  ["IMG-20260829-WA0153.jpg", "atiku-suit-mono.webp"],
  // Atiku, off the backdrop
  ["IMG-20260829-WA0137.jpg", "atiku-speaking-wide.webp"],
  ["IMG-20260829-WA0141.jpg", "atiku-speaking.webp"],
  ["IMG-20260829-WA0146.jpg", "atiku-speaking-blue.webp"],
  ["IMG-20260829-WA0144.jpg", "atiku-laughing.webp"],
  ["IMG-20260829-WA0145.jpg", "atiku-seated.webp"],
  // Amaechi, the two not already in assets/
  ["IMG-20260829-WA0112.jpg", "amaechi-green.webp"],
  ["IMG-20260829-WA0114.jpg", "amaechi-suit.webp"],
];

const source = process.argv[2];
if (!source) {
  console.error('Usage: npm run photos:build -- "<path to AA & Amaechi Pictures>"');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

console.log("Ticket photographs");
for (const [file, out] of PHOTOS) {
  const target = path.join(outDir, out);
  const info = await sharp(path.join(source, file))
    .rotate()
    .resize(LONG_EDGE, LONG_EDGE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(target);
  const { size } = await stat(target);
  console.log(`  assets/photos/${out}  ${info.width}x${info.height}  ${(size / 1024).toFixed(0)}kB`);
}
console.log("Done.");
