import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProfileProvider } from "../../../providers/profile/profile";

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  tabBarElement: any;
  signUpForm: FormGroup;
  customer = {
    customer: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      addresses: [{
        address1: '',
        city: '',
        postal: ''
      }],
      password: '',
      password_confirmation: ''
    }
  };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public profileService: ProfileProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address1: ['', Validators.required],
      city: ['', Validators.required],
      postal: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {

  }


  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  onSignUp(data) {

    this.customer.customer.first_name = data.firstName;
    this.customer.customer.last_name = data.lastName;
    this.customer.customer.email = data.email;
    this.customer.customer.phone = data.mobileNo;
    this.customer.customer.addresses[0].address1 = data.address1;
    this.customer.customer.addresses[0].city = data.city;
    this.customer.customer.addresses[0].postal = data.postal;
    this.customer.customer.password = data.password;
    this.customer.customer.password_confirmation = data.password;


    console.log(this.customer);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    loading.dismiss();

    // this.profileService.signUp(this.customer).subscribe(result => {
    //   console.log(result);
    // })
  }
}
