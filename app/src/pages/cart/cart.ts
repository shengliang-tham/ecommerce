import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { PaymentPage } from "./payment/payment";



@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {

  storageArray = [];
  productListing = [];
  totalAmount = 0.00;
  variantId: any;

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private checkout: CheckoutProvider,
    private loadingCtrl: LoadingController,
  ) {

  }

  ionViewWillLeave() {
    //Initalise back to empty
    this.productListing = [];
  }

  ionViewWillEnter() {
    //Initialise back to zero 
    this.totalAmount = 0.00;
    this.productListing = [];

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
          console.log(this.productListing)

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
          console.log(this.productListing)

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

  onRemove(productId, variantId) {
    let storageArray = [];
    this.storage.get('cart').then(val => {

      if (val.storageArray.length <= 1) {
        console.log(val.storageArray.length)
        this.storage.remove('cart')
          .then(result => {
            this.ionViewWillEnter();
          })
      }
      else {

        for (let i = 0; i < val.storageArray.length; i++) {
          if ((val.storageArray[i].productId == productId) && (val.storageArray[i].variantId == variantId)) {
            //Remove one item
            val.storageArray.splice(i, 1)
            storageArray = val.storageArray
            this.storage.set('cart', {
              storageArray
            })
              // Reload the view
              .then(result => {
                this.ionViewWillEnter();

              });
            console.log(storageArray)
          }
        }
      }
    })
      .catch(err => {
        console.log(err)
      })
  }

  onEdit(productId, variantId) {

  }

  checkOut() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.storage.get('cart').then(val => {
      let tempArray = [];

      for (let i of val.storageArray) {
        let tempObject = {
          variant_id: '',
          quantity: '',
        };
        tempObject.variant_id = i.variantId;
        tempObject.quantity = i.quantity;
        tempArray.push(tempObject);
      }
      return tempArray
    }).then(storage => {
      this.checkout.checkOut(storage).subscribe(data => {
        console.log(data.web_url)
        loading.dismiss();
        this.navCtrl.push(PaymentPage, {
          webUrl: data.web_url
        });
      })
    })


  }

}
