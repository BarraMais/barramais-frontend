import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { FishingModel } from "../../models/fishing.model";
import { Classified } from '../../providers/classified';
import { ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ClassifiedUserListPage } from '../classified-user-list/classified-user-list'

/*
  Generated class for the ClassifiedFishingPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-fishing-preview',
  templateUrl: 'classified-fishing-preview.html'
})
export class ClassifiedFishingPreviewPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  fishing: FishingModel;
  fishingCategory: any = {};
  fishingSubCategory: any = {};
  classifiedInformation: boolean = false;
  mainPage: any = MainPage;
  isEditing: boolean = false;
  classifiedUserListPage: any = ClassifiedUserListPage
  provisionalCategory: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified,
    public toastCtrl: ToastController
  ) {
      this.isEditing = navParams.data.isEditing;
      this.provisionalCategory = navParams.data.provisionalCategory;
      console.log(this.provisionalCategory);

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.fishing = new FishingModel(navParams.data.fishing);

      if(!this.provisionalCategory){
        this.getFishingCategory();
        this.getFishingSubCategory();
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedFishingPreviewPage');
  }

  save(){
    this.classifiedProvider.createFishing(this.classified, this.fishing)
    .subscribe(response => {
        this.redirectPage(this.mainPage);
        this.presentToast("Classificado criado com sucesso!");
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });
  }

  update(){
    this.classifiedProvider.updateFishing(this.classified, this.fishing)
    .subscribe(response => {
      this.redirectPage(this.classifiedUserListPage);
      this.presentToast("Classificado atualizado com sucesso!");
    }, error => {
      console.log(error.json());
    });
  }

  getFishingCategory() {
    if(this.fishing.fishing_category_id != null){
      this.classifiedProvider.getFishingCategoryById(this.fishing.fishing_category_id)
      .subscribe(response => {
        this.fishingCategory = response.fishing_category;
      }, error => {
          console.log(error.json());
      });
    }
  }

  getFishingSubCategory() {
    if(this.fishing.fishing_sub_category_id != null){
      this.classifiedProvider.getFishingSubCategoryById(this.fishing.fishing_sub_category_id)
      .subscribe(response => {
        this.fishingSubCategory = response.fishing_sub_category;
      }, error => {
          console.log(error.json());
      });
    }
  }

  toggleClassifiedInformation(){
    if(this.classifiedInformation){
      this.classifiedInformation = false;
    }else{
      this.classifiedInformation = true;
    }
  }

  redirectPage(page){
    this.navCtrl.setRoot(page);
  }

  goBack(){
    this.navCtrl.pop();
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
