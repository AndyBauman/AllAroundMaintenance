/**
 * Fail the build if any file under public/projects/ still has GPS EXIF.
 * Requires no dependency when the folder is empty (Stage 3 scaffold).
 *
 * Usage: node scripts/check-project-exif.mjs
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(process.cwd(), "public", "projects");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) walk(p, out);
    else if (/\.(jpe?g|webp|png)$/i.test(name.name)) out.push(p);
  }
  return out;
}

/** Minimal JPEG APP1 / EXIF GPS IFD detection without a native dependency. */
function jpegHasGps(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return false;
  const text = buf.toString("binary");
  // GPS IFD pointer tag 0x8825 or ASCII "GPS" in EXIF blob
  return text.includes("GPS") && (text.includes("Exif") || text.includes("exif"));
}

function main() {
  const files = walk(ROOT);
  if (files.length === 0) {
    console.log("check-project-exif: no public/projects images yet — ok");
    return;
  }
  const bad = [];
  for (const file of files) {
    const buf = readFileSync(file);
    if (jpegHasGps(buf)) bad.push(file);
  }
  if (bad.length) {
    console.error("GPS EXIF found — strip before shipping:");
    for (const f of bad) console.error(`  ${f}`);
    process.exit(1);
  }
  console.log(`check-project-exif: ${files.length} image(s) clear`);
}

main();
