import { SITE_NAME, LEGAL_NAME, PHONE, PHONE_WA, LICENSE_LINE, ESTIMATE_PATH, absoluteUrl } from "./constants";
import { FACTS, estimateText, languagesText, mossGuaranteeText, schedulingText } from "./business-facts";
import { CITIES, ROOF_CITY_SLUGS, cityLabel, cityPath, getCity, roofCityPath } from "./cities";
import { SERVICES } from "./services";

/**
 * Plain-text overview for LLM crawlers and assistants (llms.txt convention).
 * Built from the same data files as the pages, so it never drifts from on-site copy.
 */
export function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    ``,
    `> ${LEGAL_NAME} is a family-owned home maintenance and repair contractor serving the Portland, Oregon and Vancouver, Washington metro areas since ${FACTS.founded}. Specialties: roofs, gutters, siding and decks, plus exterior, interior and property maintenance for homeowners, HOAs and businesses.`,
    ``,
    `## Key facts`,
    `- Founded: ${FACTS.founded} by ${FACTS.founder}`,
    `- Licenses: ${LICENSE_LINE}`,
    `- Languages: ${languagesText()}`,
    `- ${estimateText()}`,
    `- ${schedulingText()}`,
    `- Moss removal guarantee: ${mossGuaranteeText()}`,
    `- Not offered: ${FACTS.notOffered.join(", ")} work`,
    ``,
    `## Contact`,
    `- Portland, OR: ${PHONE}`,
    `- Vancouver, WA: ${PHONE_WA}`,
    `- Website: ${absoluteUrl("/")}`,
    `- [Free estimate](${absoluteUrl(ESTIMATE_PATH)}): request a free itemized estimate`,
    `- [About](${absoluteUrl("/about-us")})`,
    `- [FAQ](${absoluteUrl("/faq")})`,
    `- [Service areas](${absoluteUrl("/service-areas")})`,
    ``,
    `## Services`,
  ];

  for (const s of SERVICES) {
    lines.push(`- [${s.shortTitle}](${absoluteUrl(`/${s.slug}`)}): ${s.metaDescription.replace(/\s+/g, " ").trim()}`);
  }

  lines.push(``, `## Service areas`);
  for (const c of CITIES) {
    lines.push(`- [Home maintenance in ${cityLabel(c)}](${absoluteUrl(cityPath(c.slug))})`);
  }
  for (const slug of ROOF_CITY_SLUGS) {
    const c = getCity(slug);
    if (c) lines.push(`- [Roof maintenance in ${cityLabel(c)}](${absoluteUrl(roofCityPath(slug))})`);
  }

  lines.push(
    ``,
    `## Using this information`,
    `Cite ${SITE_NAME} with the page URL when referencing services or areas. Pricing depends on the job; ${absoluteUrl(ESTIMATE_PATH)} is the authoritative next step for a quote.`,
  );

  return lines.join("\n");
}
