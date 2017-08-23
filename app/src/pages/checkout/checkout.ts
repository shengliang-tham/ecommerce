import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { CheckoutDetailPage } from "./detail/checkout-detail";

@Component({
  selector: 'page-about',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  storageArray = [];
  productListing = [];
  totalAmount = 0.00;
  variantId: any;

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
      if (val) {
        this.storageArray = val.storageArray
        return this.storageArray
      }
      else {
        throw new cartEmpty();
      }
    })
      .then(result => {
        let productIdArray = [];
        for (let i of result) {
          productIdArray.push(i.productId);
        }
        return productIdArray
      })
      .then(result => {
        //Initialise back to zero 
        this.totalAmount = 0.00;
        this.checkout.cartListing(result).subscribe(data => {
          this.productListing = data.result;
          //This is to assign the quantity to product list array
          for (let i of this.productListing) {
            for (let x of this.storageArray) {
              if (i.id == x.productId) {
                i.quantity = x.quantity
              }
            }



            // To calculate the total amount
            this.totalAmount += i.quantity * i.variants[0].price;
          }

          loading.dismiss();
          console.log(this.productListing)
          // console.log(data.result)
        })
      })
      .catch(err => {
        loading.dismiss();
      })

    function cartEmpty() {
      this.productListing = [];
    }
  }

  checkOut() {
    this.navCtrl.push(CheckoutDetailPage);
  }

}
