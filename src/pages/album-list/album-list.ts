import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { User } from '../../providers/user';
import { ProfilePage } from '../profile/profile';
import { Camera } from 'ionic-native';
import { ToastController } from 'ionic-angular';
import { PhotoModalPage } from '../photo-modal/photo-modal';
import { AlbumPhotoModel } from "../../models/album_photo.model";
import { AlbumPhotoCreatePage } from '../album-photo-create/album-photo-create';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

/*
  Generated class for the AlbumList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-album-list',
  templateUrl: 'album-list.html'
})
export class AlbumListPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  user: UserModel = new UserModel();
  album: any[] = [];
  isAlbumEmpty: boolean = false;
  profilePage: any = ProfilePage;
  albumPhotoCreatePage: any = AlbumPhotoCreatePage;
  albumPhoto: AlbumPhotoModel = new AlbumPhotoModel();
  isMyAlbum: boolean = false;

  // @ViewChild('photos') photos: ElementRef;

  constructor(
    public photos: ElementRef,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private userProvider: User,
    public toastCtrl: ToastController

  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.user = new UserModel(navParams.data.user);
      this.getUserAlbum();
      this.is_my_album();

      // let elem = this.photos.nativeElement.value
      //
      // console.log(window.getComputedStyle(elem, null).getPropertyValue("width"));
  }


  ionViewDidLoad() {
    setTimeout(() => {
      let elem = this.photos.nativeElement;
      let photos = elem.getElementsByClassName("photo");
      for (let item of photos) {
          console.log(item.style);
          item.style.heigth = window.getComputedStyle(item, null).getPropertyValue("width");
      }
    },1000);
  }

  is_my_album(){
    if(this.current_user.id == this.user.id){
      this.isMyAlbum = true;
    }
  }

  save(albumPhoto){
    let loader = this.loadingCtrl.create({
      content: "Salvando foto na galeria, aguarde..."
    });

    loader.present();

    this.userProvider.create_album_photo(albumPhoto, this.user.id)
      .subscribe(response => {
        // this.redirectPage(this.albumListPage);
        this.album.push(response);
        this.isAlbumEmpty = false;
        loader.dismiss();
        this.presentToast("Foto cadastrada com sucesso!");
    }, error => {
        loader.dismiss();
        console.log(error.json());
        this.presentToast(error.json());
    });
  }

  getUserAlbum(){
    let loader = this.loadingCtrl.create({
      content: "Carregando galeria, aguarde..."
    });

    loader.present();

    this.userProvider.get_user_album(this.user.id)
      .subscribe(response =>{
        console.log(response);
        this.album = response;
        this.checkIfAlbumIsEmpty();
        loader.dismiss();
      }, error => {
        loader.dismiss();
        console.log("Erro ao carregar a lista de classificados" + error.json())
      });
  }

  presentConfirmDestroy(photo) {
    let alert = this.alertCtrl.create({
      title: 'Excluir Foto',
      message: 'Tem certeza que deseja  excluir essa foto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.destroy(photo);
          }
        }
      ]
    });
    alert.present();
  }


  destroy(photo){
    let loader = this.loadingCtrl.create({
      content: "Excluindo foto, aguarde..."
    });

    loader.present();

    this.userProvider.destroy_user_album_photo(photo.id)
    .subscribe(response => {
      loader.dismiss();
    });
    this.clearRemovedPhoto(photo);
    this.checkIfAlbumIsEmpty();
  }

  clearRemovedPhoto(removedItem){
      this.album.splice(this.album.indexOf(removedItem), 1);
  }

  checkIfAlbumIsEmpty(){
    if(this.album.length < 1){
      this.isAlbumEmpty = true;
    }
  }

  openPhoto(photo){
    let modal = this.modalCtrl.create(PhotoModalPage, {photo: photo});
    modal.present();
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  openEditPage(page, albumPhoto){
    this.navCtrl.push(page, {'albumPhoto': albumPhoto});
  }

  goBack(){
    this.navCtrl.setRoot(this.profilePage);
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
      this.albumPhoto.photo = "data:image/jpeg;base64," + image;
      this.save(this.albumPhoto);
    });
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
