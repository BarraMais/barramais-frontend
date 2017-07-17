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
import { Camera } from 'ionic-native';
import { MidiaKitPage } from '../midia-kit/midia-kit';

/*
  Generated class for the Ads page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {
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
  midiaKitPage: MidiaKitPage;

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
    this.isEditing = this.ad.id ? true : false;

    //console.log(this.ad.interest_areas);
    if(this.ad.interest_areas != null) this.loadSelectedAreas(this.ad);
    // console.log(this.chosenAreas);

    this.load_interest_list();
    // console.log(this.interestList);

    // console.log(this.ad);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdsPage');
  }

  loadAdvertiser(current_user){
    this.userAdvertiser(current_user);
  }

  userAdvertiser(current_user){
    this.userProvider.userAdvertiser(current_user)
      .subscribe(response =>{
        //console.log(response.user_advertiser);
        this.advertiser = new AdvertiserModel(response.user_advertiser);
        this.ads = response.user_advertiser.ads;
      }, error => {
          console.log("Erro ao exibir o cadastro de anunciante" + error.json());
      });
  }

  adArea(ad){
    this.adsProvider.adArea(ad)
      .subscribe(response =>{
        this.ad.area = response.ad_area.id;
      }, error => {
        console.log("Erro" + error.json())
      });
  }

  save(ad){
    ad.interest_areas = this.selectedAreas;

    if(ad.area == null){
      this.presentToast("O modelo do anúncio precisa ser escolhido!")
    }else if(ad.interest_areas == null || ad.interest_areas.length < 1){
      this.presentToast("O anúncio deve conter ao menos uma área de interesse!")
    }else if(ad.description == ""){
      this.presentToast("O campo de descrição do anúncio precisa ser preenchido!")
    }else{
      this.advertiserProvider.createAd(ad, this.advertiser)
      .subscribe(response => {
          this.openPage(AdvertiserPage);
          this.presentToast("Anúncio cadastrado com sucesso!");
      }, error => {
          console.log(error.json());
          this.presentToast(error.json());
      });
    }
  }

  update(ad){
    ad.interest_areas = this.selectedAreas;

    if(ad.area == null){
      this.presentToast("O modelo do anúncio precisa ser escolhido!")
    }else if(ad.interest_areas == null || ad.interest_areas.length < 1){
      this.presentToast("O anúncio deve conter ao menos uma área de interesse!")
    }else if(ad.description == ""){
      this.presentToast("O campo de descrição do anúncio precisa ser preenchido!")
    }else{
      this.advertiserProvider.updateAd(ad, this.advertiser)
        .subscribe(response => {
          this.openPage(AdvertiserPage);
          this.presentToast("Anúncio modificado com sucesso!");
        }, error => {
          console.log(error.json());
          this.presentToast(error.json());
        });
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  load_interest_list(){
    this.adsProvider.load_interest_list()
      .subscribe(response =>{
        this.interestList = response.interest_list;
        //console.log(this.interestList);
        // missing = this.interestList - this.selectedAreas;
        // let missing = this.interestList.filter(item => this.selectedAreas.splice);
        // console.log(missing);
      }, error => {
          console.log("Erro ao exibir as áreas de interesse" + error.json());
      });
  }

  getSelect(isChecked, interestArea) {
    if (isChecked) {
      this.selectedAreas.push(interestArea);
    } else {
      this.selectedAreas.splice(this.selectedAreas.indexOf(interestArea), 1);
    }
    console.log(this.selectedAreas);
  }

  loadSelectedAreas(ad){
    this.selectedAreas = ad.interest_areas;
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

    // var found = this.selectedAreas.indexOf(interestArea.id);
    //
    // if(found != -1){
    //   this.selectedAreas.splice(this.selectedAreas.indexOf(this.selectedAreas[found]), 1);
    // }else{
    //   this.selectedAreas.push(interestArea.id);
    // }
    //
    console.log(this.selectedAreas);

    // var found = indexOf(interestArea.id)
    // if found
    //  userSelectedAreasId.splice;
    // else
    // userSelectedAreasId.push(interestArea.id)
    //
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

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a origem da imagem',
      buttons: [
        {
          text: 'Carregar da Galeria',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: true,
      destinationType: Camera.DestinationType.DATA_URL
    };

    Camera.getPicture(options).then(image => {
      this.ad.photo = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.ad.photo;
  }

  toggleMidiaKit(){
    if(this.midiaKit){
      this.midiaKit = false;
    }else{
      this.midiaKit = true;
    }
  }

  showMidiaKit(){
    this.openPage(MidiaKitPage);
  }

}
