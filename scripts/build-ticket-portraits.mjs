/**
 * Prepares the two men on the ticket for the hero.
 *
 * The hero sets Atiku and Amaechi overlapping on a green stage, the way the
 * campaign's own poster artwork does, and that composition needs the figures
 * with their backgrounds gone.
 *
 * ── TWO KINDS OF SOURCE ────────────────────────────────────────────────────
 * What the campaign supplies arrives in one of two states, so each entry in
 * PORTRAITS declares which it is:
 *
 *   `precut: true`   The background has already been removed and the file
 *                    carries an alpha channel. Both current portraits are
 *                    these. Nothing is cut; the figure is trimmed to its own
 *                    edges, scaled and encoded.
 *
 *   `precut: false`  A studio JPEG with the subject floating on a smooth
 *                    sweep. These go through the six-pass cut below, which is
 *                    kept because it is how the previous pair were made and
 *                    the next flat JPEG will need it again.
 *
 * Run it with `npm run portraits:build`. Idempotent, and the outputs are
 * committed, so a normal build never runs it — it exists so the figures are a
 * recorded derivation rather than an afternoon somebody spent in Photoshop.
 *
 * ── WHY EVERYTHING IS TRIMMED ──────────────────────────────────────────────
 * The hero positions the two figures against each other in fractions of one
 * shared unit, and that arithmetic only holds if each file's edges are the
 * man's edges. A supplied cut-out is usually padded with transparent margin —
 * the Atiku master carries roughly a fifth of its width in empty space — and
 * shipped untrimmed it would silently shift him out of the composition.
 *
 * ── HOW THE CUT WORKS, FOR A FLAT JPEG ─────────────────────────────────────
 * Six passes, because no one of them is enough on its own:
 *
 *   1. Flood fill inward from the frame edge. Each step compares a pixel to the
 *      neighbour that reached it rather than to a fixed colour, so the fill
 *      follows the backdrop's gradient instead of stopping partway down it.
 *      Two guards stop the fill escaping into the subject: a luminance ceiling
 *      (white cloth is brighter than any backdrop pixel) and a blue-bias floor
 *      (skin is warm — red exceeds blue — and the backdrops never are).
 *
 *   2. Per-row span fill. The guards are thresholds, so light fabric that sits
 *      inside the window gets eaten. Every such bite is enclosed horizontally
 *      by the subject, so filling each row between its first and last opaque
 *      pixel repairs them.
 *
 *   3. Morphological closing, unioned with the original so it can only add.
 *
 *   4. Island filter: anything under a fiftieth of the figure goes.
 *
 *   5. Top smoothing, for a cap whose crown is backdrop-toned.
 *
 *   6. Erosion, to pull in the pale fringe the backdrop leaves on the edge.
 *
 * The alpha is blurred by about a pixel before encoding. Without that, every
 * edge is a hard staircase against the flat green.
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const asset = (file) => path.join(root, "assets", file);

/* ── The current pair ──────────────────────────────────────────────────────
   Both arrive already cut out, so neither carries cut thresholds. `width` is
   the longest edge the hero will ever draw them at, doubled for high-density
   screens; past that the file is only bytes on a phone's data plan.

   Order is the order of the ticket. */
const PORTRAITS = [
  {
    name: "Atiku Abubakar",
    source: "source/atiku-cutout.png",
    out: "ticket-atiku.webp",
    precut: true,
    /* 1600x2400 master, and a much tighter frame than the running mate's:
       cap to mid-chest, where Amaechi is head to below the waist. The hero
       resolves that by standing Atiku in front, where a larger head reads as
       being nearer the camera rather than as a mistake in scale.
       Wider than Amaechi because the hero draws him larger. */
    width: 1000,
  },
  {
    name: "Chibuike Rotimi Amaechi",
    source: "source/amaechi-cutout.png",
    out: "ticket-amaechi.webp",
    precut: true,
    /* 720x1080 master, arms folded, shot square to camera. He stands in front
       and slightly smaller, so he needs less width than Atiku. */
    width: 720,
  },
];

/* ── Thresholds, for a flat JPEG ───────────────────────────────────────────
   Kept for the next portrait that arrives on a studio sweep. Neither set is
   safe on the other's file: Atiku's old backdrop was both brighter and bluer
   than Amaechi's, so a ceiling that cleared his field would have swallowed
   Amaechi's robe whole. Each was tuned against its own file.

   Example, the previous Atiku source:
     { source: "Atiku.jpg", precut: false, crop: null, maxLuma: 232,
       minBlueBias: 28, tolerance: 14, close: 10, erode: 1.3, smoothTop: 0.24,
       sharpen: { sigma: 0.7, m1: 0.5, m2: 0.6 } }
   And Amaechi:
     { source: "Amaechi13.jpeg", precut: false,
       crop: { left: 40, top: 30, width: 640, height: 950 }, maxLuma: 200,
       minBlueBias: 8, tolerance: 18, close: 24, erode: 1.6, smoothTop: 0 } */

const luma = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

/** Sharp promotes a one-channel raw buffer to three unless told otherwise. */
const grey = (buffer, width, height) =>
  sharp(buffer, { raw: { width, height, channels: 1 } }).toColourspace("b-w");

