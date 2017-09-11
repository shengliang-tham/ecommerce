import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ListingProvider } from "../../providers/listing/listing";
import { ProductListingPage } from "../product-listing/product-listing";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories = [];

  constructor(public navCtrl: NavController,
    public listingService: ListingProvider,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.listingService.retrieveCategories().subscribe(data => {
      this.categories = data.collections;
      loading.dismiss();
    })
  }

  viewProduct(categoryId, title) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.listingService.retrieveCategoryProduct(categoryId).subscribe(data => {
      this.navCtrl.push(ProductListingPage, {
        listing: data.listing,
        title: title
      });

      loading.dismiss();
    });

  }

}
