import { Directive, ElementRef, inject, input, OnDestroy, Renderer2 } from '@angular/core';

const OFFSET_PX = 10;

/** Simple shared tooltip. Apply `[akTooltip]="text"` to any element; a small
 *  label appears to its right on hover/focus. Styling lives in the global
 *  `.ak-tooltip` rule (token-based), so it stays consistent everywhere. */
@Directive({
  selector: '[akTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
  },
})
export class Tooltip implements OnDestroy {
  readonly akTooltip = input('');

  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tip: HTMLElement | null = null;

  protected show(): void {
    const text = this.akTooltip().trim();
    if (!text || this.tip) return;

    const tip = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(tip, 'ak-tooltip');
    this.renderer.setProperty(tip, 'textContent', text);
    this.renderer.appendChild(document.body, tip);

    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(tip, 'left', `${rect.right + OFFSET_PX}px`);
    this.renderer.setStyle(tip, 'top', `${rect.top + rect.height / 2}px`);
    this.tip = tip;
  }

  protected hide(): void {
    if (!this.tip) return;
    this.renderer.removeChild(document.body, this.tip);
    this.tip = null;
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
