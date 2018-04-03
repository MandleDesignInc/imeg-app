import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'videos', component: VideosComponent },
    ])
  ],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
