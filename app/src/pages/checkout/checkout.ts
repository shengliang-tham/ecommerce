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

  ionViewWillLeave() {
    //Initalise back to empty
    this.productListing = [];
  }

  ionViewWillEnter() {
    //Initialise back to zero 
    this.totalAmount = 0.00;

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
        this.checkout.cartListing(result).subscribe(data => {
          this.productListing = data.result;
          //This is to assign the quantity to product list array
          for (let i of this.productListing) {
            let tempVariantArray = [];

            for (let x of this.storageArray) {

              //Removing of other variants in the product list array
              for (let index = 0; index < i.variants.length; index++) {

                if (x.variantId == i.variants[index].id) {
                  //Assign the quantity to the variant properties from the local storage
                  i.variants[index].quantity = x.quantity;

                  // To calculate the total amount
                  this.totalAmount += i.variants[index].quantity * parseFloat(i.variants[index].price);
                  tempVariantArray.push(i.variants[index]);
                }
              }
            }
            i.variants = tempVariantArray;
          }

          loading.dismiss();
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
