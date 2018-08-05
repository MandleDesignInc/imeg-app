import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Region} from './region-model';
import {Page} from '../core/content-model';
import {Globals} from '../core/globals';
import {ContentService} from '../core/content.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  page: Page;

  constructor(
      private contentService: ContentService,
      private globals: Globals,
      private route: ActivatedRoute,
      private router: Router,
      private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

      this.route.paramMap
              .switchMap((params: ParamMap) => this.contentService.getPageObservable(params.get('alias')))
              .subscribe(page => this.onPageResponse(page), error => this.router.navigate(['/page-not-found']));

  }

  onPageResponse(page: Page): void {
      page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);
      page.longtitle = page.longtitle;

      this.page = page;
  }

}
