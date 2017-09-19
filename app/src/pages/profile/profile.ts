import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SignupPage } from "./signup/signup";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(private navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    private platform: Platform) {

    this.platform.ready().then(() => {
      let browser = this.inAppBrowser.create('https://hello-retail.myshopify.com/blogs/latest-news/latest-movies', '_blank', {
        location: 'no',
        zoom: 'no'
      });
    });
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }
}
