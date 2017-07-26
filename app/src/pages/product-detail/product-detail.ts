import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var require: any;

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  productDetails: any;
  pictureImages: any = [];
  tabBarElement: any;
  shopifyBuy = require('shopify-buy');
  shopClient;

  @ViewChild('description') description: ElementRef;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController) {
    this.productDetails = navParams.get("productDetails");
    this.pictureImages = this.productDetails.attrs.images;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    console.log(this.productDetails);
    this.description.nativeElement.innerHTML = this.productDetails.attrs.body_html;

    this.shopClient = this.shopifyBuy.buildClient({
      accessToken: 'f8da95633331a97c293fff8c8b4b0e6d',
      domain: 'hello-retail.myshopify.com',
      appId: '8'
    });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  addToCart() {
    var cart;
    this.shopClient.createCart()
      .then(newCart => {
        cart = newCart;
        // do something with updated cart
        cart.createLineItemsFromVariants({ variant: this.productDetails.attrs.variants[0], quantity: 1 }).then(function (cart) {
          // do something with updated cart
          console.log(cart);
        });
      });
    let toast = this.toastCtrl.create({
      message: 'Added to cart successfully',
      duration: 1000,
      position: 'bottom'
    });

    toast.present();
    this.navCtrl.pop();
  }
}
