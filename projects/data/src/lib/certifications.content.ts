/** Certifications content. Ribbon colors use
 *  canonical tokens; logos/holograms point at the app's public/ assets. */
import { ASSETS } from '@akshat/core';
export interface Certification {
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly code: string;
  readonly logo: string;
  readonly ribbonColor: string;
  readonly hologram: string;
}

export interface MoreCertification {
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly code: string;
  readonly logo: string;
}

export const CERTIFICATIONS: readonly Certification[] = [
  {
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2024',
    code: 'AWS-DEV-1234',
    logo: ASSETS.certs.awsLogo,
    ribbonColor: 'var(--ak-paint-marigold-550)',
    hologram: ASSETS.certs.awsHologram,
  },
  {
    title: 'React Professional Certification',
    issuer: 'Meta',
    date: '2023',
    code: 'META-REACT-5678',
    logo: ASSETS.certs.metaLogo,
    ribbonColor: 'var(--ak-paint-teal-700)',
    hologram: ASSETS.certs.metaHologram,
  },
  {
    title: 'Node.js Master Certification',
    issuer: 'OpenJS Foundation',
    date: '2023',
    code: 'OJS-NODE-9012',
    logo: ASSETS.certs.openjsLogo,
    ribbonColor: 'var(--ak-paint-moss-600)',
    hologram: ASSETS.certs.openjsHologram,
  },
];

export const MORE_CERTIFICATIONS: readonly MoreCertification[] = [
  {
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    code: 'AWS-SA-1122',
    logo: ASSETS.certs.awsLogo,
  },
  {
    title: 'Docker Certified Associate',
    issuer: 'Docker',
    date: '2022',
    code: 'DOCKER-DCA-3344',
    logo: ASSETS.certs.awsLogo,
  },
  {
    title: 'Kubernetes CKAD',
    issuer: 'The Linux Foundation',
    date: '2022',
    code: 'LF-CKAD-5566',
    logo: ASSETS.certs.awsLogo,
  },
  {
    title: 'Google Professional Cloud Developer',
    issuer: 'Google Cloud',
    date: '2021',
    code: 'GCP-PCD-7788',
    logo: ASSETS.certs.awsLogo,
  },
  {
    title: 'Azure Developer Associate',
    issuer: 'Microsoft',
    date: '2021',
    code: 'AZURE-DA-9900',
    logo: ASSETS.certs.awsLogo,
  },
];
