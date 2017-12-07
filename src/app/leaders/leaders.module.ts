import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeadersComponent} from './leaders.component';
import {LeadersRoutingModule} from './leaders-routing.module';
import {LeadersService} from './leaders.service';
import {MdButtonModule, MdDialogModule, MdGridListModule, MdIconModule} from '@angular/material';
import {LeaderDialogComponent} from './leader-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MdGridListModule,
    MdDialogModule,
    MdIconModule,
    MdButtonModule,
    LeadersRoutingModule
  ],
  declarations: [LeadersComponent, LeaderDialogComponent],
  providers: [LeadersService],
  entryComponents: [LeaderDialogComponent]
})
export class LeadersModule { }
