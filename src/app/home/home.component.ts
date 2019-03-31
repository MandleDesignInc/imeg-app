import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { HomePage } from './home-model';
import { ContentService } from '../core/content.service';
import { Globals } from '../core/globals';
import { DomSanitizer } from '@angular/platform-browser';
import { ImegSlide, ModxSlideModel } from './slide';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    pageId: number = 1;
    homePage: HomePage;
    slides: ImegSlide[] = [];
    contentReady: boolean;

    /*constructor(private contentService: ContentService, public globals: Globals, private sanitizer: DomSanitizer) { }*/
    constructor(
        private contentService: ContentService,
        private globals: Globals,
        //private route: ActivatedRoute,
        //private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.contentService.getHomePage(1).subscribe(result => this.onHomePage(result));
        this.contentService.getSlides(this.pageId).subscribe(response => this.onSlidesResponse(response));
    }

    onHomePage(homePage: HomePage): void {
        homePage.page.safeContent = this.sanitizer.bypassSecurityTrustHtml(homePage.page.content);
        homePage.tiles.forEach(tile => {
            tile.safeContent = this.sanitizer.bypassSecurityTrustHtml(tile.content);
        });
        //homePage.merger.safeContent = this.sanitizer.bypassSecurityTrustHtml(homePage.merger.content);
        this.homePage = homePage;
        if (this.slides) this.contentReady = true;
    }

    onSlidesResponse(response: ModxSlideModel[]): void {
        // TODO: refactor this
        response.forEach(slide => {
            let imegSlide = new ImegSlide(slide.MIGX_id, slide.caption, this.globals.uploadsPath + slide.image, slide.link);
            this.slides.push(imegSlide);
            /*
            let slideObj = new Slide();
            slideObj.MIGX_id = slide.MIGX_id;
            slideObj.caption = slide.caption;
            slideObj.image = slide.image;
            console.log('state: ' + slideObj.state);
            this.slides.push(slideObj);
            */
        });

        if (this.homePage) this.contentReady = true;
    }
}
