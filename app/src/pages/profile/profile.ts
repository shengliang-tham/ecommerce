import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from "./signup/signup";

@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }
}
