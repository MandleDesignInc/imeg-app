import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeadersComponent} from './leaders.component';
import {LeadersRoutingModule} from './leaders-routing.module';
import {LeadersService} from './leaders.service';
import {LeaderDialogComponent} from './leader-dialog.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    LeadersRoutingModule
  ],
  declarations: [LeadersComponent, LeaderDialogComponent],
  providers: [LeadersService],
  entryComponents: [LeaderDialogComponent]
})
export class LeadersModule { }
