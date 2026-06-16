/** Open a URL in a new browser tab with safe rel flags. Single helper so every
 *  "open in new tab" across the app behaves identically. */
export function openInNewTab(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}
