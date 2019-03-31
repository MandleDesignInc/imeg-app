import { Component, OnInit } from '@angular/core';
import { Contact } from './contactform-model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent {

  model = new Contact('Enter Name', 'email@email.com', '555-555-5555', 'imegcorp', 'hello there.');

  submitted = false;

  onSubmit(contactform: NgForm) {
    this.submitted = true;
    console.log(contactform.value);  // { first: '', last: '' }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
