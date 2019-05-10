import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {AboutModule} from './about/about.module';
import { LocationsModule } from './locations/locations.module';
import { RegionModule } from './region/region.module';
import {LeadersModule} from './leaders/leaders.module';
import {TagModule} from './tags/tag.module';
import {ProjectsModule} from './projects/projects.module';
import {PageModule} from './page/page.module';
import {AppComponent} from './app.component';
import {MatButtonModule, MatIconModule, MatInputModule, MatSidenavModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { NewsModule } from './news/news.module';
import { LibraryModule } from './library/library.module';
import { CareersModule } from './careers/careers.module';
import { VideosModule } from './library/videos/videos.module';
import { NewslettersModule } from './library/newsletters/newsletters.module';
import { ArticlesModule } from './library/articles/articles.module';
import { PresentationsModule } from './library/presentations/presentations.module';
import { CountUpModule } from 'countup.js-angular2';
import { CareersComponent } from './careers/careers.component';
import { ContactformModule } from './contactform/contactform.module';
import { AnonymousReportFormModule } from './anonymous-report-form/anonymous-report-form.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
    HomeModule,
    AboutModule,
    LocationsModule,
    RegionModule,
    VideosModule,
    ArticlesModule,
    PresentationsModule,
    NewslettersModule,
    LeadersModule,
    TagModule,
    ProjectsModule,
    NewsModule,
    LibraryModule,
    CareersModule,
    PageModule,
    HttpModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CountUpModule,
    ContactformModule,
    AnonymousReportFormModule
  ],
  bootstrap: [AppComponent],
  providers: []

})
export class AppModule {
}
