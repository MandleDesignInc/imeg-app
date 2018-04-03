import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Page, Subpage } from '../core/content-model';
import { Globals } from '../core/globals';
import { ContentService } from '../core/content.service';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  animations: [
    trigger('slideUp', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateY(-100%)'}))
      ])
    ]),
    trigger('tagState', [
      state('out', style({
        backgroundPosition: '0% 0%'
      })),
      state('in',   style({
        backgroundPosition: '50% 0%'
      })),
      transition('out => in', animate('0.5s ease-in-out')),
      transition('in => out', animate('0.5s ease-in-out'))
    ])
  ]
})
export class LibraryComponent implements OnInit {

  page: Page;
  subpages: Subpage[] = [];

  constructor(private contentService: ContentService,
              private globals: Globals,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.contentService.getPageObservable('library').subscribe(page => this.onPageResponse(page), error => this.router.navigate(['/page-not-found']));

  }

  onPageResponse(page: Page): void {
    page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);

    this.contentService.getSubPagesByIdObservable(page.id).subscribe(page => {
      page.subpages.map((subpage: Subpage) => {
        let subpageObj = new Subpage();
        subpageObj.backgroundImage = subpage.backgroundImage;
        subpageObj.title = subpage.title;
        subpageObj.subtitle = subpage.subtitle;
        subpageObj.alias = subpage.alias;
        subpageObj.state = 'out';
        this.subpages.push(subpageObj);
      })
      console.log(this.subpages);
    }, error => {

    });

    this.page = page;
  }

}
