import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SpotlightSlide, SpotlightSlideModel } from './tile';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'spotlight-tile',
    templateUrl: './spotlight-tile.component.html',
    styleUrls: ['./spotlight-tile.component.css'],
    animations: [
        trigger('slideUp', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(100%)' }),
                animate(500)
            ]),
            transition('* => void', [
                animate(500, style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ]
})
export class SpotlightTileComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() spotlightData: SpotlightSlideModel[];
    @Input() cmsPath: string;

    intervalId: any;
    timeout: number;
    activeIndex: number = 0;
    spotlightSlides: SpotlightSlide[] = [];
    currentSlides: SpotlightSlide[] = [];
    ready: boolean;

    ngOnInit(): void {
        this.spotlightData.forEach(item => {
            this.spotlightSlides.push(new SpotlightSlide(item.id, item.image));
        });
        this.ready = true;
    }

    ngAfterViewInit(): void {
        this.timeout = 5000;
        this.start();
    }

    ngOnDestroy(): void {
        this.stop();
    }

    next(): void {
        if (this.currentSlides.length > 0) this.currentSlides.pop();
        this.currentSlides.push(this.spotlightSlides[this.activeIndex]);
        this.activeIndex++;
        if (this.activeIndex >= this.spotlightSlides.length) this.activeIndex = 0;
    }

    private _next(): void {
        this.next();
    }

    start(): void {
        if (this.currentSlides.length < 1) this.next();
        this.intervalId = setInterval(this._next.bind(this), this.timeout);
    }

    stop(): void {
        if (this.intervalId) clearInterval(this.intervalId);
    }
}

