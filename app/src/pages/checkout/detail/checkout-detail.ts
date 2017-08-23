import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'page-checkout-detai;',
  templateUrl: 'checkout-detail.html',
})
export class CheckoutDetailPage {
  tabBarElement: any;
  signUpForm: FormGroup;
  customer = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    verified_email: true,
    addresses: [{
      address1: '',
      city: 'SG',
      province: "SG",
      phone: "",
      zip: '',
      last_name: "",
      first_name: "",
      country: "SG"
    }],
    password: '',
    password_confirmation: '',
    send_email_welcome: false
  };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      postal: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
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
    this.customer.first_name = data.firstName;
    this.customer.last_name = data.lastName;
    this.customer.email = data.email;
    this.customer.phone = data.mobileNo;
    this.customer.addresses[0].address1 = data.address1;
    this.customer.addresses[0].city = data.city;
    this.customer.addresses[0].zip = data.postal;
    this.customer.addresses[0].phone = data.mobileNo;
    this.customer.addresses[0].first_name = data.firstName;
    this.customer.addresses[0].last_name = data.lastName;
    this.customer.password = data.password;
    this.customer.password_confirmation = data.password;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
  }
}
