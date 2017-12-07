import {Injectable} from '@angular/core';
import {NavigationItem} from './content-model';

@Injectable()
export class Globals {

    cmsPath: string = 'http://bluemandle2.com/~imeg/cms/';
    uploadsPath: string = this.cmsPath + 'assets/uploads/';

    navigationItems: NavigationItem[] = [];

    rootMenu: NavigationItem[] = [];
}


