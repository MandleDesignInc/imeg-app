import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { PageComponent } from '../../page/page.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'articles', component: ArticlesComponent },
      { path: 'articles/:alias', component: PageComponent },
    ])
  ],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
