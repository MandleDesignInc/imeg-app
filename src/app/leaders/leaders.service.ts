import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';
import { Page } from '../core/content-model';

export class LeadersPageResponse {
    message: string;
    object: LeadersPage;
    success: boolean;
}
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

    constructor(private http: HttpClient) { }

    getLeadersPage(id: number): Observable<LeadersPage> {
        const url = `${this.leadersUrl}/${id}`;
        return this.http.get<LeadersPageResponse>(url).pipe(
            map(response => response.object));
    }

}
