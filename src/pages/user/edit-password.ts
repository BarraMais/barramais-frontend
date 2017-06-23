import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the EditPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html'
})
export class EditPasswordPage {
  jwtHelper: JwtHelper = new JwtHelper();
  private reset_password_token;
  public password_config = {password: '', password_confirmation: '', reset_password_token: ''}

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private userProvider: User
  ) {
    let token = navParams.get('devise_token');
    this.reset_password_token = this.jwtHelper.decodeToken(token.devise_token);
  }

  updatePassword() {
    let loader = this.loadingCtrl.create({
      content: "Alterando senha, aguarde..."
    });

    loader.present();
    this.password_config.reset_password_token = this.reset_password_token.raw;
    this.userProvider.update_password({user: this.password_config}).subscribe(
      (data) => {
        this.presentToast('Senha atualizada com sucesso!');
        loader.dismiss();
      },
      (error) => {
        this.presentToast(error.json().error);
        loader.dismiss();
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
