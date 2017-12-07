import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TagComponent} from './tag.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'services', component: TagComponent },
            { path: 'markets', component: TagComponent }
        ])
    ],
    exports: [RouterModule]
})
export class TagRoutingModule { }