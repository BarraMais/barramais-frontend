import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { User } from '../../providers/user';
import { ToastController, AlertController } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

@Component({

  selector: 'page-user-popover',
  template: `    
      <p (click)="unfriend(user)">EXCLUIR AMIGO</p>
      <p (click)="close()">BLOQUEAR</p>
      <p (click)="close()">NÃO VER PUBLICAÇÕES</p>
  `
})
export class UserPopover {
    user_token: any = localStorage.getItem('user');
    user: UserModel = new UserModel();
    jwtHelper: JwtHelper = new JwtHelper();
    selectedPopoverOption: string;


  constructor(
    public viewCtrl: ViewController, 
    private userProvider: User,
    public toastCtrl: ToastController,
    ) {
        this.selectedPopoverOption = "";
        this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
  }

  close() {
    this.viewCtrl.dismiss(this.selectedPopoverOption);
  }

  unfriend(user) {
    console.log("unfriend was called");
    this.selectedPopoverOption = "unfriend";
    this.userProvider.unfriend(user)
    .subscribe(
      (response) =>{
        this.presentToast(response.status);        
        this.close();
      },
      (error) => {
        console.log(error.json());
        this.close();
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