import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PresentationsComponent } from './presentations.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'presentations', component: PresentationsComponent },
    ])
  ],
  exports: [RouterModule]
})
export class PresentationsRoutingModule { }
