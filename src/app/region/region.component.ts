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

  region: Region;

  constructor(
      private contentService: ContentService,
      private globals: Globals,
      private route: ActivatedRoute,
      private router: Router,
      private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap
            .switchMap((params: ParamMap) => this.contentService.getRegion(params.get('id')))
            .subscribe(region => this.onProjectResult(region));
  }

  onProjectResult(region: Region): void {

      if (region.content) region.safeContent = this.sanitizer.bypassSecurityTrustHtml(region.content);

      if (region.sidebarContent) region.safeSidebarContent = this.sanitizer.bypassSecurityTrustHtml(region.sidebarContent);

      this.region = region;
  }

}
