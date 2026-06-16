/** Skills section content (ported from React Skills). Colors reference canonical
 *  brand tokens; logos point at the app's public/ assets. */
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
    logo: '/assets/skills/reactjs.png',
    particles: ['Hooks', 'Context', 'Fibre', 'Suspense'],
  },
  {
    name: 'TypeScript',
    level: 90,
    color: 'var(--ak-paint-typescript-blue)',
    logo: '/assets/skills/typescript.png',
    particles: ['Types', 'Enums', 'Generics', 'Decorators'],
  },
  {
    name: 'Node.js',
    level: 88,
    color: 'var(--ak-paint-moss-600)',
    logo: '/assets/skills/nodejs.png',
    particles: ['Express', 'Streams', 'Cluster', 'NPM'],
  },
  {
    name: 'Qt Creator',
    level: 85,
    color: 'var(--ak-paint-qt-green)',
    logo: '/assets/skills/qt.png',
    particles: ['QML', 'Widgets', 'Signals', 'Multithreading'],
  },
  {
    name: 'AWS',
    level: 82,
    color: 'var(--ak-paint-marigold-550)',
    logo: '/assets/skills/aws.png',
    particles: ['EC2', 'S3', 'Lambda', 'DynamoDB'],
  },
  {
    name: 'GraphQL',
    level: 80,
    color: 'var(--ak-paint-graphql-pink)',
    logo: '/assets/skills/graphql.png',
    particles: ['Schemas', 'Resolvers', 'Apollo', 'Federation'],
  },
];
