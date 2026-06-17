import { Validator } from '../utils/validators';

/** Supported input renderings for a config-driven form field. */
export type FormFieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

/** Declarative description of one form field. A form is built entirely from
 *  these — labels, placeholders, limits, options, and validators all live in
 *  config, never inline in the component. */
export interface FormFieldConfig {
  readonly key: string;
  readonly label: string;
  readonly type: FormFieldType;
  readonly placeholder?: string;
  readonly maxLength?: number;
  readonly rows?: number;
  readonly fullWidth?: boolean;
  readonly options?: readonly SelectOption[];
  readonly validators?: readonly Validator[];
}

export interface FormStepConfig {
  readonly id: number;
  readonly title: string;
  readonly subtitle: string;
  readonly fields: readonly FormFieldConfig[];
}
