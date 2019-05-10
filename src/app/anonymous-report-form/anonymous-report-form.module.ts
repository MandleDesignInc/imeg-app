import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { AnonymousReportFormComponent } from './anonymous-report-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AnonymousReportFormComponent,
  ],
  exports: [
    AnonymousReportFormComponent
  ]
})
export class AnonymousReportFormModule {
}
