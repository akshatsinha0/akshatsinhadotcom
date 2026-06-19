/** Landing-page content. */
import { PROFILE } from './profile.content';

/** Expanded hover-card detail, kept as one cohesive unit per card. */
export interface LandingCardDetails {
  readonly tag: string; // top status line
  readonly cta: string; // primary action label
  readonly accolade: string; // headline highlight
  readonly rating: string; // small rating chip
  readonly year: string;
  readonly meta: string; // extra scope/meta
  readonly description: string;
}

export interface LandingCard {
  readonly id: number;
  readonly title: string;
  readonly category: string;
  readonly details: LandingCardDetails;
}

export interface LandingFeatured {
  readonly badge: string;
  readonly title: string;
}

export const LANDING_CGPA = `${PROFILE.cgpa}/10`;

export const LANDING_HERO_META: readonly string[] = [
  '2024',
  '15+ Projects',
  '3+ Certifications',
  'React • Node.js • Python',
];

export const LANDING_CARDS: readonly LandingCard[] = [
  {
    id: 1,
    title: 'About Me',
    category: 'Introduction',
    details: {
      tag: 'Start Here',
      cta: 'Open Profile',
      accolade: 'Fragment Developer',
      rating: 'A+',
      year: '2024',
      meta: 'VIT Vellore',
      description:
        'Computer Science student crafting fast, polished web experiences. Meet the person behind the projects — the journey, the values, and the craft.',
    },
  },
  {
    id: 2,
    title: 'Projects',
    category: 'Showcase',
    details: {
      tag: 'Most Viewed',
      cta: 'Browse Projects',
      accolade: '15+ shipped builds',
      rating: 'A',
      year: '2024',
      meta: 'Full-stack',
      description:
        'Production apps, experiments, and tools — from real-time platforms to AI-assisted systems, each engineered end to end.',
    },
  },
  {
    id: 3,
    title: 'Experience',
    category: 'Professional',
    details: {
      tag: 'Track Record',
      cta: 'View Experience',
      accolade: 'Real-world impact',
      rating: 'A',
      year: '2023',
      meta: 'Roles & teams',
      description:
        'Internships and collaborations where ideas turned into shipped, measurable outcomes across teams and stacks.',
    },
  },
  {
    id: 4,
    title: 'Skills',
    category: 'Technical',
    details: {
      tag: 'Tech Arsenal',
      cta: 'See Skills',
      accolade: 'Polyglot engineer',
      rating: 'A+',
      year: '2024',
      meta: '10+ tools',
      description:
        'The languages, frameworks, and tools in daily rotation — React, Node, Python and more — depth to ship, range to adapt.',
    },
  },
  {
    id: 5,
    title: 'Certifications',
    category: 'Achievements',
    details: {
      tag: 'Verified',
      cta: 'View Certifications',
      accolade: 'AWS • Meta • OpenJS',
      rating: 'A',
      year: '2024',
      meta: '3+ credentials',
      description:
        'Industry-recognized certifications validating hands-on expertise across cloud, front-end, and the JavaScript ecosystem.',
    },
  },
  {
    id: 6,
    title: 'Awards',
    category: 'Recognition',
    details: {
      tag: 'Hall of Fame',
      cta: 'View Awards',
      accolade: 'Hackathons & honors',
      rating: 'A+',
      year: '2023',
      meta: 'Recognition',
      description:
        'Hackathon wins and honors earned for building bold, technically ambitious products under pressure.',
    },
  },
];

export const LANDING_FEATURED: readonly LandingFeatured[] = [
  { badge: 'Live Project', title: 'TakesTakesTakes Chess Platform' },
  { badge: 'AI/ML', title: 'Chess Cheat Detection Engine' },
  { badge: 'Web Development', title: 'Neural Portfolio Website' },
];
