import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { of } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { map, pluck, catchError } from 'rxjs/operators';

import { Page } from './content-model';
import { HomePage } from '../home/home-model';
import { TagPage } from '../tags/tags-model';
import { Project, ProjectList } from '../projects/project-model';
import { AboutPage } from '../about/about-model';
import { ModxSlideModel } from '../home/slide';
import { LocationsPage } from '../locations/locations-model';
import { ModxLocationModel } from '../locations/location';
import { Region } from '../region/region-model';

@Injectable()
export class ContentService {
    private static readonly domain = 'https://imegcorp.com';
    private static readonly galleryPath = 'cms/rest/gallery';
    private static readonly galleryQuery = 'id=39';
    private static readonly imagePath = 'cms/assets/uploads';

    private pagesUrl = 'https://imegcorp.com/cms/rest/pagesByAlias';
    private subPagesUrl = 'https://imegcorp.com/cms/rest/subpagesByParentId';
    private navigationUrl = 'https://imegcorp.com/cms/rest/navigation';
    private carouselUrl = 'https://imegcorp.com/cms/rest/carousel';
    private locationsUrl = 'https://imegcorp.com/cms/rest/locations';
    //private projectsUrl = 'https://imegcorp.com/cms/rest/projects';
    private projectsUrl = 'https://imegcorp.com/cms/rest/projectsByAlias';


    constructor(private http: Http) { }

    getNavMenu(): Promise<Page[]> {
        return this.http.get(this.navigationUrl).toPromise().then(response => response.json().results as Page[]);
    }

    getPageObservable(alias: string): Observable<Page> {
        const url = `${this.pagesUrl}?alias=${alias}`;
        return this.http.get(url).pipe(map(response => response.json().object as Page));
    }

    getSubPagesByIdObservable(id: number): Observable<any> {
        const url = `${this.subPagesUrl}/${id}`;
        return this.http.get(url).pipe(map(response => response.json().object as any));
    }

    /*getHomePage(id: number): Observable<HomePage> {
        let homeUrl = 'https://imegcorp.com/cms/rest/home';
        const url = `${homeUrl}/${id}`;
        return this.http.get(url).pipe(map(response => response.json().object as HomePage));
    }*/
    getHomePage(id: number): Observable<HomePage> {
        let homeUrl = 'https://imegcorp.com/cms/rest/home/1?merger=' + id;
        //const url = `${homeUrl}/${id}`;
        return this.http.get(homeUrl).pipe(map(response => response.json().object as HomePage));
    }

    getLocationsPage(id: number): Observable<LocationsPage> {
        let homeUrl = 'https://imegcorp.com/cms/rest/home';
        const url = `${homeUrl}/${id}`;
        return this.http.get(url).pipe(map(response => response.json().object as LocationsPage));
    }
    getLocations(id: number): Promise<ModxLocationModel[]> {
        // const url = `${this.locationsUrl}/${id}`;
        const url = `${this.locationsUrl}/${id}`;
        return this.http.get(url).toPromise().then(response => response.json().object.locations as ModxLocationModel[]);
    }
    getInternationalLocations(id: number): Promise<ModxLocationModel[]> {
        // const url = `${this.locationsUrl}/${id}`;
        const url = `${this.locationsUrl}/${id}`;
        return this.http.get(url).toPromise().then(response => response.json().object.internationalLocations as ModxLocationModel[]);
    }

    getAboutPage(id: number): Observable<AboutPage> {
        let aboutUrl = 'https://imegcorp.com/cms/rest/about';
        const url = `${aboutUrl}/${id}`;
        return this.http.get(url).pipe(map(response => response.json().object as AboutPage));
    }

    getNewsPageLinks(): Observable<any> {
        let newsUrl = 'https://imegcorp.com/cms/rest/news';
        const url = `${newsUrl}`;
        return this.http.get(url).pipe(map(response => response.json().results as Page[]));
    }

    getPageObservableWithTags(id: number): Observable<TagPage> {
        let tagsUrl = 'https://imegcorp.com/cms/rest/tags';
        const url = `${tagsUrl}/${id}`;

        return this.http.get(url).pipe(map(response => response.json().object as TagPage));
    }

    getSlides(id: number): Observable<ModxSlideModel[]> {
        const url = `${this.carouselUrl}/${id}`;
        return this.http.get(url).pipe(
            map(response => response.json().object.slides));
    }

    getSlidesProject(alias: string): Observable<ModxSlideModel[]> {
      let regionUrl = 'https://imegcorp.com/cms/rest/region';
      const url = `${regionUrl}?alias=${alias}`;
        return this.http.get(url).pipe(
            map(response => response.json().object.projectSpotlightProjects));
    }

    getProjectsObservable(tag: string): Observable<ProjectList> {
        let projectsUrl = 'https://imegcorp.com/cms/rest/projects?tag=' + tag;
        // let headers = new Headers({'Content-Type': 'application/json'});
        // let params = new HttpParams().set('tag', tag);
        return this.http.get(projectsUrl).pipe(map(response => response.json().object as ProjectList));
        // return this.http.post(projectsUrl, {tag: tag}, headers).map(response => response.json().object.projects as Project[]);
    }

    /*getProject(id: string): Observable<Project> {
        const url = `${this.projectsUrl}/${id}`;
        return this.http.get(url).pipe(map(response => response.json().object.projects as Project));
    }*/

    getProject(alias: string): Observable<Project> {
        const url = `${this.projectsUrl}?alias=${alias}`;
        return this.http.get(url).pipe(map(response => response.json().object.projects as Project));
    }

    /*getRegion(alias: string): Observable<Region> {
        let regionUrl = 'https://imegcorp.com/cms/rest/region';
        const url = `${regionUrl}/${alias}`;
        return this.http.get(url).map(response => response.json().object as Region);
    }*/

    getRegion(alias: string): Observable<Region> {
        let regionUrl = 'https://imegcorp.com/cms/rest/region';
        const url = `${regionUrl}?alias=${alias}`;
        return this.http.get(url).pipe(map(response => response.json().object as Region));
    }

    public getGallery() {
      const url = `${ContentService.domain}/${ContentService.galleryPath}?${ContentService.galleryQuery}`;
      return this.http.get(url).pipe(
        map(res => res.json()),
        pluck('object', 'gallery'),
        map((gallery: any[]) => gallery.map(arg => `${ContentService.domain}/${ContentService.imagePath}/${arg.image}`)),
        catchError(() => of('')));
    }

}
