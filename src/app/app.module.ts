import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
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
import {MatButtonModule, MatIconModule, MatInputModule, MatSidenavModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import { NewsModule } from './news/news.module';


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
    NewsModule,
    PageModule,
    HttpModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  bootstrap: [AppComponent],
  providers: []

})
export class AppModule {
}


