import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material';
import { ServicesComponent, MarketsComponent} from './tag.component';
import {TagRoutingModule} from './tag-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        TagRoutingModule
    ],
    declarations: [
        MarketsComponent,
        ServicesComponent,
    ]
})
export class TagModule { }
