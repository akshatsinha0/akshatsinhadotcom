import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  TERMINAL_ABOUT,
  TERMINAL_EXIT_MESSAGE,
  TERMINAL_HELP,
  TERMINAL_INTRO,
  TERMINAL_MATRIX,
  TERMINAL_PROMPT,
  TERMINAL_QUOTES,
  TERMINAL_WHOAMI,
} from '@akshat/data';

type CommandFn = () => readonly string[];

/** Interactive fake-shell overlay.
 *  Command content comes from @akshat/data; only dynamic commands live here. */
@Component({
  selector: 'app-terminal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terminal.html',
  styleUrl: './terminal.css',
})
export class Terminal {
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly prompt = TERMINAL_PROMPT;
  protected readonly inputValue = signal('');
  protected readonly history = signal<string[]>([]);

  private readonly commandHistory = signal<string[]>([]);
  private historyIndex = -1;
  private readonly body = viewChild<ElementRef<HTMLDivElement>>('body');

  private readonly commands: Readonly<Record<string, CommandFn>> = {
    help: () => TERMINAL_HELP,
    about: () => TERMINAL_ABOUT.bio,
    experience: () => TERMINAL_ABOUT.experience,
    projects: () => TERMINAL_ABOUT.projects,
    skills: () => TERMINAL_ABOUT.skills,
    achievements: () => TERMINAL_ABOUT.achievements,
    contact: () => TERMINAL_ABOUT.contact,
    whoami: () => TERMINAL_WHOAMI,
    date: () => [new Date().toLocaleString()],
    quote: () => TERMINAL_QUOTES,
    matrix: () => TERMINAL_MATRIX,
    clear: () => {
      this.history.set([]);
      return [];
    },
    exit: () => {
      this.closed.emit();
      return [TERMINAL_EXIT_MESSAGE];
    },
  };

  constructor() {
    effect(() => {
      if (this.isOpen()) this.history.set([...TERMINAL_INTRO]);
    });
    effect(() => {
      this.history();
      const el = this.body()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected close(): void {
    this.closed.emit();
  }

  protected onInput(value: string): void {
    this.inputValue.set(value);
  }

  protected onKey(event: KeyboardEvent): void {
    const cmds = this.commandHistory();
    if (event.key === 'Enter') {
      this.execute(this.inputValue());
      this.inputValue.set('');
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (cmds.length > 0 && this.historyIndex < cmds.length - 1) {
        this.historyIndex += 1;
        this.inputValue.set(cmds[cmds.length - 1 - this.historyIndex]);
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex -= 1;
        this.inputValue.set(cmds[cmds.length - 1 - this.historyIndex]);
      } else if (this.historyIndex === 0) {
        this.historyIndex = -1;
        this.inputValue.set('');
      }
    }
  }

  private execute(raw: string): void {
    const trimmed = raw.trim().toLowerCase();
    this.commandHistory.update((h) => [...h, raw]);
    this.historyIndex = -1;

    if (trimmed === '') {
      this.history.update((h) => [...h, this.prompt]);
      return;
    }

    const command = this.commands[trimmed];
    if (command) {
      const output = command();
      this.history.update((h) => [...h, `${this.prompt}${raw}`, ...output, '']);
      return;
    }

    this.history.update((h) => [
      ...h,
      `${this.prompt}${raw}`,
      `Command '${raw}' not found. Type 'help' for available commands.`,
      '',
    ]);
  }
}
