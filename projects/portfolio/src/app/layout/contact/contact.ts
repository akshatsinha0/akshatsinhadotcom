import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RESUME_URL } from '@akshat/data';

interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly img: string;
  readonly color: string;
}

/** Footer social links (ported from React Contact). Colors reference canonical
 *  paint tokens; icon paths point at the app's public/ assets. */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly socialLinks: readonly SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/akshat-sinha-248805214',
      img: '/assets/3d-icons/LINKEDIN3D.png',
      color: 'var(--ak-paint-linkedin-blue)',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/akshatsinha0',
      img: '/assets/3d-icons/GITHUB3D.png',
      color: 'var(--ak-paint-iron)',
    },
    {
      name: 'Resume',
      url: RESUME_URL,
      img: '/assets/3d-icons/RESUME3D.png',
      color: 'var(--ak-color-section-about)',
    },
    {
      name: 'Email',
      url: 'mailto:akshatsinhasramhardy@gmail.com',
      img: '/assets/3d-icons/GMAIL3D.png',
      color: 'var(--ak-paint-google-red)',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/akshatsinha0/',
      img: '/assets/3d-icons/LEETCODE3D.png',
      color: 'var(--ak-paint-leetcode-amber)',
    },
  ];
}
