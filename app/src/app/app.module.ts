import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CheckoutPage } from "../pages/checkout/checkout";
import { HomePage } from '../pages/home/home';
import { ProfilePage } from "../pages/profile/profile";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ListingProvider } from '../providers/listing/listing';
import { HttpModule } from '@angular/http';
import { ProductListingPage } from "../pages/product-listing/product-listing";
import { ProductDetailPage } from "../pages/product-detail/product-detail";
import { SignupPage } from "../pages/profile/signup/signup";
import { ProfileProvider } from '../providers/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    CheckoutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    SignupPage,
    ProductListingPage,
    ProductDetailPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CheckoutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    SignupPage,
    ProductListingPage,
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ListingProvider,
    ProfileProvider
  ]
})
export class AppModule { }
