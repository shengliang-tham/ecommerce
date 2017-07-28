import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabBarElement: any;
  rootPage: any = TabsPage;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    keyboard: Keyboard
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // keyboard.disableScroll(true);

      keyboard.onKeyboardShow().subscribe(() => {
        // document.body.classList.add('keyboard-is-open');
        // document.querySelector('.tabbar.show-tabbar').style.display = 'none';
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.tabBarElement.style.display = 'none';
        this.tabBarElement.remove;
      });

      keyboard.onKeyboardHide().subscribe(() => {
        // document.body.classList.remove('keyboard-is-open');
        this.tabBarElement.style.display = 'flex';
        this.tabBarElement.remove();
      });
    });
  }
}
