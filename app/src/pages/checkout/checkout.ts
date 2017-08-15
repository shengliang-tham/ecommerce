import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  storageArray = [];

  constructor(public navCtrl: NavController,
    private storage: Storage) {

  }
  ionViewDidLoad() {
    this.storage.get('cart').then((val) => {
      this.storageArray = val.storageArray
      console.log(this.storageArray)
    });
  }
}
