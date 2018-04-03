import { Component, OnInit } from '@angular/core';
import { Globals } from '../../core/globals';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { Page, Video } from '../../core/content-model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SafePipe } from '../../core/safe.pipe';


@Component({
  selector: 'app-newsletters',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  page: Page;
  videos: Video[] = [];

  constructor(private contentService: ContentService,
              private globals: Globals,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.contentService.getPageObservable('videos').subscribe(page => this.onPageResponse(page), error => this.router.navigate(['/page-not-found']));

  }

  onPageResponse(page: Page): void {
    page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);

    this.contentService.getSubPagesByIdObservable(page.id).subscribe((page: Video) => {
      this.videos = page.subpages;
      console.log(this.videos);
    }, error => {

    });

    this.page = page;
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
