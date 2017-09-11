import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'page-checkout-detai;',
  templateUrl: 'checkout-detail.html',
})
export class CheckoutDetailPage {
  tabBarElement: any;
  webUrl;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public inAppBrowser: InAppBrowser,
    public platform: Platform, ) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');


    this.webUrl = navParams.get('webUrl')

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let browser = this.inAppBrowser.create(this.webUrl, '_blank', {
        location: 'no',
        zoom: 'no'
      });
      browser.insertCSS({
        code: 'body {margin-top : 10%}'
      });
    });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

}
