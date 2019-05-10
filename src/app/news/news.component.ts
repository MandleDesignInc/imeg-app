import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../core/globals';
import { ContentService } from '../core/content.service';
import { Page } from '../core/content-model';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public newsLinks: Page[];
  private readonly maxLength = 7;
  private pageIndex = 0;
  public showLoadMore$ = new BehaviorSubject(false);
  subNews: any[];

  constructor(
    private contentService: ContentService,
    public globals: Globals,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.contentService.getNewsPageLinks()
      .subscribe(newsList => {
        this.onNewsLoaded(newsList);
        this.loadMore();
      });
  }

  onNewsLoaded(newsList: any): void {
    // TODO: need refactoring here
    this.newsLinks = newsList;
  }

  public loadMore() {
    const endIndex = (this.pageIndex + 1) * this.maxLength;
    this.subNews = this.newsLinks.slice(0, endIndex);
    const showMore = this.subNews.length < this.newsLinks.length;
    this.showLoadMore$.next(showMore);
    this.pageIndex++;
  }

  fixDate(date) {
    //{{ fixDate(newsItem.publishedon) | date:'MMMM d, yyyy' }}
    //this.fixDate = function(date){
        var returnDate = new Date(date);
        return returnDate;
    //};
  }

}
