import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SKILLS } from '@akshat/data';

/** Skills section — content from @akshat/data. */
@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  protected readonly skills = SKILLS;
  protected readonly sparkles = [0, 1, 2, 3, 4];
  protected readonly activeSkill = signal<string | null>(null);
}
