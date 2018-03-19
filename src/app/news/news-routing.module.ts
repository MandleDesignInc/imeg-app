import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageComponent } from '../page/page.component';
import { NewsComponent } from './news.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'news', component: NewsComponent },
      { path: 'news/:alias', component: PageComponent },
    ])
  ],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
