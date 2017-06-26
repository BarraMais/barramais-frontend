import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController, LoadingController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { ToastController } from 'ionic-angular';
import { FeedsPage }from '../feeds/feeds';
import { RegistrationPage } from "../registration/registration";
import { MainPage }from '../main/main';
import { JwtHelper } from 'angular2-jwt';
import { Events } from 'ionic-angular';
import { ForgotPasswordPage } from './forgot-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel = new UserModel();
  feeds: any = FeedsPage;
  main: any = MainPage;
  registrationPage = RegistrationPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private userProvider: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public menu: MenuController
  ) {
      // Keyboard.disableScroll(true);
      this.menu.enable(false, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openPage(page) {
    this.navCtrl.push(RegistrationPage);
    //console.log("yolo");
  }

  gotToForgotPassword() {
    this.openPage(ForgotPasswordPage);
  }

  login(user) {
    let loader = this.loadingCtrl.create({
      content: "Entrando, aguarde..."
    });

    loader.present();

    this.userProvider.login(user)
    .subscribe(token_params => {
        localStorage.setItem("jwt", token_params.token);
        localStorage.setItem("user", token_params.user);
        localStorage.setItem('vessels_type', JSON.stringify(token_params.vessels_type));
        this.events.publish("onUpdateUser", this.jwtHelper.decodeToken(token_params.user));
        this.openPage(this.main);
        loader.dismiss();
    }, error => {
        console.log(error.json() || 'Server error');
        loader.dismiss();
        this.presentToast(error.json().error);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
