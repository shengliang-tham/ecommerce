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

  onRemove(productId, variantId) {
    console.log(productId)
    console.log(variantId)

    let storageArray = [];
    this.storage.get('cart').then(val => {
      for (let i = 0; i < val.storageArray.length; i++) {
        if ((val.storageArray[i].productId == productId) && (val.storageArray[i].variantId == variantId)) {
          console.log(i)
          //Remove one item
          val.storageArray.splice(i, 1)
          storageArray = val.storageArray
          this.storage.set('cart', {
            storageArray
          });

        }
      }
      this.ionViewWillEnter();

      console.log(this.productListing)
      // for (let i = 0; i < this.productListing.length; i++) {
      //   if (this.productListing[i].id == productId) {
      //     console.log(i)
      //     for (let x = 0; i < this.productListing[i].variants.length; x++) {
      //       console.log(x)

      //       if (this.productListing[i].variants[x].id == variantId) {
      //         this.totalAmount = this.totalAmount - this.productListing[i].variants[x].price;
      //         if (this.productListing[i].variants.length >= 2) {
      //           this.productListing[i].variants.splice(x, 1)
      //           console.log("hello1")

      //         }
      //         else {
      //           this.productListing.splice(i, 1)
      //           console.log("hell2")

      //         }
      //       }
      //     }
      //   }
      // }
    });
  }


  checkOut() {
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
        this.navCtrl.push(CheckoutDetailPage, {
          webUrl: data.web_url
        });
      })
    })


  }

}
