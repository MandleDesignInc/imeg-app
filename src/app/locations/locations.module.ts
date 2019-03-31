import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { TilesModule } from '../tiles/tiles.module';
import { LocationsCardComponent } from './locations-card.component';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { ContactformModule } from '../contactform/contactform.module';

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
    ContactformModule
  ],
  declarations: [
    LocationsComponent,
    LocationsCardComponent,
  ]
})
export class LocationsModule {
}
