import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {ContentService} from '../core/content.service';
import {PageComponent} from './page.component';
import {Page} from '../core/content-model';

@Injectable()
export class RouteLoader implements CanActivate {


    constructor(public router: Router, private contentservice: ContentService) { }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


        return this.updateRouter(state);


    }


    updateRouter(state: RouterStateSnapshot): boolean {



        let routes: Routes = [];

        let pages: Promise<Page[]> = this.contentservice.getNavMenu();
        pages.then(result => {

            result.forEach(item => {

                if (!item.hidemenu && item.template === 2) {
                    routes.push(
                        {path: item.alias, component: PageComponent}
                    );
                }

            });


            this.router.config.splice(this.router.config.length - 1, 0, ...routes);
            this.router.resetConfig(this.router.config);
            if (routes.some(route => state.url.slice(-route.path.length) === route.path)) this.router.navigateByUrl(state.url);


        });

        this.router.config.forEach(item => {
            console.log(item.data);

        });


        return true;
    }


}
