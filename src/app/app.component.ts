import {Component, OnInit} from '@angular/core';
import {MdIconRegistry, MdSnackBar} from '@angular/material';
import {NavigationItem, Page} from './core/content-model';
import {ContentService} from './core/content.service';
import {Globals} from './core/globals';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'imeg-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(public snackBar: MdSnackBar, private contentService: ContentService, public globals: Globals, iconReg: MdIconRegistry, sanitizer: DomSanitizer) {

      iconReg.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook-logo.svg'));
      iconReg.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/images/twitter-logo.svg'));

      iconReg.addSvgIcon('linked-in', sanitizer.bypassSecurityTrustResourceUrl('assets/images/linkedin-logo.svg'));

  }

  ngOnInit(): void {
      this.contentService.getNavMenu().then(results => this.onNavigationItems(results));
  }

  // TODO: refactor to get this logic out of component
  onNavigationItems(results: Page[]) {

      results.forEach(item => {


          // TODO: need to see if other components need this, refactor, and remove
          if (!item.hidemenu) {
              this.globals.navigationItems.push(new NavigationItem(item.id, item.alias, item.menutitle, item.template));
          }

          if (!item.hidemenu && item.parent === 0) {
              this.globals.rootMenu.push(new NavigationItem(item.id, item.alias, item.menutitle, item.template));
          }

      });
  }

  search(query: string): void {

      let msg = 'You searched for: "' + query + '"';

      this.snackBar.open(msg);
  }

}
