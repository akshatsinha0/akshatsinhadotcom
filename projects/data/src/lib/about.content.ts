/** About-section content. Colors reference
 *  canonical section tokens — no raw hex. */
import { RESUME_URL } from './links.content';
import { PROFILE } from './profile.content';

export interface ExpertiseArea {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly details: readonly string[];
  readonly color: string;
}

export interface AboutStat {
  readonly key: string;
  readonly number: string;
  readonly label: string;
  readonly detail: string;
}

/** Re-exported from the canonical links source so callers keep one import path. */
export const ABOUT_RESUME_URL = RESUME_URL;

export const ABOUT_PHILOSOPHY = 'Ready and suprised student.';

export const ABOUT_STATS: readonly AboutStat[] = [
  { key: 'cgpa', number: PROFILE.cgpa, label: 'CGPA', detail: PROFILE.university },
  { key: 'projects', number: '15+', label: 'Projects', detail: 'Developed' },
  { key: 'certs', number: '3+', label: 'Certifications', detail: 'Achieved' },
  { key: 'score', number: '95%', label: 'Class X', detail: 'DPS Ranchi' },
];

export const EXPERTISE_AREAS: readonly ExpertiseArea[] = [
  {
    id: 'programming',
    title: 'Programming Knowledge',
    subtitle: 'Java & Beyond',
    details: [
      'Java Development & OOP Mastery',
      'Data Structures & Algorithms Expertise',
      'Software Development Life Cycle',
      'Clean Code Architecture & Design Patterns',
    ],
    color: 'var(--ak-color-section-about)',
  },
  {
    id: 'mathematics',
    title: 'Mathematical Foundation',
    subtitle: 'Logical Reasoning',
    details: [
      'Mathematics & Statistics',
      'Quantitative Aptitude & Mental Ability',
      'Mathematical Modeling & Problem Solving',
      'Algorithmic Complexity Analysis',
    ],
    color: 'var(--ak-color-section-projects)',
  },
  {
    id: 'management',
    title: 'Leadership & Communication',
    subtitle: 'People Skills',
    details: [
      'Project Management & Team Leadership',
      'Public Speaking & Presentation Skills',
      'Crowd Management & Event Organization',
      'Cross-functional Team Collaboration',
    ],
    color: 'var(--ak-color-section-skills)',
  },
  {
    id: 'ai',
    title: 'AI & Emerging Tech',
    subtitle: 'Future-Ready',
    details: [
      'AI Prompt Engineering & Optimization',
      'Machine Learning Fundamentals',
      'Natural Language Processing',
      'Emerging Technology Research',
    ],
    color: 'var(--ak-color-section-certifications)',
  },
];
