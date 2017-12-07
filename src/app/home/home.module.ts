import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {MdButtonModule, MdCardModule, MdGridListModule, MdIconModule, MdSnackBarModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import {HomeRoutingModule} from './home-routing.module';
import {TilesModule} from '../tiles/tiles.module';
import {MdlComponentsModule} from 'mdl-components';
import {ImegCarouselComponent} from './imeg-carousel.component';


@NgModule({
  imports: [
      CommonModule,
      HttpModule,
      TilesModule,
      MdlComponentsModule,
      MdCardModule,
      MdIconModule,
      MdButtonModule,
      MdSnackBarModule,
      MdGridListModule,
      HomeRoutingModule
  ],
  declarations: [HomeComponent, ImegCarouselComponent]
})
export class HomeModule { }
