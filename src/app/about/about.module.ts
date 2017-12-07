import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {AboutRoutingModule} from './about-routing.module';
import {MdGridListModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule,
        MdGridListModule
    ],
    declarations: [
        AboutComponent
    ]
})
export class AboutModule {}