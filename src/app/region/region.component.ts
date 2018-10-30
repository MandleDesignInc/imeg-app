import { Component, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Region } from './region-model';
import { Globals } from '../core/globals';
import { ContentService } from '../core/content.service';
import { Observable } from 'rxjs';
import { pluck, switchMap, map, filter, tap, first } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { slideLeft } from '../core/animations';

@Component({
    selector: 'app-region',
    templateUrl: './region.component.html',
    styleUrls: ['./region.component.css']
})
export class RegionComponent implements AfterContentInit {

    static readonly baseUrl = 'http://bluemandle2.com/~imeg/cms/assets/uploads/';

    private readonly alias$: Observable<string> = this.route.params.pipe(pluck('alias'));
    public readonly region$: Observable<Region> = this.alias$.pipe(
        switchMap(alias => this.contentService.getRegion(alias)),
        filter(x => !!x));
    public pageId$: Observable<any> = this.region$.pipe(
        map(p => p.id),
        filter(x => !!x));
    public readonly spotlightProjects$ = this.pageId$.pipe(
        switchMap(id => this.contentService.getSlides(id)),
        map(slides => slides.map(slide => `${RegionComponent.baseUrl}/${slide.image}`)));
    public readonly bgImgUrl$ = this.region$.pipe(
        map(region => `url(${RegionComponent.baseUrl}${region.headerImage})`));
    public readonly map$ = this.region$.pipe(
        map(region => region.map.replace('width="640"', 'width="100%"')),
        map(map => map.replace('height="480"', 'height="100%"')),
        map(map => this.sanitizer.bypassSecurityTrustHtml(map)));
    private _index = undefined;

    b = this.region$.subscribe(x => console.log('region', x));
    c = this.spotlightProjects$.subscribe(x => console.log('SP', x));

    constructor(
        public globals: Globals,
        private contentService: ContentService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) { }

    public ngAfterContentInit() {
        const slides: any = document.querySelectorAll('img.slide');
        const [slide1, slide2] = slides;
        this.spotlightProjects$
            .subscribe(slides => this.initAnimations(slides, slide1, slide2));
    }

    private initAnimations(slides, slide1, slide2) {
        if (slides.length === 0) return;
        setInterval(() => {
            const i = this.getIndex() % slides.length;
            if (slides.length > 1) {
                slide1.src = slides[i];
                slide2.src = i < slides.length - 1 ? slides[i + 1] : slides[0];
                slideLeft(slide1, slide2);
            } else {
                slide1.src = slides[0];
            }
        }, 3000);
    }

    private getIndex() {
        this._index = this._index === undefined ? 0 : this._index + 1;
        return this._index;
    }
    
}
