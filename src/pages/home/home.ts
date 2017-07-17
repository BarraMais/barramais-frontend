import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';
import { ViewChild } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { User } from '../../providers/user';
import { Slides } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Platform} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;

  registration: any = RegistrationPage;
  login: any = LoginPage;
  jwtHelper: JwtHelper = new JwtHelper();
  mainPage: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public toastCtrl: ToastController,
    private fb: Facebook,
    private userProvider: User,
    public loadingCtrl: LoadingController,
    public events: Events,
    public platform: Platform
  ) {
    this.menu.enable(false, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  facebookLogin() {
    this.platform.ready().then(() => {
      let permissions = ['public_profile', 'email'];
      let auth = {login_response: {}, basic_info: {}, picture: {}};

      this.fb.login(permissions)
      .then((res: FacebookLoginResponse) => {
        auth.login_response = res;
        console.log(JSON.stringify(res));

        let fg_url = res.authResponse.userID;

        let access_token = '&access_token='+res.authResponse.accessToken;
        let info_url = fg_url+'?fields=first_name,last_name,email&debug=all'+access_token;
        console.log(info_url);

        this.fb.api(info_url, permissions)
        .then(info => {
          auth.basic_info = info;

          this.fb.api(fg_url+'/picture?type=large&redirect=false&debug=all'+access_token, permissions)
          .then(picture => {
            auth.picture = picture;

            let loader = this.loadingCtrl.create({
              content: "Entrando, aguarde..."
            });

            loader.present();

            this.userProvider.register_or_login_with_facebook(auth).subscribe(
              (token_params) => {
                localStorage.setItem("jwt", token_params.token);
                localStorage.setItem("user", token_params.user);
                localStorage.setItem('vessels_type', JSON.stringify(token_params.vessels_type));
                this.events.publish("onUpdateUser", this.jwtHelper.decodeToken(token_params.user));
                this.openPage(this.mainPage);
              },
              (error) => console.log(error),
              () => loader.dismiss()
            );
          }).catch(e => {
            console.log('Error logging into Facebook', e);
            this.presentToast('Error logging into Facebook: ' + JSON.stringify(e));
          });
        }).catch(e => {
          console.log('Error logging into Facebook', e);
          this.presentToast('Error logging into Facebook: ' + JSON.stringify(e));
        });
      }).catch(e => {
        console.log('Error logging into Facebook', e);
        this.presentToast('Error logging into Facebook: ' + JSON.stringify(e));
      });
    });
  }
}
