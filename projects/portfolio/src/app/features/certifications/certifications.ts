import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CERTIFICATIONS, MORE_CERTIFICATIONS } from '@akshat/data';

/** Certifications section — data centralized. */
@Component({
  selector: 'app-certifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certifications.html',
  styleUrls: ['./certifications.css', './cert-stack.css'],
})
export class Certifications {
  protected readonly certifications = CERTIFICATIONS;
  protected readonly moreCerts = MORE_CERTIFICATIONS;
  protected readonly particles = Array.from({ length: 30 }, (_, i) => i);
  protected readonly copiedCode = signal<string | null>(null);

  protected copyToClipboard(code: string): void {
    navigator.clipboard.writeText(code);
    this.copiedCode.set(code);
    setTimeout(() => this.copiedCode.set(null), 2000);
  }
}
