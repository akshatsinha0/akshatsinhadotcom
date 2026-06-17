/** Canonical asset paths. Single source for everything served from public/assets.
 *  Change a filename or the base once here and every callsite follows. */
const ASSET_BASE = '/assets';

export const ASSETS = {
  photo: `${ASSET_BASE}/AKSHATSINHAPHOTO.jpg`,
  trophy: `${ASSET_BASE}/winningtrophyicon.png`,
  resumePdf: `${ASSET_BASE}/resume.pdf`,

  social: {
    linkedin: `${ASSET_BASE}/3d-icons/LINKEDIN3D.png`,
    github: `${ASSET_BASE}/3d-icons/GITHUB3D.png`,
    resume: `${ASSET_BASE}/3d-icons/RESUME3D.png`,
    gmail: `${ASSET_BASE}/3d-icons/GMAIL3D.png`,
    leetcode: `${ASSET_BASE}/3d-icons/LEETCODE3D.png`,
  },

  nav: {
    about: `${ASSET_BASE}/3d-icons/nav/ABOUTME3D.png`,
    experiences: `${ASSET_BASE}/3d-icons/nav/EXPERIENCE3D.png`,
    projects: `${ASSET_BASE}/3d-icons/nav/PROJECTS3D.png`,
    skills: `${ASSET_BASE}/3d-icons/nav/SKILLS3D.png`,
    certifications: `${ASSET_BASE}/3d-icons/nav/CERTIFICATIONS3D.png`,
    awards: `${ASSET_BASE}/3d-icons/nav/STARS3D.png`,
  },

  skills: {
    react: `${ASSET_BASE}/skills/reactjs.png`,
    typescript: `${ASSET_BASE}/skills/typescript.png`,
    node: `${ASSET_BASE}/skills/nodejs.png`,
    qt: `${ASSET_BASE}/skills/qt.png`,
    aws: `${ASSET_BASE}/skills/aws.png`,
    graphql: `${ASSET_BASE}/skills/graphql.png`,
  },

  certs: {
    awsLogo: `${ASSET_BASE}/certs/aws-cert-logo.png`,
    metaLogo: `${ASSET_BASE}/certs/meta-cert-logo.png`,
    openjsLogo: `${ASSET_BASE}/certs/openjs-cert-logo.png`,
    awsHologram: `${ASSET_BASE}/certs/aws-hologram-pattern.png`,
    metaHologram: `${ASSET_BASE}/certs/meta-hologram-pattern.png`,
    openjsHologram: `${ASSET_BASE}/certs/openjs-hologram-pattern.png`,
  },

  projects: {
    takesTakesTakesPrimary: `${ASSET_BASE}/takestakestakesproject.png`,
    takesTakesTakesSecondary: `${ASSET_BASE}/takestakestakes2.png`,
  },
} as const;
