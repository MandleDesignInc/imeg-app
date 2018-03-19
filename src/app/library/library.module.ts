import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    LibraryRoutingModule,
  ],
  declarations: [LibraryComponent]
})
export class LibraryModule { }
