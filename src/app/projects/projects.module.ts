import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material';
import {ProjectListComponent} from './project-list.component';
import {ProjectDetailComponent} from './project-detail.component';
import {ProjectsRoutingModule} from './projects-routing.module';



@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        ProjectsRoutingModule
    ],
    declarations: [
        ProjectListComponent,
        ProjectDetailComponent
    ]
})
export class ProjectsModule { }
