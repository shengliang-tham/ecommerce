import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListingProvider } from "../../providers/listing/listing";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listings = [];

  constructor(public navCtrl: NavController,
    public listingService: ListingProvider) {

  }

  ionViewDidEnter() {
    this.listingService.retrieveListing().subscribe(data => {
      console.log(data.product)
      this.listings = data.product;
      // console.log(this.listings);
    })
  }

}
