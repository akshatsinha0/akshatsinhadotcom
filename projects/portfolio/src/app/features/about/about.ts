import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ABOUT_PHILOSOPHY,
  ABOUT_STATS,
  EXPERTISE_AREAS,
  RESUME_PREVIEW,
  RESUME_PREVIEW_URL,
  RESUME_URL,
} from '@akshat/data';
import { PdfPreview } from '@akshat/shared-ui';
import { ContactModal } from './contact-modal/contact-modal';

type CardsState = 'stack' | 'scatter' | 'open';

/** About section. Content from @akshat/data. */
@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactModal, PdfPreview],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly philosophy = ABOUT_PHILOSOPHY;
  protected readonly stats = ABOUT_STATS;
  protected readonly expertiseAreas = EXPERTISE_AREAS;
  protected readonly profileImg = '/assets/AKSHATSINHAPHOTO.jpg';

  protected readonly resumePreview = RESUME_PREVIEW;
  protected readonly resumePreviewUrl = RESUME_PREVIEW_URL;
  protected readonly resumeUrl = RESUME_URL;

  protected readonly activeExpertise = signal<string | null>(null);
  protected readonly clickedStat = signal<string | null>(null);
  protected readonly cardsState = signal<CardsState>('stack');
  protected readonly isContactOpen = signal(false);
  protected readonly isResumeOpen = signal(false);

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
    this.isResumeOpen.set(true);
  }
}
