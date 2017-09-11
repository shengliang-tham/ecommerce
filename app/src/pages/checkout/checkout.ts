import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
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
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

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
      for (let i = 0; i < val.storageArray.length; i++) {
        if ((val.storageArray[i].productId == productId) && (val.storageArray[i].variantId == variantId)) {
          //Remove one item
          val.storageArray.splice(i, 1)
          storageArray = val.storageArray
          this.storage.set('cart', {
            storageArray
          });

        }
      }
    })
      // Reload the view
      .then(result => {
        this.ionViewWillEnter();

      })
  }

  onEdit(productId, variantId) {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
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
