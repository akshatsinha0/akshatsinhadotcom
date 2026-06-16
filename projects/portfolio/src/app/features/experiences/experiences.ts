import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCES } from '@akshat/data';

/** Experience section — renders @akshat/data. */
@Component({
  selector: 'app-experiences',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experiences.html',
  styleUrl: './experiences.css',
})
export class Experiences {
  protected readonly experiences = EXPERIENCES;
}
