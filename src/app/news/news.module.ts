import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsPageComponent } from './newsPage.component';
import { NewsRoutingModule } from './news-routing.module';
import { AnonymousReportFormModule } from '../anonymous-report-form/anonymous-report-form.module';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    AnonymousReportFormModule
  ],
  declarations: [
    NewsComponent,
    NewsPageComponent
  ]
})
export class NewsModule { }
