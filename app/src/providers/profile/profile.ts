import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import * as vars from '../../global-variable';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }

  signUp(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(vars.apiUrl + '/sign-up', credentials, { headers: headers })
      .map(res => res.json());
  }
}
