import { ASSETS } from '@akshat/core';
import { PROFILE } from './profile.content';

/** Canonical external links. Single source of truth: update once here and every
 *  callsite (About "View Resume", Contact, terminal) picks it up automatically. */
export const RESUME_URL =
  'https://drive.google.com/file/d/1xVHGbjG5h9m0vCDPD6st_TLrKn9ZF2U7/view?usp=sharing';

/** Self-hosted resume served by the app (single source: ASSETS.resumePdf). */
export const RESUME_PREVIEW_URL = ASSETS.resumePdf;

/** Labels for the resume preview modal (no inline strings at the callsite). */
export const RESUME_PREVIEW = {
  title: 'Résumé',
  loadingLabel: 'Loading preview…',
  openLabel: 'Open in new tab',
} as const;

/** Akshat's external profile links — shared by Contact, terminal, About. */
export const PROFILE_LINKS = {
  linkedin: 'https://www.linkedin.com/in/akshat-sinha-248805214',
  github: 'https://github.com/akshatsinha0',
  leetcode: 'https://leetcode.com/u/akshatsinha0/',
  emailHref: `mailto:${PROFILE.email}`,
  resume: RESUME_URL,
} as const;
