import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

/** Smooth custom cursor + lerped trail. Disabled
 *  for coarse pointers / reduced-motion. Currently unmounted, matching React. */
@Component({
  selector: 'ak-mouse-trail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mouse-trail.html',
  styleUrl: './mouse-trail.css',
})
export class MouseTrail {
  protected readonly enabled = signal(false);
  private readonly cursor = viewChild<ElementRef<HTMLDivElement>>('cursor');
  private readonly trail = viewChild<ElementRef<HTMLDivElement>>('trail');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const fine = window.matchMedia?.('(pointer:fine)').matches;
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (!fine || reduce) return;
      this.enabled.set(true);

      let mx = 0;
      let my = 0;
      let tx = 0;
      let ty = 0;
      let raf = 0;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      const loop = () => {
        tx += (mx - tx) * 0.2;
        ty += (my - ty) * 0.2;
        const cursorEl = this.cursor()?.nativeElement;
        const trailEl = this.trail()?.nativeElement;
        if (cursorEl) cursorEl.style.transform = `translate3d(${mx}px,${my}px,0)`;
        if (trailEl) trailEl.style.transform = `translate3d(${tx}px,${ty}px,0)`;
        raf = requestAnimationFrame(loop);
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      raf = requestAnimationFrame(loop);
      destroyRef.onDestroy(() => {
        window.removeEventListener('mousemove', onMove);
        cancelAnimationFrame(raf);
      });
    });
  }
}
