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
import { AdInterestsPage } from '../ad-interests/ad-interests';


/*
  Generated class for the AdBanners page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ad-banners',
  templateUrl: 'ad-banners.html'
})
export class AdBannersPage {
  host: string = "http://localhost:3000"
  ad: AdModel;
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  advertiser: AdvertiserModel;
  ads: any;
  advertiserPage: AdvertiserPage;
  interestList: any;
  selectedAreas: any[] = []
  isEditing: boolean = false;
  chosenAreas: any[] = [];
  midiaKit: boolean = false;
  midiaKitPage: any = MidiaKitPage;
  adInterestsPage: any = AdInterestsPage;
  isAdvertiser: boolean = false;

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdBannersPage');
  }

  loadAdvertiser(current_user){
    this.userAdvertiser(current_user);
  }

  userAdvertiser(current_user){
    this.userProvider.userAdvertiser(current_user)
      .subscribe(response =>{
        if(response.user_advertiser){
          this.advertiser = new AdvertiserModel(response.user_advertiser);
          this.ads = response.user_advertiser.ads;
          this.isAdvertiser = true;
        }
      }, error => {
          console.log("Erro ao exibir o cadastro de anunciante" + error.json());
      });
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  openNextPage(page, ad){
    if(ad.area == null){
      this.presentToast("O modelo do anúncio precisa ser escolhido!")
    }else{
      this.navCtrl.push(page, {ad: ad});
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
