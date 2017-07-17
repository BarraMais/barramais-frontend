import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { FishingModel } from "../../models/fishing.model";
import { Camera } from 'ionic-native';
import { ClassifiedFishingPreviewPage } from '../classified-fishing-preview/classified-fishing-preview';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ClassifiedFishingDescription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-fishing-description',
  templateUrl: 'classified-fishing-description.html'
})
export class ClassifiedFishingDescriptionPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  fishing: FishingModel;
  classifiedFishingPreviewPage: any = ClassifiedFishingPreviewPage;
  isEditing: boolean = false;
  provisionalCategory: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
      this.isEditing = navParams.data.isEditing;
      this.provisionalCategory = navParams.data.provisionalCategory;

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.fishing = new FishingModel(navParams.data.fishing);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedFishingDescriptionPage');
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
      this.classified.photo = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.classified.photo;
  }

  openNextPage(page, classified){
    if(classified.title == null || classified.title == ""){
      this.presentToast("Preencha o título do classificado!");
    }else if(classified.description == null || classified.description == ""){
      this.presentToast("Preencha a descrição do classificado!");
    }else{
      this.navCtrl.push(page, {'fishing': this.fishing, 'classified': classified, 'isEditing': this.isEditing, 'provisionalCategory': this.provisionalCategory});
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
