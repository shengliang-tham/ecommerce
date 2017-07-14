import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import * as vars from '../../global-variable';


@Injectable()
export class ListingProvider {

  constructor(public http: Http) {
    console.log('Hello ListingProvider Provider');
  }


  retrieveCategories() {
    return this.http.get(vars.apiUrl + '/categories')
      .map(res => res.json());
  }

  retrieveCategoryProduct(collectionId) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('collectionId', collectionId);
    return this.http.get(vars.apiUrl + '/categories-product', { search: params })
      .map(res => res.json());
  }
}
