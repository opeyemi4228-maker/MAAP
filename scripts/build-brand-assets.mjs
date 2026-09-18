/**
 * Derives the web-ready brand assets from the supplied master artwork.
 *
 * The masters are what the design team handed over, and neither is usable as
 * shipped:
 *
 *   MAAP  arrives as a 1600x1600 JPEG with the artwork floating in the middle
 *         third of a white field. Dropped into a box unchanged it renders at
 *         roughly a third of that box, and the white field paints a card behind
 *         the mark everywhere the surface is not white — most visibly the
 *         ink-950 footer.
 *
 *   ADC   arrives as a 330x302 PNG with a thin white margin. The green field is
 *         part of the mark and is kept; only the margin goes.
 *
 * So this script does three things: find the real content, cut it out, and turn
 * the white field into alpha.
 *
 * Run it with `npm run brand:build`. It is idempotent, and the outputs are
 * committed, so a normal build never needs it — it exists so the crop is a
 * recorded derivation rather than a thing somebody once did in Preview.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* Where the masters live. Kept in assets/ alongside the outputs so the
   derivation can be re-run from a clean checkout. */
const MAAP_MASTER = path.join(root, "assets", "maap-master.jpeg");
const ADC_MASTER = path.join(root, "assets", "adc-master.png");

/* A pixel counts as background if none of its channels is meaningfully darker
   than white. 225 sits below the JPEG ringing around the artwork (which lands
   in the 230s) and well above any ink in either master. */
const INK_THRESHOLD = 225;

/* The alpha ramp. Above SOLID_WHITE a pixel is pure background; below
   FULLY_OPAQUE it is pure artwork; between the two it is an antialiased edge
   and gets proportional alpha. Without the ramp every curve in the mark gets a
   hard, jagged edge at masthead size. */
const SOLID_WHITE = 248;
const FULLY_OPAQUE = 228;

async function readRaw(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

const isInk = ({ data, channels }, x, y, width) => {
  const i = (y * width + x) * channels;
  if (data[i + 3] < 24) return false;
  return Math.min(data[i], data[i + 1], data[i + 2]) < INK_THRESHOLD;
};

/** Tight bounding box of the artwork inside `rows`, or null if there is none. */
function contentBox(raw, y0, y1) {
  const { width } = raw;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let y = y0; y <= y1; y++) {
    for (let x = 0; x < width; x++) {
      if (!isInk(raw, x, y, width)) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return maxX < 0 ? null : { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/**
 * Rows of artwork separated by at least `minGap` blank rows.
 *
 * The MAAP master is three of these: the symbol, then "MOVEMENT FOR ATIKU",
 * then "AMAECHI PRESIDENCY". Finding them by measurement rather than by
 * hard-coded pixel numbers means a re-supplied master with the lockup nudged
 * half a centimetre still cuts correctly.
 */
function horizontalBands(raw, minGap = 8) {
  const { width, height } = raw;
  const bands = [];
  let start = null;
  let gap = 0;

  for (let y = 0; y < height; y++) {
    let inked = false;
    for (let x = 0; x < width; x++) {
      if (isInk(raw, x, y, width)) {
        inked = true;
        break;
      }
    }

    if (inked) {
      if (start === null) start = y;
      gap = 0;
    } else if (start !== null) {
      gap++;
      if (gap >= minGap) {
        bands.push([start, y - gap]);
        start = null;
        gap = 0;
      }
    }
  }
  if (start !== null) bands.push([start, height - 1]);
  return bands;
}

/**
 * Replaces the white field with alpha.
 *
 * Edge pixels are un-premultiplied against white as well as made translucent:
 * a 50%-alpha pixel that was blended against white is half artwork and half
 * paper, so leaving its colour alone would keep the paper in it and fringe
 * every edge of the mark with white — which is exactly what it must not do on
 * the dark footer.
 */
function whiteToAlpha(raw) {
  const { data, width, height, channels } = raw;
  const out = Buffer.alloc(width * height * 4);

  for (let p = 0; p < width * height; p++) {
    const i = p * channels;
    const o = p * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const srcAlpha = data[i + 3];
    const level = Math.min(r, g, b);

    let alpha;
    if (level >= SOLID_WHITE) alpha = 0;
    else if (level <= FULLY_OPAQUE) alpha = 255;
    else alpha = Math.round((255 * (SOLID_WHITE - level)) / (SOLID_WHITE - FULLY_OPAQUE));

    alpha = Math.min(alpha, srcAlpha);

    if (alpha === 0) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
      continue;
    }

    const a = alpha / 255;
    const unmix = (c) => Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a)));
    out[o] = unmix(r);
    out[o + 1] = unmix(g);
    out[o + 2] = unmix(b);
    out[o + 3] = alpha;
  }

  return sharp(out, { raw: { width, height, channels: 4 } });
}

