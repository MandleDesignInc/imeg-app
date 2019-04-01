import { Component, OnInit } from '@angular/core';
import { Contact } from './contactform-model';
import {NgForm} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent {

  constructor(private http: Http) { }

  model = new Contact('Enter Name', 'email@email.com', '555-555-5555', 'imegcorp', 'hello there.');

  submitted = false;

  onSubmit(contactform: NgForm) {
    this.submitted = true;
    console.log(contactform.value);  // { first: '', last: '' }
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('submit', 'submit');
    urlSearchParams.append('name', contactform.value.name);
    urlSearchParams.append('email', contactform.value.email);
    urlSearchParams.append('phone', contactform.value.phone);
    urlSearchParams.append('company', contactform.value.company);
    urlSearchParams.append('message', contactform.value.message);
    this.http.post('http://162.144.62.44/~imeg/cms/index.php?id=592', urlSearchParams).subscribe(
          data => {
            console.log('email sent');
          },
          error => {
            console.log(JSON.stringify(error.json()));
          }
        )
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
