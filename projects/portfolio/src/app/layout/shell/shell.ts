import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PATCH_CHROMA, PATCH_LIGHT_PALETTE } from '@akshat/core';
import { Loading } from '../../features/loading/loading';
import { Landing } from '../../features/landing/landing';
import { Terminal } from '../../features/terminal/terminal';
import { Contact } from '../contact/contact';
import { Navigation } from '../navigation/navigation';
import { TerminalIcon } from '../terminal-icon/terminal-icon';

type Phase = 'loading' | 'landing' | 'main';

/** Portfolio shell: loading → landing → main phase
 *  machine, animated top color patch, navigation, and the terminal overlay.
 *  Section components render in its nested router-outlet. */
@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Loading, Landing, Navigation, Contact, TerminalIcon, Terminal],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  protected readonly phase = signal<Phase>('loading');
  protected readonly isTerminalOpen = signal(false);
  private readonly patch = viewChild<ElementRef<HTMLElement>>('patch');

  constructor() {
    const timer = setTimeout(() => this.phase.set('landing'), 6500);
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));

    afterRenderEffect((onCleanup) => {
      const el = this.patch()?.nativeElement;
      if (!el) return;
      this.applyPatch(el);
      const id = setInterval(() => this.applyPatch(el), 12000);
      onCleanup(() => clearInterval(id));
    });
  }

  protected enterMain(): void {
    this.phase.set('main');
  }

  private applyPatch(el: HTMLElement): void {
    const pick = (arr: readonly string[]) => arr[Math.floor(Math.random() * arr.length)];
    for (let i = 1; i <= 5; i++) el.style.setProperty(`--c${i}`, pick(PATCH_LIGHT_PALETTE));
    const mix = [...PATCH_CHROMA].sort(() => Math.random() - 0.5);
    for (let i = 0; i < mix.length; i++) el.style.setProperty(`--c${i + 6}`, mix[i]);
    el.style.setProperty('--patch-speed', `${24 + Math.floor(Math.random() * 24)}s`);
  }
}
