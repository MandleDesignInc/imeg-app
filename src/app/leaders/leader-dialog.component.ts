import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'leader-dialog',
    templateUrl: './leader-dialog.component.html',
    styleUrls: ['./leader-dialog.component.css']
})
export class LeaderDialogComponent {

    

    constructor(public dialogRef: MatDialogRef<LeaderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
