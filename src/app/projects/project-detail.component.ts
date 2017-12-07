import {Component, OnInit} from '@angular/core';
import {Project} from './project-model';
import {Globals} from '../core/globals';
import {ContentService} from '../core/content.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

    project: Project;

    constructor(private contentService: ContentService, public globals: Globals, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {

    }

    ngOnInit(): void {

        this.route.paramMap
            .switchMap((params: ParamMap) => this.contentService.getProject(params.get('id')))
            .subscribe(project => this.onProjectResult(project));
    }

    onProjectResult(project: Project): void {

        if (project.content) project.safeContent = this.sanitizer.bypassSecurityTrustHtml(project.content);

        if (project.sidebarContent) project.safeSidebarContent = this.sanitizer.bypassSecurityTrustHtml(project.sidebarContent);

        this.project = project;
    }




}