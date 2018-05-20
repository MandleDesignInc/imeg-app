//import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { ImegLocations } from "./location";

@Component({
  selector: 'app-locations',
  templateUrl: './locations-pods.component.html',
  styleUrls: ['./locations-pods.component.css']
})
export class ImegLocationsComponent implements OnInit {
  @Input() locations: ImegLocations[];

  constructor() { }

  ngOnInit() {
  }

}
