import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { ClassifiedModel } from "../../models/classified.model";
import { ClassifiedVesselTypePage } from '../classified-vessel-type/classified-vessel-type';
import { ClassifiedFishingPage } from '../classified-fishing/classified-fishing';
import { ClassifiedProductCategoryPage } from '../classified-product-category/classified-product-category';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Classified page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified',
  templateUrl: 'classified.html'
})
export class ClassifiedPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  classifiedConditional: number = 0;
  classifiedVesselTypePage: any = ClassifiedVesselTypePage;
  classifiedFishingPage: any = ClassifiedFishingPage;
  classifiedProductCategoryPage: any = ClassifiedProductCategoryPage;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
      this.isEditing = navParams.data.isEditing ? navParams.data.isEditing : false;
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      if(this.isEditing){
        this.classified = new ClassifiedModel(navParams.data.classified);
        console.log(this.classified);
      }else{
        this.classified = new ClassifiedModel();
        this.classified.classified_conditional = navParams.data.classifiedConditional;
        console.log(this.classified);
      }
      this.classified.user_id = this.current_user.id;

      this.classifiedConditional = this.classified.classified_conditional;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedPage');
  }

  openNextPage(page, classified){
    var emailRule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var documentCPFRule = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/
    var documentCNPJRule = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})$/
    // var phoneRule = /^\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{4,5}[- ]*[0-9]{4}$/
    var phoneRule = /^[0-9]{10,11}$/
    var documentRule = (classified.document_type == 0 && classified.document_number.match(documentCPFRule)) || (classified.document_type == 1 && classified.document_number.match(documentCNPJRule)) ? true : false;

    if((!classified.bonded && (classified.seller_name == null || classified.seller_name == "")) || (classified.bonded && classified.document_type == 1 && (classified.seller_name == null || classified.seller_name == ""))){
      if(classified.document_type == 1){
        this.presentToast("Preencha a razão social corretamente!");
      }else{
        this.presentToast("Preencha o nome corretamente!");
      }
    }else if(!documentRule){
      this.presentToast("Preencha o número do documento corretamente!");
    }else if(!classified.bonded && !classified.email.match(emailRule)){
      this.presentToast("Preencha o campo email corretamente!");
    }else if(!classified.bonded && !classified.cell_phone.match(phoneRule)){
      this.presentToast("Preencha o celular corretamente!");
    }else if(!classified.landline.match(phoneRule)){
      this.presentToast("Preencha o telefone corretamente!");
    }else{
      this.navCtrl.push(page, {'classified': classified, 'isEditing': this.isEditing});
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
