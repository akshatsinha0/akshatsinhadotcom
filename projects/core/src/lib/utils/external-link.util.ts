/** Open a URL in a new browser tab with safe rel flags. Single helper so every
 *  "open in new tab" across the app behaves identically. */
export function openInNewTab(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Convert a Google Drive file "view" URL into its embeddable "preview" URL,
 *  suitable for an <iframe> inline preview. */
export function toDrivePreviewUrl(fileUrl: string): string {
  return fileUrl.replace(/\/view.*$/, '/preview');
}
