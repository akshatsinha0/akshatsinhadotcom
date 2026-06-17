import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ASSETS } from '@akshat/core';
import { AWARDS } from '@akshat/data';

/** Awards section — renders @akshat/data. */
@Component({
  selector: 'app-awards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './awards.html',
  styleUrl: './awards.css',
})
export class Awards {
  protected readonly awards = AWARDS;
  protected readonly trophy = ASSETS.trophy;
}
