import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContentService } from '../core/content.service';
import { Page } from '../core/content-model';
import { Globals } from '../core/globals';
import 'rxjs/add/operator/switchMap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap, map } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    public readonly alias$ = this.route.paramMap.pipe(map(pm => pm.get('alias')));
    public readonly content$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => this.contentService.getPageObservable(params.get('alias'))),
        map(page => this.onPageResponse(page).content),
        map(content => content.match(new RegExp('(?<=\<.*\>)(.*)(?=<)', 'g'))));

    public readonly safeContent$ = new BehaviorSubject<SafeHtml>('' as SafeHtml);

    a = this.content$.subscribe(x => console.log('CONTENT', x));
    b = this.alias$.subscribe(x => console.log('ALIAS', x));

    id: number;
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

    onPageResponse(page: Page): Page {
        const sc = this.sanitizer.bypassSecurityTrustHtml(page.content);
        page.safeContent = sc;
        this.safeContent$.next(sc);
        page.longtitle = page.longtitle;
        this.page = page;
        return page;
    }

    getId(alias: string): number {
        let id = 0;
        this.globals.navigationItems.forEach(item => {
            if (item.alias === alias) id = item.id;
        });

        return id;
    }

}
