import { Advertiser } from '../../providers/advertiser';
import { AdvertiserModel } from "../../models/advertiser.model";
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AdsPage } from '../ads/ads';
import { AdBannersPage } from '../ad-banners/ad-banners';
import { AdInterestsPage } from '../ad-interests/ad-interests';
import { AdDescriptionsPage } from '../ad-descriptions/ad-descriptions';
import { AdPreviewPage } from '../ad-preview/ad-preview';
import { AdListPage } from '../ad-list/ad-list';


/*
  Generated class for the AdvertiserPayment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advertiser-payment',
  templateUrl: 'advertiser-payment.html'
})
export class AdvertiserPaymentPage {
  host: string = "http://localhost:3000";
  advertiser: AdvertiserModel;
  address: any;
  cities: any;
  states: any;
  current_user: UserModel;
  user_advertiser: any;
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  ads: any;
  isAdsEmpty: boolean = true;
  isAdvertiser: boolean = false;
  adsPage: any = AdsPage;
  adBannersPage: any = AdBannersPage;
  adInterestsPage: any = AdInterestsPage;
  adDescriptionsPage: any = AdDescriptionsPage;
  adPreviewPage: any = AdPreviewPage;
  adListPage: any = AdListPage;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    params: NavParams,
    private advertiserProvider: Advertiser,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.advertiser = new AdvertiserModel(params.data.advertiser);
    this.isEditing = this.advertiser.id ? true : false;

    if(this.advertiser.address.street != ""){
      this.address = this.advertiser.address;
    }else{
      this.address = params.data.address;
    }
    // console.log(this.address);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserPaymentPage');
  }

  loadAdvertiser(current_user){
    this.userAdvertiser(current_user);
  }

  userAdvertiser(current_user){
    this.userProvider.userAdvertiser(current_user)
      .subscribe(response =>{
        if(response.user_advertiser){
          this.advertiser = response.user_advertiser;
          this.ads = response.user_advertiser.ads;
          this.address = response.user_advertiser.address;
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

  getCountry() {
    this.advertiserProvider.getCountry()
    .subscribe(response => {
      console.log(response);
    }, error => {
        console.log(error.json());
    });
  }

  getStates(country) {
    this.advertiserProvider.getStates(country)
    .subscribe(response => {
      this.states = response.states;
    }, error => {
        console.log(error.json());
    });
  }

  getCities() {
    this.advertiserProvider.getCities(this.address.state_id)
    .subscribe(response => {
      this.cities = response.cities;
    }, error => {
        console.log(error.json());
    });
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  redirectPage(page){
    this.navCtrl.setRoot(page);
  }

  openEditPage(page, ad){
    this.navCtrl.push(page, {'ad': ad});
  }

  clearRemovedAd(removedItem){
      this.ads.splice(this.ads.indexOf(removedItem), 1);
  }

  goBack(){
    this.navCtrl.pop();
  }

  save(advertiser, address){
    var documentCPFRule = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/
    var documentCNPJRule = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})$/
    var documentRule = (advertiser.document_type == 0 && advertiser.document_number.match(documentCPFRule)) || (advertiser.document_type == 1 && advertiser.document_number.match(documentCNPJRule)) ? true : false;

    // var phoneRule = /^\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{4,5}[- ]*[0-9]{4}$/
    var phoneRule = /^[0-9]{10,11}$/

    // console.log(advertiser.cell_phone);

    // var emailRule = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/

    // if(advertiser.document_type == 0){
    //   this.presentToast("Selecione o tipo de documento do anunciante!");
    // }else
    if(documentRule == false){
      this.presentToast("Insira o número do documento do anunciante!");
    }else if(address.state_id == ""){
      this.presentToast("Selecione um estado!");
    }else if(address.city_id == ""){
      this.presentToast("Selecione uma cidade!");
    }else if(address.street.length < 3){
      this.presentToast("Insira o endereço do anunciante!");
    }else if(address.complement.length < 3){
      this.presentToast("Insira o complemento!");
    }else if(address.neighborhood.length < 3){
      this.presentToast("Insira o bairro!");
    }else if(!advertiser.cell_phone.match(phoneRule)){
      this.presentToast("Insira o celular do anunciante");
    }else{
      this.advertiserProvider.create(advertiser, address)
      .subscribe(response => {
          this.redirectPage(this.adListPage);
          this.presentToast("Anunciante criado com sucesso!");
      }, error => {
          console.log(error.json());
          this.presentToast(error.json());
      });
    }
  }

  update(advertiser, address){
    var documentCPFRule = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/
    var documentCNPJRule = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})$/
    var documentRule = (advertiser.document_type == 0 && advertiser.document_number.match(documentCPFRule)) || (advertiser.document_type == 1 && advertiser.document_number.match(documentCNPJRule)) ? true : false;

    // var phoneRule = /^\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{4,5}[- ]*[0-9]{4}$/
    var phoneRule = /^[0-9]{10,11}$/

    // var emailRule = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/

    // if(advertiser.document_type == 0){
    //   this.presentToast("Selecione o tipo de documento do anunciante!");
    // }else
    if(documentRule == false){
      this.presentToast("Insira o número do documento do anunciante!");
    }else if(address.state_id == ""){
      this.presentToast("Selecione um estado!");
    }else if(address.city_id == ""){
      this.presentToast("Selecione uma cidade!");
    }else if(address.street.length < 3){
      this.presentToast("Insira o endereço do anunciante!");
    }else if(address.complement.length < 3){
      this.presentToast("Insira o complemento!");
    }else if(address.neighborhood.length < 3){
      this.presentToast("Insira o bairro!");
    }else if(!advertiser.cell_phone.match(phoneRule)){
      this.presentToast("Insira o celular do anunciante");
    }else{
      this.advertiserProvider.update(advertiser, address)
      .subscribe(response => {
          this.redirectPage(this.adListPage);
          this.presentToast("Anunciante editado com sucesso!");
      }, error => {
          console.log(error.json());
          this.presentToast(error.json());
      });
    }
  }

}
