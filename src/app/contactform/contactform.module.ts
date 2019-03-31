import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ContactformComponent } from './contactform.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ContactformComponent,
  ],
  exports: [
    ContactformComponent
  ]
})
export class ContactformModule {
}
