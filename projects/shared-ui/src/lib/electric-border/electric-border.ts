import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';

let uid = 0;

/** Animated turbulent SVG border wrapper.
 *  Projects content via <ng-content>; drives feOffset/feDisplacement animation
 *  sized to the host via a ResizeObserver. */
@Component({
  selector: 'ak-electric-border',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './electric-border.html',
  styleUrl: './electric-border.css',
  host: {
    class: 'electric-border',
    '[style.--electric-border-color]': 'color()',
    '[style.--eb-border-width.px]': 'thickness()',
  },
})
export class ElectricBorder {
  readonly color = input<string>('var(--ak-paint-iris-500)');
  readonly speed = input(1);
  readonly chaos = input(1);
  readonly thickness = input(2);

  protected readonly filterId = `turbulent-displace-${uid++}`;

  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly svg = viewChild<ElementRef<SVGSVGElement>>('svg');
  private readonly stroke = viewChild<ElementRef<HTMLDivElement>>('stroke');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const host = this.hostEl.nativeElement;
      if (!host) return;
      const observer = new ResizeObserver(() => this.updateAnim());
      observer.observe(host);
      this.updateAnim();
      destroyRef.onDestroy(() => observer.disconnect());
    });
    effect(() => {
      this.speed();
      this.chaos();
      this.updateAnim();
    });
  }

  private updateAnim(): void {
    const svg = this.svg()?.nativeElement;
    const host = this.hostEl.nativeElement;
    if (!svg || !host) return;

    const strokeEl = this.stroke()?.nativeElement;
    if (strokeEl) strokeEl.style.filter = `url(#${this.filterId})`;

    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute('values', `${height}; 0`);
      dyAnims[1].setAttribute('values', `0; -${height}`);
    }
    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute('values', `${width}; 0`);
      dxAnims[1].setAttribute('values', `0; -${width}`);
    }

    const dur = Math.max(0.001, 6 / (this.speed() || 1));
    [...dyAnims, ...dxAnims].forEach((a) => a.setAttribute('dur', `${dur}s`));

    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (this.chaos() || 1)));

    const filterEl = svg.querySelector(`#${CSS.escape(this.filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }

    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach((a) => {
        const anim = a as SVGAnimateElement;
        if (typeof anim.beginElement === 'function') {
          try {
            anim.beginElement();
          } catch {
            // beginElement can throw on some browsers — safe to ignore.
          }
        }
      });
    });
  }
}
