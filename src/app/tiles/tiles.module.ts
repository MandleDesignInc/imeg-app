import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatGridListModule} from '@angular/material';
import {TilesComponent} from './tiles.component';
import {SpotlightTileComponent} from './spotlight-tile.component';


@NgModule({
    imports: [
        CommonModule,
        MatGridListModule,
        MatCardModule
    ],
    declarations: [
        TilesComponent,
        SpotlightTileComponent
    ],
    exports: [TilesComponent]
})
export class TilesModule { }
