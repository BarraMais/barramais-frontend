import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AlbumModel } from "../../models/album.model";
import { User } from '../../providers/user';
import { ProfilePage } from '../profile/profile';

//import { Camera } from 'ionic-native';
import { Camera } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

import { Platform, LoadingController }  from 'ionic-angular';


/*
  Generated class for the AlbumPhotoCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-album',
  templateUrl: 'create-album.html'
})
export class CreateAlbumPage {
  album: AlbumModel = new AlbumModel();

  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  profilePage: any = ProfilePage;
  isEditing: boolean = false;
  previewImage: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private userProvider: User,
    public toastCtrl: ToastController,
    private camera: Camera,
    public platform: Platform,
    public loadingCtrl: LoadingController,
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.album = new AlbumModel();
      this.album.user_id = this.current_user.id;
      //this.albumPhoto = navParams.data.albumPhoto ? new AlbumPhotoModel(navParams.data.albumPhoto) : new AlbumPhotoModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPhotoCreatePage');
  }

  save(album) {
    if (album.title == null || album.title == "") {
      this.presentToast("O campo nome deve ser preenchido!");
      return;
    }
    /*else if (album.cover_url == null || album.cover_url == "") {
      this.presentToast("Você deve selecionar uma foto de capa!");
      return;
    }*/

    this.userProvider.create_album(album, this.current_user.id)
      .subscribe(response => {
        //this.redirectPage(this.albumListPage);
        this.presentToast("Album cadastrado com sucesso!");
        this.navCtrl.push(this.profilePage, {user: this.current_user});          
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });
  }

  // update(albumPhoto){
  //   this.userProvider.update_album_photo(albumPhoto)
  //     .subscribe(response => {
  //       //this.redirectPage(this.albumListPage);
  //       this.presentToast("Foto atualizada com sucesso!");
  //   }, error => {
  //       console.log(error.json());
  //       this.presentToast(error.json());
  //   });
  // }
    openMediaOptions() {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Carregar midia',
          cssClass: 'page-post-modal',
          buttons: [
            {
              text: 'Carregar da Galeria',
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            },
            {
              text: 'Fotos',
              icon: !this.platform.is('ios') ? 'videocam' : null,
              handler: () => {
                this.takePicture(this.camera.PictureSourceType.CAMERA);
                console.log('Play clicked');
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel', // will always sort to be on the bottom
              icon: !this.platform.is('ios') ? 'close' : null,
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }


    takePicture(sourceType) {
        var options = {
          quality: 90,
          //targetWidth: 1200,
          //targetHeight: 600,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true,
          allowEdit: true
        };

        this.camera.getPicture(options).then(
            image_url => {                
                let includeToNewMedia = (image) => {
                    console.log("img_url ok");
                    this.album.cover_url = 'data:image/jpeg;base64,' + image;    
                    //this.navCtrl.push(this.profilePage, {user: this.current_user});          
                };

                includeToNewMedia(image_url);
            },
          error => {
            //this.erro = error;
            console.log("error 1");
            console.log(error);
          }
        );
    }

    

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  redirectPage(page){
    this.navCtrl.setRoot(page);
  }

  goBack(){
    this.navCtrl.pop();
  }
}
