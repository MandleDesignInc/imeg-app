import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { NewsComponent } from './news.component';
import { NewsPageComponent } from './newsPage.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'news', component: NewsComponent },
      { path: 'news/:alias', component: NewsPageComponent },
    ])
  ],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
