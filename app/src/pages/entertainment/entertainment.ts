import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SignupPage } from "./signup/signup";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-entertainment',
  templateUrl: 'entertainment.html'
})
export class EntertainmentPage {

  constructor(private navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    private platform: Platform) {
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

  ionViewDidEnter(){
    this.platform.ready().then(() => {
      let browser = this.inAppBrowser.create('https://hello-retail.myshopify.com/blogs/latest-news/latest-movies', '_blank', {
        location: 'no',
        zoom: 'no'
      });
    });
  }
}
