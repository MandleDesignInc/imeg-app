import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProjectListComponent} from './project-list.component';
import {ProjectDetailComponent} from './project-detail.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'projects/:tag', component: ProjectListComponent},
            { path: 'project-details/:alias', component: ProjectDetailComponent}
        ])
    ],
    exports: [RouterModule]
})
export class ProjectsRoutingModule { }
