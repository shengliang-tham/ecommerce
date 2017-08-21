import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CheckoutProvider } from "../../providers/checkout/checkout";

@Component({
  selector: 'page-about',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  storageArray = [];
  productListing = [];
  constructor(public navCtrl: NavController,
    private storage: Storage,
    private checkout: CheckoutProvider,
    private loadingCtrl: LoadingController) {

  }
  ionViewWillEnter() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.storage.get('cart').then((val) => {
      this.storageArray = val.storageArray
      return this.storageArray
    })
      .then(result => {
        let productIdArray = [];
        for (let i of result) {
          productIdArray.push(i.productId);
        }
        return productIdArray
      })
      .then(result => {
        this.checkout.cartListing(result).subscribe(data => {
          this.productListing = data.result;
          loading.dismiss();
          console.log(data.result)
        })
      })
  }
}
