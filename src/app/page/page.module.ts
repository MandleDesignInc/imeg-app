import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageComponent} from './page.component';
import {MdCardModule} from '@angular/material';
import {PageRoutingModule} from './page-routing.module';



@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        PageRoutingModule
    ],
    declarations: [
        PageComponent
    ]
})
export class PageModule { }
