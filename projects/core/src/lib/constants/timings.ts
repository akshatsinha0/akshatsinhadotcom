/** Centralized animation/behaviour timings in milliseconds. Single source so
 *  every component's setTimeout/setInterval reads from here, never a magic number. */
export const TIMINGS = {
  /** Full-screen loader run length before the landing page shows. */
  loaderDurationMs: 6000,
  /** Splash/loader → landing handoff delay in the shell. */
  splashToLandingMs: 6500,
  /** Interval between characters in the landing CGPA scramble. */
  scrambleIntervalMs: 20,
  /** How long an About stat stays in its "clicked" state. */
  statFlashMs: 1000,
  /** Terminal icon spin animation before the terminal opens. */
  terminalIconSpinMs: 1200,
  /** Re-roll cadence for the animated top color patch. */
  colorPatchIntervalMs: 12000,
  /** Simulated contact-form submit latency. */
  contactSubmitMs: 1200,
  /** Delay before the contact modal resets after success. */
  contactResetMs: 3000,
} as const;
