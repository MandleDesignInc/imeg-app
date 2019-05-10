import {Injectable} from '@angular/core';
import {NavigationItem} from './content-model';

@Injectable()
export class Globals {

    cmsPath: string = 'https://imegcorp.com/cms/';
    uploadsPath: string = this.cmsPath + 'assets/uploads/';

    navigationItems: NavigationItem[] = [];

    rootMenu: NavigationItem[] = [];
}
