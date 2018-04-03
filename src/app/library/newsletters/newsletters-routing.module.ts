import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewslettersComponent } from './newsletters.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'newsletters', component: NewslettersComponent },
    ])
  ],
  exports: [RouterModule]
})
export class NewslettersRoutingModule { }
