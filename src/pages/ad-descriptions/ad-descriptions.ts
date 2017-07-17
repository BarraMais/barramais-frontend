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
import { AdPreviewPage } from '../ad-preview/ad-preview';

/*
  Generated class for the AdDescriptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ad-descriptions',
  templateUrl: 'ad-descriptions.html'
})
export class AdDescriptionsPage {
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
  midiaKitPage: MidiaKitPage;
  ad_area: any;
  adPreviewPage: any = AdPreviewPage;

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
    console.log('ionViewDidLoad AdDescriptionsPage');
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

  openNextPage(page, ad){
    //Adicione validação para a foto

    if(ad.description == ""){
      this.presentToast("O campo de descrição do anúncio precisa ser preenchido!")
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
