import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'page-cart-payment;',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  tabBarElement: any;
  webUrl;

  paymentMade = false;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private inAppBrowser: InAppBrowser,
    private platform: Platform,
    private ref: ChangeDetectorRef) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.webUrl = navParams.get('webUrl')

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let browser = this.inAppBrowser.create(this.webUrl, '_blank', {
        location: 'no',
        zoom: 'no'
      });
      browser.on('exit').subscribe(result => {
        if (this.paymentMade == false) {
          this.navCtrl.pop();
        }
      })

      browser.on('loadstart').subscribe(event => {
        if (event.url.includes("thank_you")) {
          this.paymentMade = true
          this.ref.detectChanges(); // Triggering change detection manully
          browser.close();

        }
      })
    });
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  onBack() {
    this.navCtrl.pop();
  }

}
