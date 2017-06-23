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

/*
  Generated class for the Advertiser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advertiser',
  templateUrl: 'advertiser.html'
})
export class AdvertiserPage {
  // host: string = "https://barramais.herokuapp.com";
  host: string = "http://localhost:3000";
  advertiser: AdvertiserModel;
  address: AddressModel = new AddressModel();
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
      }else{
        this.presentToast("Você ainda não é um anunciante, efetue seu cadastro.");
      }

      this.getStates('1');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserPage');
  }

  save(advertiser, address){
    //Falta resetar a cidade quando alterar estado e acertar na validação

    var documentCPFRule = /^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/
    var documentCNPJRule = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})$/
    var documentRule = (advertiser.document_type == "cpf" && advertiser.document_number.match(documentCPFRule)) || (advertiser.document_type == "cnpj" && advertiser.document_number.match(documentCNPJRule)) ? true : false;

    // var phoneRule = /^\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{4,5}[- ]*[0-9]{4}$/
    var phoneRule = /^[0-9]{10,11}$/

    var emailRule = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/

    if(advertiser.document_type == 0){
      this.presentToast("Selecione o tipo de documento do anunciante!");
    }else if(documentRule == false){
      this.presentToast("Insira o número do documento do anunciante!");
    }else if(address.state_id == null){
      this.presentToast("Selecione um estado!");
    }else if(address.city_id == null){
      this.presentToast("Selecione uma cidade!");
    }else if(address.street.length < 3){
      this.presentToast("Insira o endereço do anunciante!");
    }else if(address.complement.length < 3){
      this.presentToast("Insira o complemento!");
    }else if(address.neighborhood.length < 3){
      this.presentToast("Insira o bairro!");
    }else if(!advertiser.email.match(emailRule)){
      this.presentToast("Insira o email do anunciante");
    }else if(!advertiser.cell_phone.match(phoneRule)){
      this.presentToast("Insira o celular do anunciante");
    }else{
      this.advertiserProvider.create(advertiser, address)
      .subscribe(response => {
          this.openPage(AdvertiserPage);
          this.presentToast("Anunciante criado com sucesso!");
      }, error => {
          console.log(error.json());
          this.presentToast(error.json());
      });
    }
  }

  destroy(ad){
    this.advertiserProvider.destroy(ad)
    .subscribe(response => {
      this.presentToast("Anúncio removido com sucesso!");
    });
    this.clearRemovedAd(ad);
    this.checkAdsList();
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
        }else{
          this.advertiser = new AdvertiserModel();
          this.ads = [];
          this.isAdvertiser = false;
          this.presentToast("Você ainda não é um anunciante, efetue seu cadastro.");
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

  openEditPage(page, ad){
    this.navCtrl.push(page, {'ad': ad});
  }

  clearRemovedAd(removedItem){
      this.ads.splice(this.ads.indexOf(removedItem), 1);
  }

}
