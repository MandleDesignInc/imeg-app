import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageComponent} from './page/page.component';
import {RouteLoader} from './page/router-loader.service';
import {PageNotFoundComponent} from './core/page-not-found.component';
import { ImageOverlayComponent } from './core/image-overlay.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'image/:imageId', outlet: 'modal', component: ImageOverlayComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [RouteLoader],
    entryComponents: [PageComponent]
})
export class AppRoutingModule { }







