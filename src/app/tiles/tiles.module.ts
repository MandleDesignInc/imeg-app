import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdCardModule, MdGridListModule} from '@angular/material';
import {TilesComponent} from './tiles.component';
import {SpotlightTileComponent} from './spotlight-tile.component';


@NgModule({
    imports: [
        CommonModule,
        MdGridListModule,
        MdCardModule
    ],
    declarations: [
        TilesComponent,
        SpotlightTileComponent
    ],
    exports: [TilesComponent]
})
export class TilesModule { }