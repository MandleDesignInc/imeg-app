import { Component, OnInit } from '@angular/core';
import { NavigationItem, Page } from './core/content-model';
import { ContentService } from './core/content.service';
import { Globals } from './core/globals';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatSnackBar } from '@angular/material';

@Component({
    selector: 'imeg-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    thisYear: number = (new Date()).getFullYear();
    searchContent: any;

    constructor(
        public snackBar: MatSnackBar,
        private contentService: ContentService,
        public globals: Globals,
        private iconReg: MatIconRegistry,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.iconReg.addSvgIcon('facebook', this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook-logo.svg'));
        this.iconReg.addSvgIcon('twitter', this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/twitter-logo.svg'));
        this.iconReg.addSvgIcon('linked-in', this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/linkedin-logo.svg'));
        this.contentService.getNavMenu().then(results => this.onNavigationItems(results));

        this.searchContent = this.sanitizer.bypassSecurityTrustHtml(`<gcse:search></gcse:search>`);
    }

    // TODO: refactor to get this logic out of component
    onNavigationItems(results: Page[]) {
        results.forEach(item => {
            // TODO: need to see if other components need this, refactor, and remove
            if (!item.hidemenu) {
                this.globals.navigationItems.push(new NavigationItem(item.id, item.alias, item.menutitle, item.template));
            }
            if (!item.hidemenu && item.parent === 0) {
                this.globals.rootMenu.push(new NavigationItem(item.id, item.alias, item.menutitle, item.template));
            }
        });
    }

    search(query: string): void {
        let msg = 'You searched for: "' + query + '"';
        this.snackBar.open(msg);
    }

}
