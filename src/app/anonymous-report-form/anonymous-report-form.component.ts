import { Component, OnInit } from '@angular/core';
import { Anonymous } from './anonymous-report-form-model';
import {NgForm} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-anonymousreportform',
  templateUrl: './anonymous-report-form.component.html',
  styleUrls: ['./anonymous-report-form.component.css']
})
export class AnonymousReportFormComponent {

  constructor(private http: Http) { }

  model = new Anonymous('', '', '');

  submitted = false;

  onSubmit(anonymousform: NgForm) {
    this.submitted = true;
    console.log(anonymousform.value);  // { first: '', last: '' }
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('submit', 'submit');
    urlSearchParams.append('date', anonymousform.value.date);
    urlSearchParams.append('email', anonymousform.value.email);
    urlSearchParams.append('message', anonymousform.value.message);
    this.http.post('https://www.imegcorp.com/cms/index.php?id=664', urlSearchParams).subscribe(
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
