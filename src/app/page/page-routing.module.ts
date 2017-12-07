import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PageComponent} from './page.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: ':alias', component: PageComponent },
            { path: '**', component: PageComponent}
            // { path: '**', canActivate: [RouteLoader], component: PageNotFoundComponent}
        ])
    ],
    exports: [RouterModule]
})
export class PageRoutingModule { }
