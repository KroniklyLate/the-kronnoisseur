import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandRoot = join(__dirname, "..", "public", "brand");

const masterFull = join(brandRoot, "logo-master.jpg");
const fullTransparentSrc = join(brandRoot, "transparent", "logo-full-transparent.png");

async function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

async function resizeTo(src, out, size, options = {}) {
  const outPath = join(brandRoot, out);
  await ensureDir(dirname(outPath));
  await sharp(src)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 }, ...options })
    .png()
    .toFile(outPath);
  console.log(`Generated ${out}`);
}

async function main() {
  console.log("Regenerating brand assets for the new logo...");

  // Full logo web sizes
  const webSizes = [128, 256, 512, 1024];
  for (const s of webSizes) {
    await resizeTo(masterFull, `web/logo-full-${s}.png`, s);
  }

  // Transparent full logo sizes (for hero, overlays, product cards)
  await resizeTo(fullTransparentSrc, "transparent/logo-full-512.png", 512);
  await resizeTo(fullTransparentSrc, "transparent/logo-full-256.png", 256);

  // Use full transparent as "mark" for small icons and apparel (since new logo is emblem-focused)
  const markSizes = [128, 256, 512, 800, 1200];
  for (const s of markSizes) {
    await resizeTo(fullTransparentSrc, `transparent/mark-${s}.png`, s);
    await resizeTo(fullTransparentSrc, `apparel/mark-transparent-${s}.png`, s);
  }

  // Favicons and touch icons
  await resizeTo(masterFull, "web/favicon-32.png", 32);
  await resizeTo(masterFull, "web/favicon-16.png", 16);
  await resizeTo(masterFull, "web/apple-touch-icon.png", 180);
  await resizeTo(fullTransparentSrc, "web/mark-transparent-512.png", 512);
  await resizeTo(fullTransparentSrc, "web/mark-transparent-256.png", 256);

  // Apparel back print (full logo large)
  await resizeTo(fullTransparentSrc, "apparel/back-logo.png", 1200);

  // Simple SVG for the mark
  const svgMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="The Kronnoisseur mark">
    <image href="../transparent/mark-512.png" width="400" height="400" />
  </svg>`;
  const svgPath = join(brandRoot, "svg", "mark.svg");
  await ensureDir(dirname(svgPath));
  const { writeFileSync } = await import("fs");
  writeFileSync(svgPath, svgMark);
  console.log("Generated svg/mark.svg");

  // Basic favicon.svg
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <image href="../web/mark-transparent-512.png" width="32" height="32" />
  </svg>`;
  writeFileSync(join(brandRoot, "web", "favicon.svg"), svgFavicon);
  console.log("Generated web/favicon.svg");

  console.log("\n✅ Brand assets regenerated successfully from the new logo.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
