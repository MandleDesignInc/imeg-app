import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewslettersComponent } from './newsletters.component';
import { PageComponent } from '../../page/page.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'newsletters', component: NewslettersComponent },
      { path: 'newsletters/:alias', component: PageComponent },
    ])
  ],
  exports: [RouterModule]
})
export class NewslettersRoutingModule { }
