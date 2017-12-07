import {Component, Input} from '@angular/core';
import {Tile} from './tile';


@Component({
    selector: 'feature-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.css']
})
export class TilesComponent {

    @Input() tiles: Tile[];
    @Input() baseAssetsPath: string;

    constructor() { }
}