/**
 * Canonical section identity + routing. Single source of truth for the section
 * ids the app navigates between (mirrors the old React `activeSection` strings)
 * and the route path each maps to. Consumed by the router, navigation, and the
 * SECTION_COLORS token map — never hardcode these strings at a callsite.
 */
export enum SectionId {
  About = 'description',
  Experiences = 'experiences',
  Projects = 'projects',
  Skills = 'skills',
  Certifications = 'certifications',
  Awards = 'awards',
  Images = 'images',
}

/** Route path for each section (URL segment). */
export const SECTION_ROUTE: Readonly<Record<SectionId, string>> = {
  [SectionId.About]: 'about',
  [SectionId.Experiences]: 'experiences',
  [SectionId.Projects]: 'projects',
  [SectionId.Skills]: 'skills',
  [SectionId.Certifications]: 'certifications',
  [SectionId.Awards]: 'awards',
  [SectionId.Images]: 'gallery',
} as const;

/** Landing route shown before the main app, and the default in-app section. */
export const DEFAULT_SECTION = SectionId.About;
