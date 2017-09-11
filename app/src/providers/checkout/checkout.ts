import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import * as vars from '../../global-variable';
/*
  Generated class for the CheckoutProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CheckoutProvider {

  constructor(public http: Http) {
    console.log('Hello CheckoutProvider Provider');
  }


  cartListing(credentials) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(vars.apiUrl + '/cart-listing', credentials, { headers: headers })
      .map(res => res.json());
  }

  checkOut(cart) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(vars.apiUrl + '/checkout', cart, { headers: headers })
      .map(res => res.json());
  }
}
