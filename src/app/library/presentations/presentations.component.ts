import { Component, OnInit } from '@angular/core';
import { Globals } from '../../core/globals';
import { ActivatedRoute, Router } from '@angular/router';
import { Page, Video } from '../../core/content-model';
import { ContentService } from '../../core/content.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit {

  page: Page;
  presentations: Video[];

  constructor(private contentService: ContentService,
              private globals: Globals,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.contentService.getPageObservable('presentations').subscribe(page => this.onPageResponse(page), error => this.router.navigate(['/page-not-found']));

  }

  onPageResponse(page: Page): void {
    page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);

    this.contentService.getSubPagesByIdObservable(page.id).subscribe((page: Video) => {
      this.presentations = page.subpages;
      console.log(this.presentations);
    }, error => {

    });

    this.page = page;
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
