import {Component, OnInit} from '@angular/core';
import {Globals} from '../core/globals';
import {ContentService} from '../core/content.service';
import {AboutPage} from './about-model';
import {NavigationItem} from '../core/content-model';

@Component({
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit {

    aboutPage: AboutPage;

    constructor(private contentService: ContentService, public globals: Globals) { }

    ngOnInit(): void {

        // TODO: refactor to handle hardcoded page IDs
        this.contentService.getAboutPage(21).subscribe(result => this.aboutPage = result);
    }

}