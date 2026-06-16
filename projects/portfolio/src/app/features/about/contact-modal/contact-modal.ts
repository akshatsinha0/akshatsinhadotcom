import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

interface ContactFormData {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  professionalTitle: string;
  organization: string;
  linkedinProfile: string;
  projectType: string;
  collaborationType: string;
  budget: string;
  timeline: string;
  primaryMessage: string;
  specificQuestions: string;
  preferredMeeting: string;
  communicationStyle: string;
  hearAboutMe: string;
  expectations: string;
  additionalComments: string;
}

interface Step {
  readonly id: number;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: string;
}

const EMPTY_FORM: ContactFormData = {
  fullName: '',
  emailAddress: '',
  phoneNumber: '',
  professionalTitle: '',
  organization: '',
  linkedinProfile: '',
  projectType: '',
  collaborationType: '',
  budget: '',
  timeline: '',
  primaryMessage: '',
  specificQuestions: '',
  preferredMeeting: '',
  communicationStyle: '',
  hearAboutMe: '',
  expectations: '',
  additionalComments: '',
};

/** Multi-step contact form. */
@Component({
  selector: 'app-contact-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.css',
})
export class ContactModal {
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly currentStep = signal(1);
  protected readonly formData = signal<ContactFormData>({ ...EMPTY_FORM });
  protected readonly errors = signal<Record<string, string>>({});
  protected readonly isSubmitting = signal(false);

  protected readonly steps: readonly Step[] = [
    {
      id: 1,
      title: 'Professional Credentials',
      subtitle: "Let's establish your distinguished identity",
      icon: '',
    },
    {
      id: 2,
      title: 'Collaboration Intentions',
      subtitle: 'Define the scope of our potential partnership',
      icon: '',
    },
    {
      id: 3,
      title: 'Communication Dynamics',
      subtitle: 'Share your thoughts and inquiries',
      icon: '💬',
    },
    {
      id: 4,
      title: 'Finalization & Submission',
      subtitle: 'Review and transmit your distinguished request',
      icon: '✨',
    },
  ];

  protected readonly activeStep = computed(() => this.steps[this.currentStep() - 1]);

  protected close(): void {
    this.closed.emit();
  }

  protected updateField(field: keyof ContactFormData, value: string): void {
    this.formData.update((d) => ({ ...d, [field]: value }));
    if (this.errors()[field]) {
      this.errors.update((e) => ({ ...e, [field]: '' }));
    }
  }

  protected next(): void {
    if (this.validateStep(this.currentStep())) {
      this.currentStep.update((s) => Math.min(s + 1, 4));
    }
  }

  protected previous(): void {
    this.currentStep.update((s) => Math.max(s - 1, 1));
  }

  protected async submit(): Promise<void> {
    if (!this.validateStep(3)) return;
    this.isSubmitting.set(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.isSubmitting.set(false);
    this.currentStep.set(4);
    setTimeout(() => {
      this.close();
      this.currentStep.set(1);
      this.formData.set({ ...EMPTY_FORM });
    }, 3000);
  }

  private validateStep(step: number): boolean {
    const data = this.formData();
    const next: Record<string, string> = {};
    if (step === 1) {
      if (!data.fullName.trim()) next['fullName'] = 'Your distinguished name is requisite';
      if (!data.emailAddress.trim())
        next['emailAddress'] = 'Electronic correspondence address required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailAddress))
        next['emailAddress'] = 'Please provide a valid electronic mail format';
      if (!data.professionalTitle.trim())
        next['professionalTitle'] = 'Your professional designation is essential';
    } else if (step === 2) {
      if (!data.projectType) next['projectType'] = 'Please specify your collaboration intentions';
      if (!data.timeline) next['timeline'] = 'Project timeline specification required';
    } else if (step === 3) {
      if (!data.primaryMessage.trim())
        next['primaryMessage'] = 'Your primary discourse is mandatory';
      if (data.primaryMessage.length < 20)
        next['primaryMessage'] = 'Please elaborate your message comprehensively';
    }
    this.errors.set(next);
    return Object.keys(next).length === 0;
  }
}
