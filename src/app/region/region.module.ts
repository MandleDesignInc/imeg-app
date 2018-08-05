import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material';
import {RegionComponent} from './region.component';
import {RegionRoutingModule} from './region-routing.module';



@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        RegionRoutingModule
    ],
    declarations: [
        RegionComponent
    ]
})
export class RegionModule { }
