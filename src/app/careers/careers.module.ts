import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { CareersComponent } from './careers.component';
import { CareersRoutingModule } from './careers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    CareersRoutingModule,
  ],
  declarations: [CareersComponent]
})
export class CareersModule { }
