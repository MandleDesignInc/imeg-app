import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../core/content.service';
import { catchError, map, filter } from 'rxjs/operators';
import { Page } from '../core/content-model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
  providers: [
    ContentService,
  ]
})
export class CommunityComponent {

  private static alias = 'community-involvement';

  public readonly content$ = this.contentService.getPageObservable(CommunityComponent.alias).pipe(
    catchError(() => this.router.navigate(['/page-not-found'])),
    filter(x => !!x),
    map((page: Page) => page.content.match(new RegExp('(?<=\<p\>)(.*)(?=<)', 'g'))));

  public readonly images$ = this.contentService.getGallery();

  a = this.content$.subscribe(x => console.log('CONTENT', x));
  b = this.images$.subscribe(x => console.log('IMAGES', x));


  constructor(
    private contentService: ContentService,
    private router: Router) { }

  public clickHandler(index: number) {
    this.router.navigate([{ outlets: { modal: `image/${index}` } }]);
  }
}