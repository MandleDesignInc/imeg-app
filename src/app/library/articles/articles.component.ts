import { Component, OnInit } from '@angular/core';
import { Globals } from '../../core/globals';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, Page, Video } from '../../core/content-model';
import { ContentService } from '../../core/content.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-newsletters',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  page: Page;
  articles: Article[];

  constructor(private contentService: ContentService,
              private globals: Globals,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.contentService.getPageObservable('articles').subscribe(page => this.onPageResponse(page), error => this.router.navigate(['/page-not-found']));

  }

  onPageResponse(page: Page): void {
    page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);

    this.contentService.getSubPagesByIdObservable(page.id).subscribe((page: Article) => {
      this.articles = page.subpages;
      console.log(this.articles);
    }, error => {

    });

    this.page = page;
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }

}
