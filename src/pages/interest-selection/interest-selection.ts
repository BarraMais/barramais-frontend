import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { User } from '../../providers/user';
import { Events } from 'ionic-angular';
import { MainPage } from '../main/main';

/*
  Generated class for the InterestSelection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-interest-selection',
  templateUrl: 'interest-selection.html'
})
export class InterestSelectionPage {
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel;
  user_token: any = localStorage.getItem('user');
  interests: any[] = [];
  userInterests: any[] = [];
  mainPage: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public events: Events,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
      this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));

      this.getInterests();

      this.presentConfirm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestSelectionPage');
  }

  getInterests(){
    this.userProvider.get_interests()
      .subscribe(response =>{
        this.interests = response;
        console.log(this.interests);
      }, error => {
        console.log("Erro ao exibir os interesses" + error.json());
      });
  }

  toggleUserInterests(interest){
    var found = false;
    for(var i = 0; i < this.userInterests.length; i++){
      if(this.userInterests[i].id == interest.id){
        this.userInterests.splice(this.userInterests.indexOf(this.userInterests[i]), 1);
        found = true;
      }
    }

    if(!found){
      this.userInterests.push(interest);
    }

    // console.log(this.userInterests);
  }

  checkUserInterests(interest){
    var check = false;
    for(var i = 0; i < this.userInterests.length; i++){
      if(this.userInterests[i].id == interest.id){
        check = true;
      }
    }

    return check;
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  redirectPage(page){
    this.navCtrl.setRoot(page);
  }

  updateUserInterests(){
    if(this.userInterests.length < 3 || this.userInterests.length > 6){
      this.presentToast("Escolha de 3(três) a 6(seis) interesses para prosseguir.")
    }else{
    this.userProvider.update_user_interests(this.user.id, this.userInterests)
      .subscribe(response =>{
        localStorage.setItem("user", response.user);
        this.redirectPage(this.mainPage);
        // this.presentToast("Lista de interesses atualizada com sucesso!")
      }, error => {
        console.log("Erro ao atualizar os interesses do usuário" + error.json());
      });
    }
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Bem vindo à Barra Mais!',
      message: 'Para continuar, escolha de 3(três) a 6(seis) interesses.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        }
      ]
    });
    alert.present();
  }
}
