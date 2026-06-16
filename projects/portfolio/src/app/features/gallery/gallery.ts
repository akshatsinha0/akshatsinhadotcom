import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Gallery route (ported from React Images, which rendered null — the standalone
 *  gallery page is served separately). */
@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrl: './gallery.css',
})
export class Gallery {}
