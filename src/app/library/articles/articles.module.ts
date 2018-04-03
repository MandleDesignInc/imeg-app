import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';

@NgModule({
  imports: [
    CommonModule,
    ArticlesRoutingModule,
  ],
  declarations: [ArticlesComponent]
})
export class ArticlesModule { }
