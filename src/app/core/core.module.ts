import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentService} from './content.service';
import {Globals} from './globals';
import {RouteLoader} from '../page/router-loader.service';
import {PageNotFoundComponent} from './page-not-found.component';

@NgModule({
    imports:      [ CommonModule ],
    providers: [ContentService, RouteLoader, Globals],
    declarations: [PageNotFoundComponent],
    exports: [PageNotFoundComponent]
})
export class CoreModule { }
