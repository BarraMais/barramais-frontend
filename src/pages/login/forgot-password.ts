import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the ForgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  public user = { email: '' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userProvider: User,
    public toastCtrl: ToastController,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  forgotPassword() {
    let loader = this.loadingCtrl.create({
      content: "Enviando requisição, aguarde..."
    });

    loader.present();
    this.userProvider.forgot_password({user: this.user}).subscribe(
      (_) => {
        this.presentToast('Enviamos um link de recuperação de senha para o seu email!');
        loader.dismiss();
      },
      (error) => {
        this.presentToast(error.json().error);
        loader.dismiss();
      }
    );
  }
}
