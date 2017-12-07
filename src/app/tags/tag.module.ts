import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdCardModule} from '@angular/material';
import {TagComponent} from './tag.component';
import {TagRoutingModule} from './tag-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        TagRoutingModule
    ],
    declarations: [
        TagComponent
    ]
})
export class TagModule { }