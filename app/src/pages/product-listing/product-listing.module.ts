import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListingPage } from './product-listing';

@NgModule({
  declarations: [
    ProductListingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListingPage),
  ],
  exports: [
    ProductListingPage
  ]
})
export class ProductListingPageModule {}