const binarise = (buffer, cutoff) => {
  const out = Buffer.alloc(buffer.length);
  for (let i = 0; i < buffer.length; i++) out[i] = buffer[i] > cutoff ? 255 : 0;
  return out;
};

/** Pass 1 — gradient-following flood fill inward from every frame edge. */
function floodBackground({ data, width, height, channels }, { tolerance, maxLuma, minBlueBias }) {
  const background = new Uint8Array(width * height);
  const queue = [];
  const colourAt = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };

  const seed = (x, y) => {
    const k = y * width + x;
    if (background[k]) return;
    background[k] = 1;
    queue.push(x, y, ...colourAt(x, y));
  };

  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }

  const limit = tolerance * tolerance;
  while (queue.length) {
    const fromB = queue.pop();
    const fromG = queue.pop();
    const fromR = queue.pop();
    const y = queue.pop();
    const x = queue.pop();

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const k = ny * width + nx;
      if (background[k]) continue;

      const [r, g, b] = colourAt(nx, ny);
      if (luma(r, g, b) > maxLuma) continue; // white cloth
      if (b - r < minBlueBias) continue; // skin, and anything else warm

      const dr = r - fromR;
      const dg = g - fromG;
      const db = b - fromB;
      if (dr * dr + dg * dg + db * db > limit) continue;

      background[k] = 1;
      queue.push(nx, ny, r, g, b);
    }
  }

  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < alpha.length; i++) alpha[i] = background[i] ? 0 : 255;
  return alpha;
}

/**
 * Pass 2 — anything a row encloses between subject and subject is subject.
 *
 * The row's bounds come from runs of at least MIN_RUN opaque pixels, not from
 * the first opaque pixel it finds. JPEG noise leaves the odd stray pixel out in
 * the backdrop, and taking those as the bound painted a one-pixel bar clean
 * across the frame on a handful of Amaechi's rows.
 */
const MIN_RUN = 4;

function fillRows(alpha, width, height) {
  const out = Buffer.from(alpha);
  for (let y = 0; y < height; y++) {
    let first = -1;
    let last = -1;
    let run = 0;
    for (let x = 0; x <= width; x++) {
      const opaque = x < width && alpha[y * width + x] > 140;
      if (opaque) {
        run++;
        continue;
      }
      if (run >= MIN_RUN) {
        if (first < 0) first = x - run;
        last = x - 1;
      }
      run = 0;
    }
    if (first < 0) continue;
    for (let x = first; x <= last; x++) out[y * width + x] = 255;
  }
  return out;
}

/**
 * Pass 4 — drop everything that is not the man.
 *
 * The three passes above leave a scatter of specks: a highlight on the crown
 * of Atiku's cap that neither guard caught, and the odd clump of backdrop the
 * row fill sealed in along a sleeve. Each is its own island, none is anywhere
 * near the size of a person, and against flat green every one of them reads as
 * dirt on the lens. Anything under a fiftieth of the largest island goes.
 */
function keepMainIsland(alpha, width, height) {
  const label = new Int32Array(width * height).fill(-1);
  const sizes = [];
  const queue = new Int32Array(width * height);

  for (let start = 0; start < width * height; start++) {
    if (alpha[start] < 128 || label[start] >= 0) continue;
    const id = sizes.length;
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    label[start] = id;
    let size = 0;
    while (head < tail) {
      const p = queue[head++];
      size++;
      const x = p % width;
      const y = (p - x) / width;
      if (x > 0) {
        const n = p - 1;
        if (alpha[n] >= 128 && label[n] < 0) { label[n] = id; queue[tail++] = n; }
      }
      if (x < width - 1) {
        const n = p + 1;
        if (alpha[n] >= 128 && label[n] < 0) { label[n] = id; queue[tail++] = n; }
      }
      if (y > 0) {
        const n = p - width;
        if (alpha[n] >= 128 && label[n] < 0) { label[n] = id; queue[tail++] = n; }
      }
      if (y < height - 1) {
        const n = p + width;
        if (alpha[n] >= 128 && label[n] < 0) { label[n] = id; queue[tail++] = n; }
      }
    }
    sizes.push(size);
  }

  const floor = Math.max(...sizes) / 50;
  const out = Buffer.from(alpha);
  for (let i = 0; i < out.length; i++) {
    if (label[i] >= 0 && sizes[label[i]] < floor) out[i] = 0;
  }
  return out;
}

/**
 * Pass 5 — redraw a ragged top outline as a smooth one.
 *
 * Only ever applied above `limit` rows, which for Atiku is the crown of his
 * cap. Each column's top edge is median-filtered (which throws out the spikes
 * without rounding real corners much) and then lightly averaged, and the
 * column is rebuilt from that line down.
 */
