import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { ContentService } from '../core/content.service';
import { Project } from './project-model';
import { Globals } from '../core/globals';


@Component({
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

    private readonly middleware: any = [
        filter(content => !!content),
        map((content: string) => this.sanitizer.bypassSecurityTrustHtml(content))] ; 

    public readonly project$: Observable<Project> = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => this.contentService.getProject(params.get('id'))));

    public readonly mainContent$ = this.project$.pipe(
        map(project => project.content), 
        filter(content => !!content),
        map((content: string) => this.sanitizer.bypassSecurityTrustHtml(content)));

    public readonly sidebarContent$ = this.project$.pipe(
        map(project => project.sidebarContent),
        filter(content => !!content),
        map((content: string) => this.sanitizer.bypassSecurityTrustHtml(content)));
    
    a = this.project$.subscribe(x => console.log('SERVICES:', x.tags.services));
    b = this.mainContent$.subscribe(x => console.log('LEFT', x));

    constructor(
        private contentService: ContentService,
        public globals: Globals,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer) { }

    ngOnInit(): void { }

}
