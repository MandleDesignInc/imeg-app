import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ContentService} from '../core/content.service';
import {Page} from '../core/content-model';
import {Globals} from '../core/globals';
import 'rxjs/add/operator/switchMap';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
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

    onPageResponse(page: Page): void {
        page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);

        this.page = page;
    }

    getId(alias: string): number {

        let id = 0;

        this.globals.navigationItems.forEach(item => {
            if (item.alias === alias) id = item.id;
        });

        return id;
    }

}
