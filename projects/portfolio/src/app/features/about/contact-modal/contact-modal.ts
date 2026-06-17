import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { firstError, FormFieldConfig, TIMINGS } from '@akshat/core';
import { CONTACT_HEADER, CONTACT_STEPS, CONTACT_SUCCESS, CONTACT_UI } from '@akshat/data';

/** Step id used for the post-submit success screen. */
const SUCCESS_STEP = CONTACT_STEPS[CONTACT_STEPS.length - 1].id;

/** Config-driven multi-step contact form. All fields, options, labels, limits,
 *  and validation come from @akshat/data / @akshat/core — nothing is declared
 *  inline here. */
@Component({
  selector: 'app-contact-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.css',
})
export class ContactModal {
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly header = CONTACT_HEADER;
  protected readonly ui = CONTACT_UI;
  protected readonly success = CONTACT_SUCCESS;
  protected readonly steps = CONTACT_STEPS;

  protected readonly currentStep = signal(1);
  protected readonly formData = signal<Record<string, string>>(emptyForm());
  protected readonly errors = signal<Record<string, string>>({});
  protected readonly focusedKey = signal<string | null>(null);
  protected readonly isSubmitting = signal(false);

  protected readonly activeStep = computed(() => this.steps[this.currentStep() - 1]);
  protected readonly isSuccess = computed(() => this.currentStep() >= SUCCESS_STEP);
  protected readonly isLastInputStep = computed(() => this.currentStep() === SUCCESS_STEP - 1);

  protected value(key: string): string {
    return this.formData()[key] ?? '';
  }

  protected error(key: string): string {
    return this.errors()[key] ?? '';
  }

  protected remaining(field: FormFieldConfig): number | null {
    return field.maxLength == null ? null : field.maxLength - this.value(field.key).length;
  }

  protected close(): void {
    this.closed.emit();
  }

  protected setFocus(key: string | null): void {
    this.focusedKey.set(key);
  }

  protected update(key: string, value: string): void {
    this.formData.update((data) => ({ ...data, [key]: value }));
    if (this.errors()[key]) this.errors.update((e) => ({ ...e, [key]: '' }));
  }

  protected next(): void {
    if (this.validateStep()) this.currentStep.update((s) => s + 1);
  }

  protected previous(): void {
    this.currentStep.update((s) => Math.max(1, s - 1));
  }

  protected async submit(): Promise<void> {
    if (!this.validateStep()) return;
    this.isSubmitting.set(true);
    await new Promise((resolve) => setTimeout(resolve, TIMINGS.contactSubmitMs));
    this.isSubmitting.set(false);
    this.currentStep.set(SUCCESS_STEP);
    setTimeout(() => this.reset(), TIMINGS.contactResetMs);
  }

  private validateStep(): boolean {
    const next: Record<string, string> = {};
    for (const field of this.activeStep().fields) {
      const error = firstError(this.value(field.key), field.validators);
      if (error) next[field.key] = error;
    }
    this.errors.set(next);
    return Object.keys(next).length === 0;
  }

  private reset(): void {
    this.close();
    this.currentStep.set(1);
    this.formData.set(emptyForm());
    this.errors.set({});
  }
}

/** Build a blank value map keyed by every field across all steps. */
function emptyForm(): Record<string, string> {
  const data: Record<string, string> = {};
  for (const step of CONTACT_STEPS) {
    for (const field of step.fields) data[field.key] = '';
  }
  return data;
}
