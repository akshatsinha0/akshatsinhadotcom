import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TIMINGS } from '@akshat/core';
import { LANDING_CARDS, LANDING_CGPA, LANDING_FEATURED, LANDING_HERO_META } from '@akshat/data';

/** Pre-app landing page. Emits `entered` when
 *  the visitor chooses to enter the portfolio. */
@Component({
  selector: 'app-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  readonly entered = output<void>();

  protected readonly cards = LANDING_CARDS;
  protected readonly featured = LANDING_FEATURED;
  protected readonly heroMeta = LANDING_HERO_META;
  protected readonly cgpaText = LANDING_CGPA;
  protected readonly scrambledCgpa = signal('');
  protected readonly hoveredCard = signal<number | null>(null);

  /** Expanding search bar: open state, live query, and the input to focus. */
  protected readonly searchOpen = signal(false);
  protected readonly searchQuery = signal('');
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const characters = '0123456789./';
      let iteration = 0;
      const interval = setInterval(() => {
        this.scrambledCgpa.set(
          this.cgpaText
            .split('')
            .map((char, index) => {
              if (index < iteration) return this.cgpaText[index];
              if (char === '/' || char === '.') return char;
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(''),
        );
        if (iteration >= this.cgpaText.length) clearInterval(interval);
        iteration += 1;
      }, TIMINGS.scrambleIntervalMs);
      destroyRef.onDestroy(() => clearInterval(interval));
    });
  }

  protected enter(): void {
    this.entered.emit();
  }

  /** Toggle the search bar; focus the field as it opens, clear the query as it closes. */
  protected toggleSearch(): void {
    const opening = !this.searchOpen();
    this.searchOpen.set(opening);
    if (opening) {
      queueMicrotask(() => this.searchInput()?.nativeElement.focus());
    } else {
      this.searchQuery.set('');
    }
  }

  protected closeSearch(): void {
    if (!this.searchOpen()) return;
    this.searchOpen.set(false);
    this.searchQuery.set('');
  }
}
