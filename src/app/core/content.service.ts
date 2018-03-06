import {Injectable} from '@angular/core';
import {Page} from './content-model';
import {HomePage} from '../home/home-model';
import {TagPage} from '../tags/tags-model';
import {Project, ProjectList} from '../projects/project-model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AboutPage} from '../about/about-model';
import {Http} from "@angular/http";
import {ImegSlide, ModxSlideModel} from "../home/slide";




@Injectable()
export class ContentService {
    private pagesUrl = 'http://bluemandle2.com/~imeg/cms/rest/pagesByAlias';
    private navigationUrl = 'http://bluemandle2.com/~imeg/cms/rest/navigation';
    private carouselUrl = 'http://bluemandle2.com/~imeg/cms/rest/carousel';


    constructor(private http: Http) { }

    getNavMenu(): Promise<Page[]> {

      return this.http.get(this.navigationUrl).toPromise().then(response => response.json().results as Page[]);
    }

    getPageObservable(alias: string): Observable<Page> {
        const url = `${this.pagesUrl}?alias=${alias}`;
        return this.http.get(url).map(response => response.json().object as Page);
    }

    getHomePage(id: number): Observable<HomePage> {
        let homeUrl = 'http://bluemandle2.com/~imeg/cms/rest/home';
        const url = `${homeUrl}/${id}`;

        return this.http.get(url).map(response => response.json().object as HomePage);
    }

    getAboutPage(id: number): Observable<AboutPage> {
        let aboutUrl = 'http://bluemandle2.com/~imeg/cms/rest/about';
        const url = `${aboutUrl}/${id}`;
        return this.http.get(url).map(response => response.json().object as AboutPage);
    }

    getPageObservableWithTags(id: number): Observable<TagPage> {
        let tagsUrl = 'http://bluemandle2.com/~imeg/cms/rest/tags';
        const url = `${tagsUrl}/${id}`;

        return this.http.get(url).map(response => response.json().object as TagPage);
    }

    getSlides(id: number): Promise<ModxSlideModel[]> {
        const url = `${this.carouselUrl}/${id}`;
        return this.http.get(url).toPromise().then(response => response.json().object.slides as ModxSlideModel[]);
    }

    getProjectsObservable(tag: string): Observable<ProjectList> {
        let projectsUrl = 'http://bluemandle2.com/~imeg/cms/rest/projects?tag=' + tag;

        // let headers = new Headers({'Content-Type': 'application/json'});
        // let params = new HttpParams().set('tag', tag);

        return this.http.get(projectsUrl).map(response => response.json().object as ProjectList);

        // return this.http.post(projectsUrl, {tag: tag}, headers).map(response => response.json().object.projects as Project[]);
    }

    getProject(id: string): Observable<Project> {
        let projectsUrl = 'http://bluemandle2.com/~imeg/cms/rest/projects';
        const url = `${projectsUrl}/${id}`;

        return this.http.get(url).map(response => response.json().object.projects as Project);

    }

}


