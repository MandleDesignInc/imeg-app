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
    breakpoint: number;

    show: boolean;
    ngOnInit() {
      this.show = true;
      this.breakpoint = (window.innerWidth <= 420) ? 1 : 4;
    }
    onResize(event) {
      this.breakpoint = (event.target.innerWidth <= 420) ? 1 : 4;
    }

    tileCol(i) {
      var colwidth = 1;
      if(window.innerWidth <= 420) {
        colwidth = 1;
      } else {
        colwidth = this.tiles[i].columnSpan;
      }
      return colwidth;
    }

    constructor() { }
}
