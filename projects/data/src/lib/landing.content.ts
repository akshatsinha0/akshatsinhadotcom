/** Landing-page content. */

export interface LandingCard {
  readonly id: number;
  readonly title: string;
  readonly category: string;
}

export interface LandingFeatured {
  readonly badge: string;
  readonly title: string;
}

export const LANDING_CGPA = '8.84/10';

export const LANDING_HERO_META: readonly string[] = [
  '2024',
  '15+ Projects',
  '3+ Certifications',
  'React • Node.js • Python',
];

export const LANDING_CARDS: readonly LandingCard[] = [
  { id: 1, title: 'About Me', category: 'Introduction' },
  { id: 2, title: 'Projects', category: 'Showcase' },
  { id: 3, title: 'Experience', category: 'Professional' },
  { id: 4, title: 'Skills', category: 'Technical' },
  { id: 5, title: 'Certifications', category: 'Achievements' },
  { id: 6, title: 'Awards', category: 'Recognition' },
];

export const LANDING_FEATURED: readonly LandingFeatured[] = [
  { badge: 'Live Project', title: 'TakesTakesTakes Chess Platform' },
  { badge: 'AI/ML', title: 'Chess Cheat Detection Engine' },
  { badge: 'Web Development', title: 'Neural Portfolio Website' },
];
