import { Component, OnInit } from '@angular/core';
import { Globals } from '../core/globals';
import { ContentService } from '../core/content.service';
import { Page } from '../core/content-model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public newsLinks: Page[];

  constructor(private contentService: ContentService, public globals: Globals) { }

  ngOnInit(): void {

    // TODO: refactor to handle hardcoded page IDs
    this.contentService.getNewsPageLinks().subscribe((results: Page[]) => { this.newsLinks = results; });


  }

}
