import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { CartPage } from "../pages/cart/cart";
import { HomePage } from '../pages/home/home';
import { EntertainmentPage } from "../pages/entertainment/entertainment";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ListingProvider } from '../providers/listing/listing';
import { HttpModule } from '@angular/http';
import { ProductListingPage } from "../pages/product-listing/product-listing";
import { ProductDetailPage } from "../pages/product-detail/product-detail";
import { SignupPage } from "../pages/entertainment/signup/signup";
import { ProfileProvider } from '../providers/profile/profile';
import { CheckoutProvider } from '../providers/checkout/checkout';
import { PaymentPage } from "../pages/cart/payment/payment";

@NgModule({
  declarations: [
    MyApp,
    CartPage,
    EntertainmentPage,
    HomePage,
    TabsPage,
    SignupPage,
    ProductListingPage,
    ProductDetailPage,
    PaymentPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    EntertainmentPage,
    HomePage,
    TabsPage,
    SignupPage,
    ProductListingPage,
    ProductDetailPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ListingProvider,
    ProfileProvider,
    CheckoutProvider
  ]
})
export class AppModule { }
