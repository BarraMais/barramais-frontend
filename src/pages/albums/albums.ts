import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AlbumModel } from "../../models/album.model";
import { User } from '../../providers/user';
import { AlbumPhotoModel } from "../../models/album_photo.model";
import { Camera } from 'ionic-native';
import { ToastController } from 'ionic-angular';
import { AlbumListPage } from '../album-list/album-list';

/*
  Generated class for the AlbumPhotoCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'albums',
  templateUrl: 'albums.html'
})
export class AlbumsPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  album: AlbumModel;
  user_token: any = localStorage.getItem('user');
  albumPhoto: AlbumPhotoModel;
  isEditing: boolean = false;
  albumListPage: any = AlbumListPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.albumPhoto = navParams.data.albumPhoto ? new AlbumPhotoModel(navParams.data.albumPhoto) : new AlbumPhotoModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPhotoCreatePage');
  }

  save(albumPhoto){
    this.userProvider.create_album_photo(albumPhoto, this.current_user.id)
      .subscribe(response => {
        this.redirectPage(this.albumListPage);
        this.presentToast("Foto cadastrada com sucesso!");
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });
  }

  update(albumPhoto){
    this.userProvider.update_album_photo(albumPhoto)
      .subscribe(response => {
        this.redirectPage(this.albumListPage);
        this.presentToast("Foto atualizada com sucesso!");
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
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
      //mediaType: Camera.MediaType.ALLMEDIA,
      destinationType: Camera.DestinationType.DATA_URL
    };

    Camera.getPicture(options).then(image => {
      let prompt = this.alertCtrl.create({
        title: 'Usar foto',
        message: 'Deseja usar esta foto como foto de perfil?',
        buttons: [
          {
            text: 'Não',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sim',
            handler: data => {
              this.albumPhoto.photo = "data:image/jpeg;base64," + image;
              this.save(this.albumPhoto);
            }
          }
        ]
      });
      prompt.present();
    });
  }

  presentToast(msg){
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
