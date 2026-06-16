/**
 * CANONICAL color tokens — runtime mirror of the SCSS single-source-of-truth
 * at projects/portfolio/src/styles/tokens/.
 *
 * These arrays feed the animated `.top-color-patch` effect. Each entry is a
 * `var(--ak-paint-…)` reference; the array order is significant because the
 * randomized pick logic depends on it.
 */

/** Soft aurora washes for the color patch (order significant). */
export const PATCH_LIGHT_PALETTE: readonly string[] = [
  'var(--ak-paint-skyice-a55)',        // rgba(186,230,253,0.55)
  'var(--ak-paint-seafoam-a50)',       // rgba(167,243,208,0.5)
  'var(--ak-paint-flamingo-a45)',      // rgba(244,114,182,0.45)
  'var(--ak-paint-apricot-a45)',       // rgba(253,186,116,0.45)
  'var(--ak-paint-cornflower-a50)',    // rgba(147,197,253,0.5)
  'var(--ak-paint-cottoncandy-a50)',   // rgba(250,204,255,0.5)
  'var(--ak-paint-petal-a55)',         // rgba(254,205,211,0.55)
  'var(--ak-paint-sunbeam-a50)',       // rgba(255,247,133,0.5)
  'var(--ak-paint-aquamint-a50)',      // rgba(204,251,241,0.5)
  'var(--ak-paint-lavendermist-a50)',  // rgba(221,214,254,0.5)
] as const;

/** Saturated tint chips at alpha .20 for the color patch (order significant). */
export const PATCH_CHROMA: readonly string[] = [
  'var(--ak-paint-amethyst-a20)',      // rgba(168,85,247,0.20)
  'var(--ak-paint-azure-a20)',         // rgba(59,130,246,0.20)
  'var(--ak-paint-grass-a20)',         // rgba(34,197,94,0.20)
  'var(--ak-paint-vermilion-a20)',     // rgba(239,68,68,0.20)
  'var(--ak-paint-tangerine-a20)',     // rgba(249,115,22,0.20)
  'var(--ak-paint-periwinkle-a20)',    // rgba(139,92,246,0.20)
] as const;

/** Section id -> semantic section color (mirrors Navigation.tsx). */
export const SECTION_COLORS: Readonly<Record<string, string>> = {
  description: 'var(--ak-color-section-about)',            // #667eea
  experiences: 'var(--ak-color-section-experience)',       // #764ba2
  projects: 'var(--ak-color-section-projects)',            // #f093fb
  skills: 'var(--ak-color-section-skills)',                // #4facfe
  certifications: 'var(--ak-color-section-certifications)',// #43e97b
  awards: 'var(--ak-color-section-awards)',                // #fa709a
  images: 'var(--ak-color-section-images)',               // #38bdf8
} as const;
