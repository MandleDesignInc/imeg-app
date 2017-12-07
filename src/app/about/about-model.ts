import {Tile} from '../tiles/tile';
import {Page} from '../core/content-model';

export class AboutPage {
    page: Page;
    tiles: AboutTile[];
}

export class AboutTile {

    id: number;
    type: string;

    alias: string;

    columnSpan: number;
    rowSpan: number;

    title: string;
    subtitle: string;


    // all other tiles
    backgroundImage: string;
    backgroundColor: string;

}