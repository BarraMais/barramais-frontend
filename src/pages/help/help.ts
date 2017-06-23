import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Help page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {
  message: string;

  constructor(
    private userProvider: User,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
  ) {}

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  sendSupportMail(message) {
    if (message != null) {
      let loader = this.loadingCtrl.create({
        content: "Enviando mensagem..."
      });
      loader.present();
      this.userProvider.send_support_email(message).subscribe(
        (_) => {
          this.presentToast('Sua mensagem foi enviada para a nossa central de suporte e em breve responderemos através do email cadastrado.');
        },
        (error) => this.presentToast(error._body),
        () => {
          this.message = null;
          loader.dismiss();
        }
      );
    } else {
      this.presentToast('O campo mensagem não pode ser vazio.');
    }
  }
}
