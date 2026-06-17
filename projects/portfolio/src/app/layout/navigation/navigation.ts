import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ASSETS, openInNewTab, SECTION_COLORS, SECTION_ROUTE, SectionId } from '@akshat/core';
import { Tooltip } from '@akshat/shared-ui';

interface NavItem {
  readonly id: SectionId;
  readonly label: string;
  readonly icon: string;
  readonly color: string;
  readonly route: string;
  readonly isGallery?: boolean;
}

/** Side navigation. Section ids, routes and
 *  colors come from @akshat/core — nothing hardcoded here. */
@Component({
  selector: 'app-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Tooltip],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  protected readonly isExpanded = signal(false);

  protected readonly sections: readonly NavItem[] = [
    this.item(SectionId.About, 'About Me', ASSETS.nav.about),
    this.item(SectionId.Experiences, 'Experience', ASSETS.nav.experiences),
    this.item(SectionId.Projects, 'Projects', ASSETS.nav.projects),
    this.item(SectionId.Skills, 'Skills', ASSETS.nav.skills),
    this.item(SectionId.Certifications, 'Certifications', ASSETS.nav.certifications),
    this.item(SectionId.Awards, 'Awards', ASSETS.nav.awards),
    { ...this.item(SectionId.Images, 'Images', ''), isGallery: true },
  ];

  protected toggle(): void {
    this.isExpanded.update((v) => !v);
  }

  /** Gallery opens in a new tab (matching the original); other sections route in-app. */
  protected onItemClick(section: NavItem): void {
    this.isExpanded.set(false);
    if (section.isGallery) openInNewTab(section.route);
  }

  private item(id: SectionId, label: string, icon: string): NavItem {
    return {
      id,
      label,
      icon,
      color: SECTION_COLORS[id],
      route: '/' + SECTION_ROUTE[id],
    };
  }
}
