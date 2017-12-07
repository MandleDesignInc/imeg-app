import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {AboutModule} from './about/about.module';
import {LeadersModule} from './leaders/leaders.module';
import {TagModule} from './tags/tag.module';
import {ProjectsModule} from './projects/projects.module';
import {PageModule} from './page/page.module';
import {AppComponent} from './app.component';
import {MdButtonModule, MdIconModule, MdInputModule, MdSidenavModule} from '@angular/material';




@NgModule({
    declarations: [
      AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        HomeModule,
        AboutModule,
        LeadersModule,
        TagModule,
        ProjectsModule,
        PageModule,
        MdSidenavModule,
        MdButtonModule,
        MdInputModule,
        MdIconModule,
    ],
    bootstrap: [AppComponent]

})
export class AppModule { }


