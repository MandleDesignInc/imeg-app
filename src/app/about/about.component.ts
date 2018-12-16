import {Component, OnInit} from '@angular/core';
import {Globals} from '../core/globals';
import {ContentService} from '../core/content.service';
import {AboutPage} from './about-model';
import {NavigationItem} from '../core/content-model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CountUpModule } from 'countup.js-angular2';

@Component({
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent {

    public readonly aboutPage$ = this.contentService.getAboutPage(21);
    public readonly aboutContent$ = this.aboutPage$.pipe(
        map(result => result.page.content),
        map(content => content.match(new RegExp('(?<=\<.*\>)(.*)(?=<)', 'g'))),
        map(tags => tags.map(tag => this.sanitizer.bypassSecurityTrustHtml(tag))));
    public readonly tiles$ = this.aboutPage$.pipe(
        map(result => result.tiles));
    public readonly callouts$ = this.aboutPage$.pipe(
            map(result => result.callouts));

    a = this.aboutPage$.subscribe(x => console.log('PAGE', x));
    b = this.aboutContent$.subscribe(x => console.log('PTAG', x));
    c = this.tiles$.subscribe(x => console.log('TILES', x));
    d = this.callouts$.subscribe(x => console.log('CALLOUTS', x));


    constructor(
        private sanitizer: DomSanitizer,
        private contentService: ContentService,
        public globals: Globals) { }

}
