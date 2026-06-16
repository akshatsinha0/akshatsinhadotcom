import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AWARDS } from '@akshat/data';

/** Awards section (ported from React Awards) — renders @akshat/data. */
@Component({
  selector: 'app-awards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './awards.html',
  styleUrl: './awards.css',
})
export class Awards {
  protected readonly awards = AWARDS;
  protected readonly trophy = '/assets/winningtrophyicon.png';
}
