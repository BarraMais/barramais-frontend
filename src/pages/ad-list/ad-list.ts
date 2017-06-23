import { Advertiser } from '../../providers/advertiser';
import { AdvertiserModel } from "../../models/advertiser.model";
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddressModel } from "../../models/address.model";
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AdsPage } from '../ads/ads';
import { AdBannersPage } from '../ad-banners/ad-banners';
import { AdInterestsPage } from '../ad-interests/ad-interests';
import { AdDescriptionsPage } from '../ad-descriptions/ad-descriptions';
import { AdPreviewPage } from '../ad-preview/ad-preview';
import { MainPage } from '../main/main';

/*
  Generated class for the AdList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ad-list',
  templateUrl: 'ad-list.html'
})
export class AdListPage {
  host: string = "http://localhost:3000";
  advertiser: AdvertiserModel;
  address: AddressModel = new AddressModel();
  cities: any;
  states: any;
  current_user: UserModel;
  user_advertiser: any;
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  ads: any[] = [];
  mainAds: any[] = [];
  adLoader: any[] = [];
  // adCounter: number = 0;
  isAdsEmpty: boolean = true;
  isAdvertiser: boolean = false;
  adsPage: any = AdsPage;
  adBannersPage: any = AdBannersPage;
  adInterestsPage: any = AdInterestsPage;
  adDescriptionsPage: any = AdDescriptionsPage;
  adPreviewPage: any = AdPreviewPage;
  mainPage: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    params: NavParams,
    private advertiserProvider: Advertiser,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.advertiser = new AdvertiserModel(this.loadAdvertiser(this.current_user));

    if(this.advertiser != null){
      this.isAdvertiser = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdListPage');
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
          if(this.ads.length < 2){
            for(var i = 0; i < this.ads.length; i++){
              this.mainAds.push(this.ads[i]);
            }
          }else{
            for(var i = 0; i < 2; i++){
              this.mainAds.push(this.ads[i]);
              // this.adCounter = i;
            }
            // console.log(this.adCounter);
          }
        }else{
          this.advertiser = new AdvertiserModel();
          this.ads = [];
          this.isAdvertiser = false;
        }
        this.checkAdsList();
      }, error => {
          console.log("Erro ao exibir o cadastro de anunciante" + error.json());
      });
  }

  loadMoreAds(){
    if(this.mainAds.length <= 0){
      this.loadAdvertiser(this.current_user);
    }else{
      this.userProvider.getAdsWithStartingId(this.mainAds[this.mainAds.length - 1].id)
        .subscribe(response => {
          this.adLoader = [];
          this.adLoader = response;
          for(var i = 0; i < this.adLoader.length; i++){
            this.mainAds.push(this.adLoader[i]);
          }
        }, error => {
          console.log(error.json());
        });
    }
  }

  checkAdsList(){
    if(this.ads.length < 1){
      this.isAdsEmpty = false;
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  destroy(ad){
    this.advertiserProvider.destroy(ad)
    .subscribe(response => {
      this.presentToast("Anúncio removido com sucesso!");
    });
    this.clearRemovedAd(ad);
    this.checkAdsList();
  }

  clearRemovedAd(removedItem){
      this.ads.splice(this.ads.indexOf(removedItem), 1);
      this.mainAds.splice(this.mainAds.indexOf(removedItem), 1);
  }

  openEditPage(page, ad){
    this.navCtrl.push(page, {'ad': ad});
  }

  goBack(){
    this.navCtrl.setRoot(this.mainPage);
  }

}
