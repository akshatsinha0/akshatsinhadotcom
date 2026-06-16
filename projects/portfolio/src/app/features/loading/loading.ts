import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

/** Full-screen intro loader (ported from React LoadingScreen). Drives a 6s
 *  custom-eased counter and the squeezing line animation via requestAnimationFrame. */
@Component({
  selector: 'app-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  protected readonly counter = signal(0);
  protected readonly lineProgress = signal(0);
  protected readonly lineSqueeze = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let running = true;
      destroyRef.onDestroy(() => (running = false));

      const duration = 6000;
      const start = Date.now();
      const animate = () => {
        if (!running) return;
        const raw = Math.min((Date.now() - start) / duration, 1);
        const normalized = Math.min(this.customEasing(raw) / 2, 1);
        const count = raw >= 0.95 ? 100 : Math.floor(normalized * 100);

        this.counter.set(count);
        this.lineProgress.set(normalized * 100);
        if (count >= 84) this.lineSqueeze.set(Math.min((count - 84) / 16, 1) * 88);

        if (raw < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  }

  /** Hand-tuned multi-phase easing (verbatim from the React loader). */
  private customEasing(t: number): number {
    if (t < 0.25) return t * 3.2;
    if (t < 0.45) return 0.8 + (t - 0.25) * 0.6;
    if (t < 0.7) return 0.92 + (t - 0.45) * 2.8;
    if (t < 0.85) return 1.62 + (t - 0.7) * 0.4;
    return 1.68 + (t - 0.85) * 2.13;
  }
}
