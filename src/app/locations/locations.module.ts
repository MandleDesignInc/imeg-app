import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsComponent } from './locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { ImegLocationsComponent } from './locations-pods.component';

@NgModule({
  imports: [
    CommonModule,
    LocationsRoutingModule,
  ],
  declarations: [
    LocationsComponent,
    ImegLocationsComponent,
  ]
})
export class LocationsModule { }
