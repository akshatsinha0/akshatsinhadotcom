import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ASSETS } from '@akshat/core';
import { PROFILE_LINKS } from '@akshat/data';

interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly img: string;
  readonly color: string;
}

/** Footer social links. Colors reference canonical
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
      url: PROFILE_LINKS.linkedin,
      img: ASSETS.social.linkedin,
      color: 'var(--ak-paint-linkedin-blue)',
    },
    {
      name: 'GitHub',
      url: PROFILE_LINKS.github,
      img: ASSETS.social.github,
      color: 'var(--ak-paint-iron)',
    },
    {
      name: 'Resume',
      url: PROFILE_LINKS.resume,
      img: ASSETS.social.resume,
      color: 'var(--ak-color-section-about)',
    },
    {
      name: 'Email',
      url: PROFILE_LINKS.emailHref,
      img: ASSETS.social.gmail,
      color: 'var(--ak-paint-google-red)',
    },
    {
      name: 'LeetCode',
      url: PROFILE_LINKS.leetcode,
      img: ASSETS.social.leetcode,
      color: 'var(--ak-paint-leetcode-amber)',
    },
  ];
}
