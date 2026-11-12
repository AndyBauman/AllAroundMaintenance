import fs from "node:fs";
import path from "node:path";

/**
 * Drop-in brand assets. Pages are statically generated, so this runs at build time:
 * add the file to /public, redeploy, and the site starts using it.
 *
 *   public/logo.svg    white logo for the dark header and footer (logo.png also works)
 *   public/hero.jpg    home page hero photo
 *   public/why-us.jpg  crew or job photo for the "Why us" section
 *   public/og.jpg      1200x630 social share image
 */
export function hasPublicFile(name: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", name));
  } catch {
    return false;
  }
}
