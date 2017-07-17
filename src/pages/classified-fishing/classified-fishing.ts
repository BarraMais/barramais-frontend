import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { FishingModel } from "../../models/fishing.model";
import { Classified } from '../../providers/classified';
import { ClassifiedFishingStatusPage } from '../classified-fishing-status/classified-fishing-status';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ClassifiedFishing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-fishing',
  templateUrl: 'classified-fishing.html'
})
export class ClassifiedFishingPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  fishing: FishingModel;
  fishingCategories: any;
  fishingSubCategories: any;
  provisionalCategory: boolean = false;
  classifiedFishingStatusPage: any = ClassifiedFishingStatusPage;
  fishingCategory: any;
  fishingSubCategory: any;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified,
    public toastCtrl: ToastController
  ) {
      this.getFishingCategories(true);
      this.isEditing = navParams.data.isEditing;

      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.classified = new ClassifiedModel(navParams.data.classified);
      if(this.classified.bonded == true){
        if(this.classified.document_type == 0){
          this.classified.seller_name = this.current_user.first_name;
        }

        this.classified.email = this.current_user.email;
        this.classified.cell_phone = this.current_user.cellphone;
      }

      console.log(this.classified);

      if(this.isEditing){
        this.fishing = new FishingModel();
        this.getFishingByClassified();
      }else{
        this.fishing = new FishingModel();
      }

      console.log(this.fishing);
      console.log(this.provisionalCategory);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedFishingPage');
  }

  getFishingCategories(firstRun = false) {
    this.classifiedProvider.getFishingCategories()
    .subscribe(response => {
      this.fishingCategories = response.fishing_categories;
      this.getFishingSubCategories(firstRun);
    }, error => {
        console.log(error.json());
    });
  }

  getFishingSubCategories(firstRun = false) {
    if(!firstRun) this.fishing.fishing_sub_category_id = null;
    this.classifiedProvider.getFishingSubCategories(this.fishing.fishing_category_id)
    .subscribe(response => {
      this.fishingSubCategories = response.fishing_sub_categories;
    }, error => {
        console.log(error.json());
    });
  }

  getFishingByClassified(){
    this.classifiedProvider.getFishingByClassified(this.classified.id)
      .subscribe(response => {
        this.fishing = response;
        console.log(this.fishing);
        if(this.fishing.provisional_category != ""){
          this.provisionalCategory = true;
        }
      }, error => {
          console.log(error.json());
      });
  }

  openNextPage(page, provisionalCategory, fishing){
    if((this.fishing.fishing_category_id == null || this.fishing.fishing_sub_category_id == null) && !provisionalCategory){
      this.presentToast("Escolha uma categoria e sub categoria!");
    }else if(provisionalCategory && (fishing.provisional_category == null || fishing.provisional_category == "")){
      this.presentToast("Preencha o campo de categoria provisória!");
    }else{
      if (!this.provisionalCategory){
        this.fishing.provisional_category = "";
      }

      this.navCtrl.push(page, {'provisionalCategory': provisionalCategory, 'fishing': fishing, 'classified': this.classified, 'isEditing': this.isEditing});
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
