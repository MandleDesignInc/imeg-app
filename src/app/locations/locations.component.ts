import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {LocationsPage} from './locations-model';
import {ContentService} from '../core/content.service';
import {Globals} from '../core/globals';
import {DomSanitizer} from '@angular/platform-browser';
import {ImegLocations, ModxLocationModel} from "./location";


@Component({
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

    pageId: number = 27;

    locationsPage: LocationsPage;

    locations: ImegLocations[] = [];

    contentReady: boolean;

    constructor(private contentService: ContentService, public globals: Globals, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {

        this.contentService.getLocationsPage(this.pageId).subscribe(result => this.onLocationsPage(result));

        this.contentService.getLocations(this.pageId).then(response => this.onLocationsResponse(response));
    }

    onLocationsPage (locationsPage: LocationsPage): void {

        locationsPage.page.safeContent = this.sanitizer.bypassSecurityTrustHtml(locationsPage.page.content);

        locationsPage.tiles.forEach(tile => {
            tile.safeContent = this.sanitizer.bypassSecurityTrustHtml(tile.content);
        });

        this.locationsPage = locationsPage;

        if (this.locations) this.contentReady = true;
    }

    onLocationsResponse(response: ModxLocationModel[]): void {

        // TODO: refactor this
        response.forEach(location => {

            let imegLocations = new ImegLocations(location.MIGX_id, location.city, location.info, this.globals.uploadsPath + location.image);
            this.locations.push(imegLocations);
            console.log('locations: ' + imegLocations);
            //console.log('state: ' + imegSlide.state);
            //console.log('image path: ' + imegLocations.image);


            /*
            let slideObj = new Slide();
            slideObj.MIGX_id = slide.MIGX_id;
            slideObj.caption = slide.caption;
            slideObj.image = slide.image;

            console.log('state: ' + slideObj.state);

            this.slides.push(slideObj);
            */
        });

        if (this.locationsPage) this.contentReady = true;
    }
}
