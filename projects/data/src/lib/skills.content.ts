/** Skills section content. Colors reference canonical
 *  brand tokens; logos point at the app's public/ assets. */
import { ASSETS } from '@akshat/core';

export interface Skill {
  readonly name: string;
  readonly level: number;
  readonly color: string;
  readonly logo: string;
  readonly particles: readonly string[];
}

export const SKILLS: readonly Skill[] = [
  {
    name: 'React',
    level: 95,
    color: 'var(--ak-paint-react-cyan)',
    logo: ASSETS.skills.react,
    particles: ['Hooks', 'Context', 'Fibre', 'Suspense'],
  },
  {
    name: 'TypeScript',
    level: 90,
    color: 'var(--ak-paint-typescript-blue)',
    logo: ASSETS.skills.typescript,
    particles: ['Types', 'Enums', 'Generics', 'Decorators'],
  },
  {
    name: 'Node.js',
    level: 88,
    color: 'var(--ak-paint-moss-600)',
    logo: ASSETS.skills.node,
    particles: ['Express', 'Streams', 'Cluster', 'NPM'],
  },
  {
    name: 'Qt Creator',
    level: 85,
    color: 'var(--ak-paint-qt-green)',
    logo: ASSETS.skills.qt,
    particles: ['QML', 'Widgets', 'Signals', 'Multithreading'],
  },
  {
    name: 'AWS',
    level: 82,
    color: 'var(--ak-paint-marigold-550)',
    logo: ASSETS.skills.aws,
    particles: ['EC2', 'S3', 'Lambda', 'DynamoDB'],
  },
  {
    name: 'GraphQL',
    level: 80,
    color: 'var(--ak-paint-graphql-pink)',
    logo: ASSETS.skills.graphql,
    particles: ['Schemas', 'Resolvers', 'Apollo', 'Federation'],
  },
];
