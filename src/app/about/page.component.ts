import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContentService } from '../core/content.service';
import { Page } from '../core/content-model';
import { Globals } from '../core/globals';
import 'rxjs/add/operator/switchMap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap, map, tap } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    public readonly alias$ = this.route.paramMap.pipe(map(pm => pm.get('alias')));
    public readonly title$ = this.alias$.pipe(
        map((title: string) => title.replace('-', ' ')));
    public readonly content$: Observable<any> = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => this.contentService.getPageObservable(params.get('alias'))),
        map(page => this.onPageResponse(page).content),
        map(content => content.match(new RegExp('(?<=\<.*\>)(.*)(?=<)', 'g'))));
    public readonly safeContent$ = new BehaviorSubject<SafeHtml>('' as SafeHtml);

    id: number;
    page: Page;

    constructor(
        public contentService: ContentService,
        public route: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public globals: Globals,
        public router: Router,
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

@Component({
    selector: 'app-core-values',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class CoreValuesComponent extends PageComponent {

    public readonly alias$ = of('core-values');
    public readonly title$ = of('Core Values');
    public readonly content$ = this.alias$.pipe(
        switchMap(alias => this.contentService.getPageObservable(alias)),
        map(page => this.parseContent(page)));

    private parseContent(page: Page) {
        const headerRegex = new RegExp('([A-Z])([a-z]*)(?=:)', 'g');
        const headers = page.content.match(headerRegex);
        const reparsed = headers.reduce((a, c) => a.replace(c, `<span class="strong">${c}</span>`), page.content);
        console.log('REPARSED', reparsed);
        return this.sanitizer.bypassSecurityTrustHtml(reparsed);
    }
}

@Component({
    selector: 'app-sustainability',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class SustainabilityComponent extends PageComponent {

    public readonly alias$ = of('our-sustainability-commitment');
    public readonly title$ = of('Our Sustainability Commitment');
    public readonly content$ = this.alias$.pipe(
        switchMap(alias => this.contentService.getPageObservable(alias)),
        map(page => this.sanitizer.bypassSecurityTrustHtml(page.content)));

}

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./page.component.css']
})
export class HistoryComponent extends PageComponent {

    public readonly alias$ = of('our-history');
    public readonly title$ = of('Our History');
    public readonly content$ = this.alias$.pipe(
        switchMap(alias => this.contentService.getPageObservable(alias)),
        map(page => page.content.match(new RegExp('(?=\<strong)(.*?)(?=<br)', 'g'))),
        tap(x => console.log('DEBUG', x)));

}

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./page.component.css']
})
export class EducationComponent extends PageComponent {

    public readonly alias$ = of('education-and-development');
    public readonly title$ = of('Education and Development');
    public readonly content$ = this.alias$.pipe(
        switchMap(alias => this.contentService.getPageObservable(alias)),
        map(page => page.content),
        // map(page => page.content.match(new RegExp('(?=\<strong)(.*?)(?=<br)', 'g'))),
        tap(x => console.log('DEBUG', x)));

}


