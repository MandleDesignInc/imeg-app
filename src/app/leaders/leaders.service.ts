import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Page} from '../core/content-model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class LeadersPage {
    page: Page;
    groups: LeaderGroup[];
}
export class LeaderGroup {
    title: string;
    leaders: Leader[];
}
export class Leader {
    firstName: string;
    lastName: string;
    title: string;
    subtitle: string;
    description: string;
    email: string;
    phone: string;
    image: string;
    markets: string[];
    optionalContent: string;
}

@Injectable()
export class LeadersService {

    private leadersUrl = 'http://bluemandle2.com/~imeg/cms/rest/leaders';


    constructor(private http: Http) { }

    getLeadersPage(id: number): Observable<LeadersPage> {
        const url = `${this.leadersUrl}/${id}`;
        return this.http.get(url).map(response => response.json().object as LeadersPage);
    }
}