function smoothTopEdge(alpha, width, height, fraction) {
  if (!fraction) return alpha;
  const limit = Math.round(height * fraction);
  const top = new Array(width).fill(limit);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < limit; y++) {
      if (alpha[y * width + x] >= 128) {
        top[x] = y;
        break;
      }
    }
  }

  const window = (values, radius, reduce) =>
    values.map((_, x) => reduce(values.slice(Math.max(0, x - radius), x + radius + 1)));
  const median = (list) => [...list].sort((a, b) => a - b)[list.length >> 1];
  const mean = (list) => list.reduce((a, b) => a + b, 0) / list.length;
  const smooth = window(window(top, 10, median), 4, mean);

  const out = Buffer.from(alpha);
  for (let x = 0; x < width; x++) {
    const edge = top[x] >= limit ? limit : Math.round(smooth[x]);
    for (let y = 0; y < limit; y++) out[y * width + x] = y >= edge ? 255 : 0;
  }
  return out;
}

/** Pass 6 — pull the whole edge in, taking the backdrop fringe with it. */
async function erodeMask(alpha, width, height, radius) {
  if (!radius) return alpha;
  return binarise(await grey(alpha, width, height).blur(radius).raw().toBuffer(), 200);
}

/**
 * The tight box around what is left.
 *
 * The hero positions the two figures against each other in fractions of one
 * shared unit, and that arithmetic only holds if each file's edges are the
 * man's edges. Amaechi's crop carries 67px of empty backdrop down its left
 * side; shipped untrimmed it would silently shift him out of the composition.
 */
function contentBox(alpha, width, height) {
  let minX = width;
  let maxX = -1;
  let minY = height;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] < 128) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/** Pass 3 — dilate then erode, unioned back so it can only add. */
async function closeMask(alpha, width, height, radius) {
  if (!radius) return alpha;
  const dilated = binarise(await grey(alpha, width, height).blur(radius).raw().toBuffer(), 40);
  const eroded = binarise(await grey(dilated, width, height).blur(radius).raw().toBuffer(), 215);
  const out = Buffer.alloc(alpha.length);
  for (let i = 0; i < alpha.length; i++) out[i] = Math.max(eroded[i], alpha[i]);
  return out;
}

/** A pre-cut source: trim the transparent margin, scale, encode. */
async function buildPrecut(portrait) {
  const image = sharp(asset(portrait.source));
  const { width, height } = await image.metadata();
  const { data } = await image.clone().ensureAlpha().extractChannel(3).raw().toBuffer({
    resolveWithObject: true,
  });

  const box = contentBox(data, width, height);
  if (box.width < width / 4 || box.height < height / 4) {
    throw new Error(
      `${portrait.source}: only ${box.width}x${box.height} of ${width}x${height} is opaque, which is not a portrait.`
    );
  }

  return image
    .extract(box)
    .resize({ width: portrait.width, withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer();
}

/** A flat studio JPEG: cut the background out first. */
async function buildCut(portrait) {
  const source = sharp(asset(portrait.source)).removeAlpha();
  const cropped = portrait.crop ? source.extract(portrait.crop) : source;
  const { data, info } = await cropped.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let alpha = floodBackground({ data, width, height, channels }, portrait);
  alpha = fillRows(alpha, width, height);
  alpha = await closeMask(alpha, width, height, portrait.close);
  alpha = keepMainIsland(alpha, width, height);
  alpha = smoothTopEdge(alpha, width, height, portrait.smoothTop);
  alpha = await erodeMask(alpha, width, height, portrait.erode);
  const feathered = await grey(alpha, width, height).blur(0.8).raw().toBuffer();

  const cut = feathered.reduce((n, v) => n + (v < 128 ? 1 : 0), 0);
  const share = (100 * cut) / (width * height);

  /* A cut that removed almost nothing means a guard shut the fill out at the
     first pixel; one that removed almost everything means it escaped into the
     subject. Either way the output is unusable and silently committing it is
     worse than stopping. */
  if (share < 25 || share > 75) {
    throw new Error(
      `${portrait.source}: background came out at ${share.toFixed(1)}% of the frame, which is not a portrait. Re-tune the thresholds.`
    );
  }

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = data[i * channels];
    rgba[i * 4 + 1] = data[i * channels + 1];
    rgba[i * 4 + 2] = data[i * channels + 2];
    rgba[i * 4 + 3] = feathered[i];
  }

  let pipeline = sharp(rgba, { raw: { width, height, channels: 4 } }).extract(
    contentBox(feathered, width, height)
  );
  if (portrait.sharpen) pipeline = pipeline.sharpen(portrait.sharpen);
  if (portrait.width) pipeline = pipeline.resize({ width: portrait.width, withoutEnlargement: true });
  return pipeline.webp({ quality: 92, alphaQuality: 100, effort: 6 }).toBuffer();
}

async function build(portrait) {
  /* WebP with alpha: a fifth of the PNG's weight at no visible cost, and both
     images sit above the fold. */
  const out = portrait.precut ? await buildPrecut(portrait) : await buildCut(portrait);
  await writeFile(asset(portrait.out), out);
  const meta = await sharp(out).metadata();
  console.log(
    `  assets/${portrait.out}  ${meta.width}x${meta.height}  ${(out.length / 1024).toFixed(1)}kB`
  );
}

console.log("Ticket portraits");
for (const portrait of PORTRAITS) await build(portrait);
console.log("Done.");
