import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CheckoutPage } from "../checkout/checkout";
import { ProfilePage } from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CheckoutPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
