import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Contact modal (first-pass port of React ContactModal). The full 4-step form
 *  is pending; this provides the styled shell + close wiring so About is
 *  functional. */
@Component({
  selector: 'app-contact-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.css',
})
export class ContactModal {
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected close(): void {
    this.closed.emit();
  }
}