/** Crop, de-white and write, padding so the artwork never touches the edge. */
async function emit(raw, box, targetWidth, destinations, { pad = 0 } = {}) {
  const { width, height } = raw;
  const left = Math.max(0, box.left - pad);
  const top = Math.max(0, box.top - pad);
  const region = {
    left,
    top,
    width: Math.min(width - left, box.width + pad * 2),
    height: Math.min(height - top, box.height + pad * 2),
  };

  const png = await whiteToAlpha(raw)
    .extract(region)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  for (const dest of destinations) {
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, png);
  }

  const meta = await sharp(png).metadata();
  console.log(
    `  ${path.relative(root, destinations[0])}  ${meta.width}x${meta.height}  ${(png.length / 1024).toFixed(1)}kB` +
      (destinations[1] ? `  (+${destinations.length - 1} copy)` : "")
  );
}

async function buildMaap() {
  console.log("MAAP master");
  const raw = await readRaw(MAAP_MASTER);
  const bands = horizontalBands(raw);

  if (bands.length < 2) {
    throw new Error(
      `Expected the MAAP master to hold a symbol above at least one line of type, found ${bands.length} band(s).`
    );
  }

  /* Band 0 is the symbol. Everything after it is the descender type, which is
     set in black and so is unusable on a dark surface — the masthead and footer
     take the symbol alone and set the movement's name in live type beside it. */
  const [symbolStart, symbolEnd] = bands[0];
  const symbol = contentBox(raw, symbolStart, symbolEnd);
  const full = contentBox(raw, bands[0][0], bands.at(-1)[1]);

  await emit(raw, symbol, 1200, [
    path.join(root, "assets", "maap-mark.png"),
    path.join(root, "public", "maap-mark.png"),
  ]);

  await emit(raw, full, 1400, [path.join(root, "assets", "maap-logo.png")], { pad: 8 });
}

async function buildAdc() {
  console.log("ADC master");
  const raw = await readRaw(ADC_MASTER);
  const box = contentBox(raw, 0, raw.height - 1);

  /* No de-whiting pass worth the name here: the ADC mark is a solid green
     field, so contentBox already lands on the edge of the artwork and the only
     white inside it ("ADC", the cuff checks) is part of the mark. */
  const png = await sharp(await sharp(raw.data, {
    raw: { width: raw.width, height: raw.height, channels: raw.channels },
  })
    .png()
    .toBuffer())
    .extract({ left: box.left, top: box.top, width: box.width, height: box.height })
    .resize({ width: 512, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();

  for (const dest of [
    path.join(root, "assets", "adc-logo.png"),
    path.join(root, "public", "adc-logo.png"),
  ]) {
    await writeFile(dest, png);
  }

  const meta = await sharp(png).metadata();
  console.log(`  assets/adc-logo.png  ${meta.width}x${meta.height}  ${(png.length / 1024).toFixed(1)}kB  (+1 copy)`);
}

await buildMaap();
await buildAdc();
console.log("Done.");
