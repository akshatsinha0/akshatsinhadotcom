import { email, FormStepConfig, minLength, required, SelectOption, url } from '@akshat/core';

/** Field length limits (single source). */
const LIMIT = {
  name: 80,
  title: 80,
  organization: 100,
  phone: 20,
  message: 500,
  questions: 500,
} as const;

const MESSAGE_MIN = 20;

const PROJECT_TYPE_OPTIONS: readonly SelectOption[] = [
  { value: 'web-development', label: 'Web Development & Engineering' },
  { value: 'mobile-application', label: 'Mobile Application Architecture' },
  { value: 'ai-ml-consulting', label: 'AI/ML Consultation & Implementation' },
  { value: 'software-architecture', label: 'Software Architecture Design' },
  { value: 'technical-mentoring', label: 'Technical Mentoring & Guidance' },
  { value: 'research-collaboration', label: 'Research & Development Partnership' },
  { value: 'startup-consultation', label: 'Startup Technical Consultation' },
  { value: 'other', label: 'Alternative Collaboration Model' },
];

const COLLABORATION_OPTIONS: readonly SelectOption[] = [
  { value: 'full-time', label: 'Full-time Partnership' },
  { value: 'part-time', label: 'Part-time Collaboration' },
  { value: 'project-based', label: 'Project-specific Engagement' },
  { value: 'consulting', label: 'Strategic Consultation' },
  { value: 'freelance', label: 'Freelance Assignment' },
  { value: 'long-term', label: 'Long-term Strategic Alliance' },
];

const BUDGET_OPTIONS: readonly SelectOption[] = [
  { value: 'startup', label: 'Startup / Academic (< $5K)' },
  { value: 'small', label: 'Small Scale ($5K - $25K)' },
  { value: 'medium', label: 'Medium Scale ($25K - $100K)' },
  { value: 'enterprise', label: 'Enterprise Level ($100K+)' },
  { value: 'equity', label: 'Equity-based Partnership' },
  { value: 'discuss', label: 'Open for Discussion' },
];

const TIMELINE_OPTIONS: readonly SelectOption[] = [
  { value: 'immediate', label: 'Immediate (within 2 weeks)' },
  { value: 'short', label: 'Short-term (1-3 months)' },
  { value: 'medium', label: 'Medium-term (3-6 months)' },
  { value: 'long', label: 'Long-term (6+ months)' },
  { value: 'ongoing', label: 'Ongoing Partnership' },
];

const MEETING_OPTIONS: readonly SelectOption[] = [
  { value: 'video-call', label: 'Video Conference (Zoom / Meet)' },
  { value: 'phone-call', label: 'Telephonic Discussion' },
  { value: 'in-person', label: 'Face-to-face Meeting' },
  { value: 'email-first', label: 'Email Correspondence Initially' },
  { value: 'messaging', label: 'Instant Messaging Platform' },
];

const COMMUNICATION_OPTIONS: readonly SelectOption[] = [
  { value: 'formal', label: 'Formal & Structured' },
  { value: 'casual', label: 'Casual & Friendly' },
  { value: 'technical', label: 'Technical & Direct' },
  { value: 'collaborative', label: 'Collaborative & Interactive' },
];

export const CONTACT_HEADER = {
  title: 'Start a conversation',
  subtitle: 'Tell me about you and what you have in mind.',
} as const;

/** All user-facing control labels (no inline strings in the component). */
export const CONTACT_UI = {
  previous: 'Back',
  next: 'Continue',
  submit: 'Send request',
  submitting: 'Sending...',
  selectPlaceholder: 'Select an option',
  charsRemaining: 'characters remaining',
} as const;

export const CONTACT_SUCCESS = {
  title: 'Request sent',
  message: 'Your message has been received and will be reviewed shortly.',
  details: [
    'Response time: within 24 to 48 hours.',
    'Alternative contact: akshatsinhasramhardy@gmail.com',
  ],
} as const;

export const CONTACT_STEPS: readonly FormStepConfig[] = [
  {
    id: 1,
    title: 'Your details',
    subtitle: 'Who is reaching out.',
    fields: [
      {
        key: 'fullName',
        label: 'Full name',
        type: 'text',
        placeholder: 'Your full name',
        maxLength: LIMIT.name,
        validators: [required('Your name is required.')],
      },
      {
        key: 'emailAddress',
        label: 'Email address',
        type: 'email',
        placeholder: 'you@example.com',
        validators: [
          required('An email address is required.'),
          email('Enter a valid email address.'),
        ],
      },
      {
        key: 'phoneNumber',
        label: 'Phone (optional)',
        type: 'tel',
        placeholder: '+91 00000 00000',
        maxLength: LIMIT.phone,
      },
      {
        key: 'professionalTitle',
        label: 'Role / title',
        type: 'text',
        placeholder: 'Your current role',
        maxLength: LIMIT.title,
        validators: [required('Your role is required.')],
      },
      {
        key: 'organization',
        label: 'Organization (optional)',
        type: 'text',
        placeholder: 'Company or institution',
        maxLength: LIMIT.organization,
      },
      {
        key: 'linkedinProfile',
        label: 'LinkedIn (optional)',
        type: 'url',
        placeholder: 'https://linkedin.com/in/you',
        validators: [url('Enter a valid URL (starting with http).')],
      },
    ],
  },
  {
    id: 2,
    title: 'The engagement',
    subtitle: 'What kind of work and on what timeline.',
    fields: [
      {
        key: 'projectType',
        label: 'Project type',
        type: 'select',
        options: PROJECT_TYPE_OPTIONS,
        validators: [required('Please pick a project type.')],
      },
      {
        key: 'collaborationType',
        label: 'Engagement (optional)',
        type: 'select',
        options: COLLABORATION_OPTIONS,
      },
      { key: 'budget', label: 'Budget (optional)', type: 'select', options: BUDGET_OPTIONS },
      {
        key: 'timeline',
        label: 'Timeline',
        type: 'select',
        options: TIMELINE_OPTIONS,
        validators: [required('Please pick a timeline.')],
      },
    ],
  },
  {
    id: 3,
    title: 'Your message',
    subtitle: 'Share the details.',
    fields: [
      {
        key: 'primaryMessage',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Describe your idea, requirements, and expectations.',
        rows: 6,
        fullWidth: true,
        maxLength: LIMIT.message,
        validators: [
          required('A message is required.'),
          minLength(MESSAGE_MIN, `Please write at least ${MESSAGE_MIN} characters.`),
        ],
      },
      {
        key: 'specificQuestions',
        label: 'Questions (optional)',
        type: 'textarea',
        placeholder: 'Any specific questions or concerns.',
        rows: 4,
        fullWidth: true,
        maxLength: LIMIT.questions,
      },
      {
        key: 'preferredMeeting',
        label: 'Preferred meeting (optional)',
        type: 'select',
        options: MEETING_OPTIONS,
      },
      {
        key: 'communicationStyle',
        label: 'Communication style (optional)',
        type: 'select',
        options: COMMUNICATION_OPTIONS,
      },
    ],
  },
  { id: 4, title: 'Done', subtitle: '', fields: [] },
];
