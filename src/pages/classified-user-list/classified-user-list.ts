import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { Classified } from '../../providers/classified';
import { ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ClassifiedPage } from '../classified/classified';

/*
  Generated class for the ClassifiedUserList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-user-list',
  templateUrl: 'classified-user-list.html'
})
export class ClassifiedUserListPage {
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  classifieds: any;
  classifiedLoader: any[] = [];
  isClassifiedsEmpty: boolean = true;
  mainPage: any = MainPage;
  classifiedPage: any = ClassifiedPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      console.log(this.current_user);
      this.loadClassifiedList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedUserListPage');
  }

  destroy(classified){
    this.classifiedProvider.destroy(classified.id)
    .subscribe(response => {
      this.presentToast("Classificado removido com sucesso!");
    });
    this.clearRemovedClassified(classified);
    this.checkClassifiedList();
  }

  checkClassifiedList(){
    if(this.classifieds.length > 0){
      this.isClassifiedsEmpty = false;
    }else{
      this.isClassifiedsEmpty = true;
    }
  }

  loadClassifiedList(){
    this.classifiedProvider.getClassifiedsByUser(this.current_user.id)
      .subscribe(response =>{
        this.classifieds = response.classifieds;
        console.log(this.classifieds);
        this.checkClassifiedList();
      }, error => {
        console.log("Erro ao carregar a lista de classificados" + error.json())
      });
  }

  loadMoreClassifieds(index){
    if(this.classifieds.length <= 0){
      this.loadClassifiedList();
    }else{
      this.classifiedProvider.getClassifiedWithStartingId(this.classifieds[this.classifieds.length - 1].id)
        .subscribe(response => {
          this.classifiedLoader = [];
          this.classifiedLoader = response;
          for(var i = 0; i < this.classifiedLoader.length; i++){
            this.classifieds.push(this.classifiedLoader[i]);
          }
          console.log(this.classifieds);
          console.log(response);
        }, error => {
          console.log(error.json());
        });
    }
  }

  clearRemovedClassified(removedItem){
      this.classifieds.splice(this.classifieds.indexOf(removedItem), 1);
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  openEdit(isEditing, classified){
    this.navCtrl.push(this.classifiedPage, {'isEditing': isEditing, 'classified': classified});
  }

  goBack(){
    this.navCtrl.setRoot(this.mainPage);
  }
}
