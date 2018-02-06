import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {TilesModule} from '../tiles/tiles.module';
import {ImegCarouselComponent} from './imeg-carousel.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatSnackBarModule} from "@angular/material";


@NgModule({
  imports: [
    CommonModule,
    TilesModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatGridListModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, ImegCarouselComponent]
})
export class HomeModule {
}
