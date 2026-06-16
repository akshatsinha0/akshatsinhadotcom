import { ProjectCategory, ProjectStatus } from '../enums/project.enum';

export type MetricMap = Readonly<Record<string, string>>;

/** A portfolio project. */
export interface Project {
  readonly id: number;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly category: ProjectCategory;
  readonly technologies: readonly string[];
  readonly link?: string;
  readonly github?: string;
  readonly images?: readonly string[];
  readonly features: readonly string[];
  readonly metrics: MetricMap;
  readonly year: string;
  readonly status: ProjectStatus;
}
