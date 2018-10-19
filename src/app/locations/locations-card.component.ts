import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-locations-card',
  templateUrl: './locations-card.component.html',
  styleUrls: ['./locations-card.component.css']
})
export class LocationsCardComponent implements OnInit {
  @Input() info: string;
  @Input() image: string;
  @Input() city: string;

  constructor() { }

  ngOnInit() { }

}
