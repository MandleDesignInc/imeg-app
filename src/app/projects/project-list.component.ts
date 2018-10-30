import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../core/content.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Project, ProjectList } from './project-model';
import { Globals } from '../core/globals';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-projects',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
    projects: Project[];
    subProjects: Project[];
    headerImage: string;
    tag: string;
    safeTextElement: SafeHtml;
    private readonly maxLength = 15;
    private pageIndex = 0;
    public showLoadMore$ = new BehaviorSubject(false);

    constructor(
        private contentService: ContentService,
        public globals: Globals,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer) { }

    ngOnInit(): void {

        this.route.paramMap
            .switchMap((params: ParamMap) => this.contentService.getProjectsObservable(params.get('tag')))
            .subscribe(projectList => {
                this.onProjectsLoaded(projectList);
                this.loadMore();
            });
        let mTag = this.route.snapshot.paramMap.get('tag');
        console.log('selected tag: ' + mTag);
    }

    onProjectsLoaded(projectList: ProjectList): void {
        // TODO: need refactoring here
        this.projects = projectList.projects;
        this.headerImage = projectList.headerImage;
        this.tag = projectList.tag;
        this.safeTextElement = this.sanitizer.bypassSecurityTrustHtml(projectList.content);
    }

    public loadMore() {
        const endIndex = (this.pageIndex + 1) * this.maxLength;
        this.subProjects = this.projects.slice(0, endIndex);
        const showMore = this.subProjects.length < this.projects.length;
        this.showLoadMore$.next(showMore);
        this.pageIndex++;
    }

}
