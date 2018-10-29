import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { PageComponent, CoreValuesComponent, SustainabilityComponent, HistoryComponent, EducationComponent } from './page.component';
import { LeadersComponent } from '../leaders/leaders.component';
import { CommunityComponent } from './community.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'about', component: AboutComponent },
            { path: 'about/corporate-leaders', component: LeadersComponent },
            { path: 'about/team-leaders', component: LeadersComponent },
            { path: 'about/community-involvement', component: CommunityComponent },
            { path: 'about/core-values', component: CoreValuesComponent },
            { path: 'about/our-sustainability-commitment', component: SustainabilityComponent },
            { path: 'about/our-history', component: HistoryComponent },
            { path: 'about/education-and-development', component: EducationComponent },
            { path: 'about/:alias', component: PageComponent },
        ])
    ],
    exports: [RouterModule]
})
export class AboutRoutingModule { }