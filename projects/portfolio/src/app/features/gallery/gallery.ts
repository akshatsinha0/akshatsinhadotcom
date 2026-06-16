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

const COUNT_PER_ROW = 5;
const ROWS = 5;
const TOTAL = COUNT_PER_ROW * ROWS;
const defaultHeroIndex = () => 1 * COUNT_PER_ROW + Math.floor(COUNT_PER_ROW / 2);

/** Scroll-pinned image gallery. Images are
 *  remote (Unsplash, with a Picsum fallback on error). As the section scrolls,
 *  the hovered/centre tile grows into a hero by reweighting the CSS grid. */
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  protected readonly items = Array.from({ length: TOTAL }, (_, i) => i);
  protected readonly heroIdx = signal(defaultHeroIndex());

  private readonly sec = viewChild<ElementRef<HTMLElement>>('sec');
  private readonly pin = viewChild<ElementRef<HTMLDivElement>>('pin');
  private readonly overlay = viewChild<ElementRef<HTMLDivElement>>('overlay');
  private hoverIdx: number | null = null;
  private wasActive = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const update = () => this.update();
      update();
      addEventListener('scroll', update, { passive: true });
      addEventListener('resize', update);
      destroyRef.onDestroy(() => {
        removeEventListener('scroll', update);
        removeEventListener('resize', update);
      });
    });
  }

  protected unsplash(i: number, w: number, h: number): string {
    return `https://source.unsplash.com/${w}x${h}/?nature,scenery&sig=${i}`;
  }

  protected setHover(i: number): void {
    this.hoverIdx = i;
  }

  protected onImgError(event: Event, i: number): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = `https://picsum.photos/seed/gallery-${i}/1600/900`;
  }

  private ease(t: number): number {
    t = Math.max(0, Math.min(1, t));
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private update(): void {
    const s = this.sec()?.nativeElement;
    const p = this.pin()?.nativeElement;
    const o = this.overlay()?.nativeElement;
    if (!s || !p) return;

    const r = s.getBoundingClientRect();
    const vh = innerHeight;
    const active = r.top <= 0 && r.bottom >= vh;
    const finished = r.bottom <= vh;
    const tailLen = Math.max(120, Math.min(vh * 0.9, r.height * 0.25));
    s.style.setProperty('--tail', `${Math.round(tailLen)}px`);

    let gp = 0;
    if (active) {
      const total = Math.max(1, r.height - vh);
      gp = this.ease(Math.min(total, Math.max(0, -r.top)) / total);
    } else if (finished) {
      const past = Math.min(tailLen, Math.max(0, vh - r.bottom));
      gp = 1 - this.ease(past / tailLen);
    }

    if (active && !this.wasActive) this.heroIdx.set(this.hoverIdx ?? defaultHeroIndex());
    this.wasActive = active;

    gp = Math.max(0, Math.min(1, gp));
    p.style.setProperty('--gp', String(gp));

    const heroCol = this.heroIdx() % COUNT_PER_ROW;
    const heroRow = Math.floor(this.heroIdx() / COUNT_PER_ROW);
    const g = this.ease(gp);
    const cols = Array.from({ length: COUNT_PER_ROW }, (_, c) =>
      c === heroCol ? 1 + g * 32 : Math.max(0.0001, 1 - g * 0.98),
    );
    const rowsW = Array.from({ length: ROWS }, (_, rw) =>
      rw === heroRow ? 1 + g * 8 : rw === 0 ? 2 : Math.max(0.0001, 1 - g * 0.9),
    );
    const colSum = cols.reduce((a, b) => a + b, 0);
    const rowSum = rowsW.reduce((a, b) => a + b, 0);
    const grid = p.querySelector<HTMLElement>('.img-grid');
    if (grid) {
      grid.style.gridTemplateColumns = cols
        .map((v) => `${((v / colSum) * 100).toFixed(4)}fr`)
        .join(' ');
      grid.style.gridTemplateRows = rowsW
        .map((v) => `${((v / rowSum) * 100).toFixed(4)}fr`)
        .join(' ');
    }

    if (o && grid) {
      const heroEl = grid.querySelector<HTMLElement>('.card.focus');
      if (heroEl) {
        const cr = p.getBoundingClientRect();
        const hr = heroEl.getBoundingClientRect();
        o.style.clipPath = `inset(${hr.top - cr.top}px ${cr.right - hr.right}px ${cr.bottom - hr.bottom}px ${hr.left - cr.left}px round 16px)`;
      }
    }

    const pastTail = Math.max(0, vh - r.bottom);
    const keepFixedTail = finished && pastTail < tailLen * 0.35 && gp > 0.01;
    const release = finished && pastTail >= tailLen * 0.35;
    p.classList.toggle('fixed', (active && !finished) || keepFixedTail);
    p.classList.toggle('release', release);
  }
}
