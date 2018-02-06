import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material';
import {TagComponent} from './tag.component';
import {TagRoutingModule} from './tag-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        TagRoutingModule
    ],
    declarations: [
        TagComponent
    ]
})
export class TagModule { }
