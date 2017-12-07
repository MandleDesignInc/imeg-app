import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdCardModule} from '@angular/material';
import {ProjectListComponent} from './project-list.component';
import {ProjectDetailComponent} from './project-detail.component';
import {ProjectsRoutingModule} from './projects-routing.module';



@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        ProjectsRoutingModule
    ],
    declarations: [
        ProjectListComponent,
        ProjectDetailComponent
    ]
})
export class ProjectsModule { }
