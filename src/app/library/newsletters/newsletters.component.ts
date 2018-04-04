import { Component, OnInit } from '@angular/core';
import { Globals } from '../../core/globals';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { Article, Newsletter, Page } from '../../core/content-model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css']
})
export class NewslettersComponent implements OnInit {

  page: Page;
  newsletters: Newsletter[];

  constructor(private contentService: ContentService,
              private globals: Globals,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.contentService.getPageObservable('newsletters').subscribe(page => this.onPageResponse(page), error => this.router.navigate(['/page-not-found']));

  }

  onPageResponse(page: Page): void {
    page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);

    this.contentService.getSubPagesByIdObservable(page.id).subscribe((page: Newsletter) => {
      this.newsletters = page.subpages;
      console.log(this.newsletters);
    }, error => {

    });

    this.page = page;
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

}
