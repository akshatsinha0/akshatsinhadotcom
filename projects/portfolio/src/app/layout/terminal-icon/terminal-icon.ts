import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

/** Floating icon that opens the interactive terminal. Plays a spin animation
 *  before emitting `opened`. */
@Component({
  selector: 'app-terminal-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terminal-icon.html',
  styleUrl: './terminal-icon.css',
})
export class TerminalIcon {
  readonly opened = output<void>();
  protected readonly isAnimating = signal(false);

  protected onClick(): void {
    this.isAnimating.set(true);
    setTimeout(() => {
      this.opened.emit();
      this.isAnimating.set(false);
    }, 1200);
  }
}
