/** A work/internship experience entry. */
export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly duration: string;
  readonly description: readonly string[];
  readonly tech: readonly string[];
}
