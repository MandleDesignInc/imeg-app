import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AboutComponent} from './about.component';
import {PageComponent} from '../page/page.component';
import {LeadersComponent} from '../leaders/leaders.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'about', component: AboutComponent },
            { path: 'about/corporate-leaders', component: LeadersComponent},
            { path: 'about/team-leaders', component: LeadersComponent},
        ])
    ],
    exports: [RouterModule]
})
export class AboutRoutingModule { }