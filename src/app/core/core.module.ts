import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from './content.service';
import { Globals } from './globals';
import { RouteLoader } from '../page/router-loader.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { ImageOverlayComponent } from './image-overlay.component';

@NgModule({
    imports: [CommonModule],
    providers: [ContentService, RouteLoader, Globals],
    declarations: [
        ImageOverlayComponent,
        PageNotFoundComponent,
    ],
    exports: [PageNotFoundComponent]
})
export class CoreModule { }
