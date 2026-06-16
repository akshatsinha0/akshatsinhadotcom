import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ABOUT_PHILOSOPHY, ABOUT_RESUME_URL, ABOUT_STATS, EXPERTISE_AREAS } from '@akshat/data';
import { ContactModal } from './contact-modal/contact-modal';

type CardsState = 'stack' | 'scatter' | 'open';

/** About section (ported from React Description). Content from @akshat/data. */
@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactModal],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly philosophy = ABOUT_PHILOSOPHY;
  protected readonly stats = ABOUT_STATS;
  protected readonly expertiseAreas = EXPERTISE_AREAS;
  protected readonly profileImg = '/assets/AKSHATSINHAPHOTO.jpg';

  protected readonly activeExpertise = signal<string | null>(null);
  protected readonly clickedStat = signal<string | null>(null);
  protected readonly cardsState = signal<CardsState>('stack');
  protected readonly isContactOpen = signal(false);

  protected onStatClick(key: string): void {
    this.clickedStat.set(key);
    setTimeout(() => this.clickedStat.set(null), 1000);
  }

  protected onCardClick(id: string, index: number): void {
    const state = this.cardsState();
    if (state === 'stack' && index === 0) {
      this.cardsState.set('scatter');
      return;
    }
    if (state === 'scatter') {
      this.cardsState.set('stack');
      return;
    }
    this.activeExpertise.update((current) => (current === id ? null : id));
  }

  protected openResume(): void {
    window.open(ABOUT_RESUME_URL, '_blank');
  }
}
