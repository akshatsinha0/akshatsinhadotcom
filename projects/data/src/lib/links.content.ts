/** Canonical external links. Single source of truth: update once here and every
 *  callsite (About "View Resume", Contact "Resume") picks it up automatically. */
export const RESUME_URL =
  'https://drive.google.com/file/d/1xVHGbjG5h9m0vCDPD6st_TLrKn9ZF2U7/view?usp=sharing';

/** Self-hosted resume served by the app, so the inline preview loads it directly
 *  (no third-party viewer chrome) and our skeleton governs the genuine load. */
export const RESUME_PREVIEW_URL = '/assets/resume.pdf';

/** Labels for the resume preview modal (no inline strings at the callsite). */
export const RESUME_PREVIEW = {
  title: 'Résumé',
  loadingLabel: 'Loading preview…',
  openLabel: 'Open in new tab',
} as const;
