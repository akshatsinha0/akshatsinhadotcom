import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MetricMap } from '@akshat/core';
import { PROJECTS } from '@akshat/data';
import { ElectricBorder } from '@akshat/shared-ui';

/** Projects showcase. Data from @akshat/data,
 *  electric border from @akshat/shared-ui. */
@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ElectricBorder],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected readonly projects = PROJECTS;
  protected readonly borderColor = 'var(--ak-paint-peacock-350)';
  protected readonly enableFlip = false;

  protected readonly activeProject = signal(0);
  protected readonly hoveredCard = signal<number | null>(null);
  protected readonly turned = signal<Record<number, boolean>>({});
  protected readonly viewMode = signal<'carousel' | 'timeline'>('carousel');
  protected readonly mouseX = signal(0);
  protected readonly mouseY = signal(0);

  protected onMouseMove(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    this.mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  protected statusClass(status: string): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  protected toggleTurn(event: MouseEvent, index: number): void {
    event.stopPropagation();
    this.turned.update((t) => ({ ...t, [index]: !t[index] }));
  }

  protected metricEntries(metrics: MetricMap): [string, string][] {
    return Object.entries(metrics);
  }
}
