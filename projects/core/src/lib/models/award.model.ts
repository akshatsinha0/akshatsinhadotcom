/** An award / recognition entry (mirror of old src/data/awards.ts). */
export interface Award {
  readonly title: string;
  readonly organization: string;
  readonly year: string;
  readonly description: string;
}
