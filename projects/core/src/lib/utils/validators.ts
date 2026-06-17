/**
 * Centralized field validators. Each factory takes the message to show and
 * returns a `Validator` that yields that message when invalid, or null when
 * valid. Forms compose these in their field config — no validation logic or
 * messages are written inline at a component.
 */
export type Validator = (value: string) => string | null;

/** Canonical email shape used across the app. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Canonical http(s) URL shape. */
export const URL_PATTERN = /^https?:\/\/[^\s]+$/;

export const required =
  (message: string): Validator =>
  (value) =>
    value.trim().length === 0 ? message : null;

export const email =
  (message: string): Validator =>
  (value) =>
    value.trim().length === 0 || EMAIL_PATTERN.test(value.trim()) ? null : message;

export const url =
  (message: string): Validator =>
  (value) =>
    value.trim().length === 0 || URL_PATTERN.test(value.trim()) ? null : message;

export const minLength =
  (min: number, message: string): Validator =>
  (value) =>
    value.trim().length === 0 || value.trim().length >= min ? null : message;

export const maxLength =
  (max: number, message: string): Validator =>
  (value) =>
    value.length <= max ? null : message;

/** Run validators in order; return the first error message, or null if all pass. */
export function firstError(value: string, validators: readonly Validator[] = []): string | null {
  for (const validate of validators) {
    const error = validate(value);
    if (error) return error;
  }
  return null;
}
