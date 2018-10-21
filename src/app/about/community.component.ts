import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../core/content.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent {

  // public readonly content$ = this.route.params.pipe(
  //   switchMap(params => this.contentService.getPageObservable(params.alias)),
  //   catchError(page => this.onPageResponse(page), error => this.router.navigate(['/page-not-found']),
  //   map(content => this.sanitizer.bypassSecurityTrustHtml(content))))

  

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService) { }
  
}