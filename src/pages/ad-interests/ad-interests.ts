import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AdvertiserModel } from "../../models/advertiser.model";
import { User } from '../../providers/user';
import { AdModel } from "../../models/ad.model";
import { Advertiser } from '../../providers/advertiser';
import { ToastController } from 'ionic-angular';
import { AdvertiserPage } from '../advertiser/advertiser';
import { Ads } from '../../providers/ads';
import { MidiaKitPage } from '../midia-kit/midia-kit';
import { AdDescriptionsPage } from '../ad-descriptions/ad-descriptions';


/*
  Generated class for the AdInterests page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ad-interests',
  templateUrl: 'ad-interests.html'
})
export class AdInterestsPage {
  host: string = "http://localhost:3000"
  ad: AdModel;
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  advertiser: AdvertiserModel;
  ads: any;
  advertiserPage: AdvertiserPage;
  interestList: any;
  selectedAreas: any[] = [];
  isEditing: boolean = false;
  chosenAreas: any[] = [];
  midiaKit: boolean = false;
  midiaKitPage: MidiaKitPage;
  ad_area: any;
  adDescriptionsPage: any = AdDescriptionsPage;

  constructor(
    public navCtrl: NavController,
    private userProvider: User,
    public navParams: NavParams,
    params: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private advertiserProvider: Advertiser,
    private adsProvider: Ads
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.advertiser = new AdvertiserModel(this.loadAdvertiser(this.current_user));
    this.ad = params.data.ad ? new AdModel(params.data.ad) : new AdModel();

    if(this.ad.interest_areas != null) this.loadSelectedAreas(this.ad);

    this.load_interest_list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdInterestsPage');
  }

  loadAdvertiser(current_user){
    this.userAdvertiser(current_user);
  }

  userAdvertiser(current_user){
    this.userProvider.userAdvertiser(current_user)
      .subscribe(response =>{
        this.advertiser = new AdvertiserModel(response.user_advertiser);
        this.ads = response.user_advertiser.ads;
      }, error => {
          console.log("Erro ao exibir o cadastro de anunciante" + error.json());
      });
  }

  loadSelectedAreas(ad){
    this.selectedAreas = ad.interest_areas;
  }

  load_interest_list(){
    this.adsProvider.load_interest_list()
      .subscribe(response =>{
        this.interestList = response.interest_list;
      }, error => {
          console.log("Erro ao exibir as áreas de interesse" + error.json());
      });
  }

  toggleUserSelectedArea(interestArea){
    var found = false;
    for(var i = 0; i < this.selectedAreas.length; i++){
      if(this.selectedAreas[i].name == interestArea.name){
        this.selectedAreas.splice(this.selectedAreas.indexOf(this.selectedAreas[i]), 1);
        found = true;
      }
    }

    if(!found){
      this.selectedAreas.push(interestArea);
    }

    // console.log(this.selectedAreas);
  }

  checkSelectedAreas(interestArea){
    var check = false;
    for(var i = 0; i < this.selectedAreas.length; i++){
      if(this.selectedAreas[i].name == interestArea.name){
        check = true;
      }
    }

    return check;
  }

  openNextPage(page, ad){
    this.ad.interest_areas = this.selectedAreas;

    if(ad.interest_areas == null || ad.interest_areas.length < 3 || ad.interest_areas.length > 6){
      this.presentToast("O anúncio deve conter no mínimo três áreas de interesse e no máximo de seis!")
    }else{
      this.navCtrl.push(page, {'ad': ad});
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  goBack(){
    this.navCtrl.pop();
  }

}
