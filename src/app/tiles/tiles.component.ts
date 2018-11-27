import {Component, Input, OnInit} from '@angular/core';
import {Tile} from './tile';


@Component({
    selector: 'feature-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.css']
})
export class TilesComponent implements OnInit {

    @Input() tiles: Tile[];
    @Input() baseAssetsPath: string;

    show: boolean;
    ngOnInit() {
      this.show = true;
    }

    constructor() { }
}
