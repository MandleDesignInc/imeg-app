import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'library', component: LibraryComponent },
    ])
  ],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
