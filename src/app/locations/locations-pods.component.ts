//import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { ImegLocations, InternationalLocations } from "./location";

@Component({
  selector: 'app-locations',
  templateUrl: './locations-pods.component.html',
  styleUrls: ['./locations-pods.component.css']
})
export class ImegLocationsComponent implements OnInit {
  @Input() locations: ImegLocations[];
  @Input() internationalLocations: InternationalLocations[];

  constructor() { }

  ngOnInit() {
  }

}
