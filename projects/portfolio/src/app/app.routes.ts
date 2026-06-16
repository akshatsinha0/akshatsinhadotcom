import { Routes } from '@angular/router';
import { DEFAULT_SECTION, SECTION_ROUTE, SectionId } from '@akshat/core';

/** Lazy section routes. Paths come from @akshat/core (single source). */
export const routes: Routes = [
  { path: '', redirectTo: SECTION_ROUTE[DEFAULT_SECTION], pathMatch: 'full' },
  {
    path: SECTION_ROUTE[SectionId.About],
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: SECTION_ROUTE[SectionId.Experiences],
    loadComponent: () => import('./features/experiences/experiences').then((m) => m.Experiences),
  },
  {
    path: SECTION_ROUTE[SectionId.Projects],
    loadComponent: () => import('./features/projects/projects').then((m) => m.Projects),
  },
  {
    path: SECTION_ROUTE[SectionId.Skills],
    loadComponent: () => import('./features/skills/skills').then((m) => m.Skills),
  },
  {
    path: SECTION_ROUTE[SectionId.Certifications],
    loadComponent: () =>
      import('./features/certifications/certifications').then((m) => m.Certifications),
  },
  {
    path: SECTION_ROUTE[SectionId.Awards],
    loadComponent: () => import('./features/awards/awards').then((m) => m.Awards),
  },
  {
    path: SECTION_ROUTE[SectionId.Images],
    loadComponent: () => import('./features/gallery/gallery').then((m) => m.Gallery),
  },
  { path: '**', redirectTo: SECTION_ROUTE[DEFAULT_SECTION] },
];
