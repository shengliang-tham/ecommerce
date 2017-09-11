import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// declare var require: any;

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  productDetails: any;
  pictureImages: any = [];
  tabBarElement: any;
  variantId: any;
  hasVariants: boolean;
  // shopifyBuy = require('shopify-buy');
  // shopClient;

  @ViewChild('description') description: ElementRef;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private storage: Storage) {
    this.productDetails = navParams.get("productDetails");
    console.log(this.productDetails);

    //Initialise to the first variant 
    this.variantId = this.productDetails.variants[0].id;
    this.pictureImages = this.productDetails.images;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');


  }

  ionViewDidLoad() {
    this.description.nativeElement.innerHTML = this.productDetails.body_html;
  }

  ionViewWillEnter() {
    //Hide the bottom menu bar
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    //Show the bottom menu bar
    this.tabBarElement.style.display = 'flex';
  }

  addToCart() {
    let cart = {
      src: this.productDetails.images[0].src,
      productId: this.productDetails.id,
      variantId: this.variantId,
      quantity: 1
    };
    this.storage.get('cart').then((val) => {

      let counter = 0; // to count whether is there exisiting product in the cart already
      if (val) {
        for (let i of val.storageArray) {
          // // There are existing product in the cart already, as such we need to increment the quantity
          // if (this.productDetails.id == i.productId) {
          //   // That means user is added the same product variant to the cart.
          //   if (this.variantId != i.variantId) {
          //     i.quantity++;
          //     counter++;
          //   }
          // }
          console.log("i" + i.variantId)
          console.log("this" + this.variantId)
          if (this.variantId == i.variantId) {
            i.quantity++;
            counter++;
          }

        }
        let storageArray = val.storageArray;

        //That means there are no existing product in the cart, as such we need to add to the cart
        if (counter == 0) {
          storageArray.push(cart);

        }
        this.storage.set('cart', {
          storageArray
        });

      }
      else {
        let storageArray = [];
        storageArray.push(cart);
        this.storage.set('cart', {
          storageArray
        });
      }
    });
    // var cart;
    // this.shopClient.createCart()
    //   .then(newCart => {
    //     cart = newCart;
    //     // do something with updated cart
    //     cart.createLineItemsFromVariants({ variant: this.productDetails.attrs.variants[0], quantity: 1 }).then(function (cart) {
    //       // do something with updated cart
    //       console.log(cart);
    //     });
    //   });
    let toast = this.toastCtrl.create({
      message: 'Added to cart successfully',
      duration: 1000,
      position: 'bottom'
    });

    toast.present();
    this.navCtrl.pop();
  }
}
