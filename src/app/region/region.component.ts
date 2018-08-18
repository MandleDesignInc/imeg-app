import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Region, Article, News, Projects, Project} from './region-model';
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
  articles: Article[];

  constructor(
      private contentService: ContentService,
      private globals: Globals,
      private route: ActivatedRoute,
      private router: Router,
      private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap
            .switchMap((params: ParamMap) => this.contentService.getRegion(params.get('alias')))
            //.subscribe(result => this.region = result);
            .subscribe(region => this.onRegionLoaded(region));
            //.subscribe(article => this.onArticleLoaded(article));
    }

    onRegionLoaded(region: Region): void {

        // TODO: need refactoring here

        //articles.safeContent = this.sanitizer.bypassSecurityTrustHtml(articles.content);
        //this.articles = region.news.articles;
        //region.safeArticle = this.sanitizer.bypassSecurityTrustHtml(articles.content);
        region.safeMap = this.sanitizer.bypassSecurityTrustHtml(region.map);
        region.headerBackgroundImage = this.globals.uploadsPath + region.headerImage;
        //region.page.content = this.sanitizer.bypassSecurityTrustHtml(region.page.content);

        this.region = region;

    }

    /*onArticleLoaded(regionArticles: regionArticles): void {

        // TODO: need refactoring here
        this.articles = regionArticles.articles;
        this.articlesContent = regionArticles.content;

    }*/
}
