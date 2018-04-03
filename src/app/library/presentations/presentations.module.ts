import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationsRoutingModule } from './presentations-routing.module';
import { PresentationsComponent } from './presentations.component';

@NgModule({
  imports: [
    CommonModule,
    PresentationsRoutingModule,
  ],
  declarations: [PresentationsComponent]
})
export class PresentationsModule { }
