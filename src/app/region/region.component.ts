import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Region, Article, News, Projects, Project} from './region-model';
import {ImegSlide, ModxSlideModel} from "../home/slide";
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
  articles: Article;
  pageId: number = 312;
  slides: ImegSlide[] = [];
  contentReady: boolean;

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
            //.subscribe(article => this.onArticleLoaded(articles));
    this.contentService.getSlides(this.pageId).then(response => this.onSlidesResponse(response));
  }

    onRegionLoaded(region: Region): void {

        // TODO: need refactoring here

        //articles.safeContent = this.sanitizer.bypassSecurityTrustHtml(articles.content);
        //this.articles = region.news.articles;
        //region.safeArticle = this.sanitizer.bypassSecurityTrustHtml(articles.content);
        //articles.safeContent = this.sanitizer.bypassSecurityTrustHtml(articles.content);
        region.safeMap = this.sanitizer.bypassSecurityTrustHtml(region.map);
        region.headerBackgroundImage = this.globals.uploadsPath + region.headerImage;
        //region.page.content = this.sanitizer.bypassSecurityTrustHtml(region.page.content);

        this.region = region;

        if (this.slides) this.contentReady = true;

    }

    onSlidesResponse(response: ModxSlideModel[]): void {

        // TODO: refactor this
        response.forEach(slide => {

            let imegSlide = new ImegSlide(slide.MIGX_id, slide.caption, this.globals.uploadsPath + slide.image);
            this.slides.push(imegSlide);
            console.log('state: ' + imegSlide.state);
            console.log('image path: ' + imegSlide.image);

        });

        if (this.region) this.contentReady = true;
    }

    /*onArticleLoaded(articles: Article): void {

        // TODO: need refactoring here
        articles.safeContent = this.sanitizer.bypassSecurityTrustHtml(articles.content);

    }*/
}
