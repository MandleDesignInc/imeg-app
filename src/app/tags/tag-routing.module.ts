import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { ServicesComponent, MarketsComponent } from './tag.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'services', component: ServicesComponent },
            { path: 'markets', component: MarketsComponent }
        ])
    ],
    exports: [RouterModule]
})
export class TagRoutingModule { }