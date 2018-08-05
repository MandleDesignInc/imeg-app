import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegionComponent} from './region.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'regions/:alias', component: RegionComponent}
        ])
    ],
    exports: [RouterModule]
})
export class RegionRoutingModule { }
