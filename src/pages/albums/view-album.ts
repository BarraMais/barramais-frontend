import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController,
Platform, LoadingController, ModalController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AlbumModel } from "../../models/album.model";
//import { PhotoModel } from "../../models/photo.model";
import { User } from '../../providers/user';
import { ProfilePage } from '../profile/profile';
import { PhotoModalPage } from '../photo-modal/photo-modal';


/*
  Generated class for the AlbumPhotoCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-album',
  templateUrl: 'view-album.html'
})
export class ViewAlbumPage {
  album: AlbumModel = new AlbumModel();

  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  photos: Array<any>;
  user: UserModel;
  
  //photo: PhotoModel;
  user_token: any = localStorage.getItem('user');
  profilePage: any = ProfilePage;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private userProvider: User,    
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
  ) {
        this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
        this.album = new AlbumModel();
        this.album.user_id = this.current_user.id;
        this.getPhotos(navParams.data.album.id);    
        this.album = navParams.data.album;
        console.log("album_id = " + navParams.data.album.id);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAlbumPage');
  }

  redirectPage(page) {
    this.navCtrl.setRoot(page);
  }

  goBack(){
    this.navCtrl.pop();
  }

    getPhotos(album_id) {
        this.userProvider.get_album_photos(album_id)
          .subscribe(response => {
            console.log(response);
            this.photos = response;
            //this.checkIfAlbumIsEmpty();
            //loader.dismiss();

          }, error => {
            //loader.dismiss();
            console.log("Erro ao carregar a lista de classificados" + error.json())
        });
    }

    openPhoto(photo) {
        let modal = this.modalCtrl.create(PhotoModalPage, {photo: photo});
        modal.present();
    }
}
