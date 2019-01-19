import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../core/globals';
import { ContentService } from '../core/content.service';
import { Page } from '../core/content-model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public newsLinks: Page[];
  private readonly maxLength = 15;
  private pageIndex = 0;
  public showLoadMore$ = new BehaviorSubject(false);

  constructor(private contentService: ContentService, public globals: Globals) { }

  ngOnInit(): void {

    // TODO: refactor to handle hardcoded page IDs
    this.contentService.getNewsPageLinks().subscribe((results: Page[]) => { this.newsLinks = results; });


  }

}
