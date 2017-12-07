import {SafeHtml} from '@angular/platform-browser';

export class Tile {

    // base tile
    id: number;
    type: string;

    columnSpan: number;
    rowSpan: number;

    title: string;
    subtitle: string;

    link: string;

    // spotlight tile
    spotlight: SpotlightSlideModel[];

    // video tile
    video: string;

    // all other tiles
    backgroundImage: string;
    backgroundColor: string;

    content: string;
    safeContent: SafeHtml;
}

export class SpotlightSlide {

    constructor(public id: string, public  image: string, public state = 'inactive') { }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }

}

export class SpotlightSlideModel {
    index: number;
    id: string;
    image: string;
}