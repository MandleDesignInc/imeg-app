import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { MatGridListModule } from '@angular/material';
import { CommunityComponent } from './community.component';
import { PageComponent, CoreValuesComponent, SustainabilityComponent, HistoryComponent, EducationComponent } from './page.component';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule,
        MatGridListModule,
    ],
    declarations: [
        AboutComponent,
        CommunityComponent,
        PageComponent,
        CoreValuesComponent,
        SustainabilityComponent,
        HistoryComponent,
        EducationComponent,
    ]
})
export class AboutModule { }
