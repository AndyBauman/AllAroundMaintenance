/**
 * Project pages are generated only from completed intake rows (reviewed: true).
 * Until the office fills docs/project-intake.csv and we add matching JSON under
 * src/content/projects/, this list stays empty and UI sections hide.
 */
export type ProjectPhoto = {
  src: string;
  alt: string;
  stage: "before" | "during" | "after";
};

export type Project = {
  slug: string;
  title: string;
  service: string;
  city: string;
  state: "OR" | "WA";
  date: string;
  problem: string;
  work: string;
  materials?: string;
  timeOnSite?: string;
  photos: ProjectPhoto[];
  video?: string;
  /** Only true after intake is complete and content is approved. */
  reviewed: boolean;
};

/** Populated as completed project JSON files are added. */
export const PROJECTS: Project[] = [];

export function publishedProjects(): Project[] {
  return PROJECTS.filter((p) => p.reviewed);
}

export function projectsForService(serviceSlug: string): Project[] {
  return publishedProjects().filter((p) => p.service === serviceSlug);
}

export function projectsForCity(cityName: string): Project[] {
  return publishedProjects().filter((p) => p.city.toLowerCase() === cityName.toLowerCase());
}

export function getProject(slug: string): Project | undefined {
  return publishedProjects().find((p) => p.slug === slug);
}
