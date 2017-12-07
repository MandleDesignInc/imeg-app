import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    selector: 'leader-dialog',
    templateUrl: './leader-dialog.component.html',
    styleUrls: ['./leader-dialog.component.css']
})
export class LeaderDialogComponent {

    constructor(public dialogRef: MdDialogRef<LeaderDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}