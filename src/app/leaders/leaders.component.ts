import { Component, OnInit } from '@angular/core';
import { Leader, LeadersPage, LeadersService } from './leaders.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { LeaderDialogComponent } from './leader-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './leaders.component.html',
    styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {

    leadersPage: LeadersPage;

    constructor(private leadersService: LeadersService, private location: Location, public dialog: MatDialog, private sanitizer: DomSanitizer) { }

    // TODO: refactor with rest of routing
    static getId(path: string): number {

        switch (path) {
            case '/about/corporate-leaders':
                return 51;
            case '/about/team-leaders':
                return 52;
            default:
                return 0;
        }
    }

    ngOnInit() {
        this.leadersService.getLeadersPage(LeadersComponent.getId(this.location.path())).subscribe(result => this.onPageResult(result));
    }

    onPageResult(page: LeadersPage): void {

        page.page.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.page.content);

        this.leadersPage = page;
    }


    openDialog(leader: Leader): void {

        let dialogRef = this.dialog.open(LeaderDialogComponent, {
            data: { leader: leader }
        });
    }

}
