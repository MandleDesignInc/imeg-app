import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import {TilesModule} from '../tiles/tiles.module';
import { ImegLocationsComponent } from './locations-pods.component';
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
    LocationsRoutingModule,
  ],
  declarations: [
    LocationsComponent,
    ImegLocationsComponent,
  ]
})
export class LocationsModule {
}
