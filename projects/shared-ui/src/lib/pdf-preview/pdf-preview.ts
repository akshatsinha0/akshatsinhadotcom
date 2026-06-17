import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Reusable inline PDF preview modal. Renders the document in an iframe and
 *  shows a skeleton placeholder until the frame finishes loading. All text and
 *  the source URL are passed in by the caller — nothing is hardcoded here. */
const SKELETON_LINE_COUNT = 14;

@Component({
  selector: 'ak-pdf-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pdf-preview.html',
  styleUrl: './pdf-preview.css',
})
export class PdfPreview {
  readonly open = input(false);
  readonly src = input('');
  readonly title = input('Preview');
  readonly openHref = input('');
  readonly openLabel = input('Open in new tab');
  readonly loadingLabel = input('Loading preview…');
  readonly closed = output<void>();

  protected readonly loading = signal(true);
  /** Placeholder paragraph lines drawn on the skeleton page. */
  protected readonly skeletonLines = Array.from({ length: SKELETON_LINE_COUNT }, (_, i) => i);

  private readonly sanitizer = inject(DomSanitizer);
  protected readonly safeSrc = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.src()),
  );

  constructor() {
    // Reset to the skeleton each time the modal is opened.
    effect(() => {
      if (this.open()) this.loading.set(true);
    });
  }

  protected close(): void {
    this.closed.emit();
  }

  protected onLoaded(): void {
    this.loading.set(false);
  }
}
