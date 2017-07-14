import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from "../product-detail/product-detail";

/**
 * Generated class for the ProductListingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-listing',
  templateUrl: 'product-listing.html',
})
export class ProductListingPage {

  listings: any = [];
  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listings = navParams.get("listing");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log(this.listings);

  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  viewDetails(listing){
    this.navCtrl.push(ProductDetailPage, {
      productDetails : listing
    })
  }

}
