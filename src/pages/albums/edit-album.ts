import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AlbumModel } from "../../models/album.model";
import { PhotoModel } from "../../models/photo.model";
import { User } from '../../providers/user';
import { ProfilePage } from '../profile/profile';
//import { Camera } from 'ionic-native';
import { Camera } from '@ionic-native/camera';
import { ToastController, Platform, LoadingController } from 'ionic-angular';
import { PhotoModalPage } from '../photo-modal/photo-modal';
/*
  Generated class for the AlbumPhotoCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component(
{
  selector: 'page-edit-album',
  templateUrl: 'edit-album.html'
} )
export class EditAlbumPage
{
  album: AlbumModel = new AlbumModel();
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem( 'user' );
  profilePage: any = ProfilePage;
  isEditing: boolean = false;
  previewImage: string = '';
  photos: Array < any > ;
  newPhotos: Array < any > = [];
  constructor( public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, private userProvider: User, public toastCtrl: ToastController, private camera: Camera, public platform: Platform, public loadingCtrl: LoadingController, public modalCtrl: ModalController ) {
    this.current_user = new UserModel( this.jwtHelper.decodeToken( this.user_token ) );
    this.album.user_id = this.current_user.id;
    //console.log("navParams.data.album");
    //console.log(navParams.data.album);
    this.getPhotos( navParams.data.album.album_id );
    this.album = new AlbumModel();
    this.album = navParams.data.album;
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad AlbumPhotoCreatePage' );
  }

  updateAlbum( album ) {

    if ( this.album.title == null || album.title == "" ) {
      this.presentToast( "O campo nome deve ser preenchido!" );
      return;
    }
    // else if (album.cover_url == null || album.cover_url == "") {
    //   this.presentToast("Você deve selecionar uma foto de capa!");
    //   return;
    // }
    //change title, cover photo
    console.log( "save album" );
    console.log( album );
    console.log( album.album_id );
    this.userProvider.edit_album(album)
      .subscribe(response => {
        console.log("titulo trocado com sucesso")
      }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });

    if ( this.newPhotos.length > 0 ) {
      this.userProvider.add_photos_to_album( album.album_id, this.newPhotos )
      .subscribe( response => {
        //this.redirectPage(this.albumListPage);
        this.presentToast( "Album atualizado com sucesso!" );
        this.navCtrl.pop();
      }, error => {
        console.log( error.json() );
        this.presentToast( error.json() );
      } );
    }
    else {
      this.presentToast( "Album atualizado com sucesso!" );
      this.navCtrl.pop();
    }
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

    deletePhoto(photo) {
        console.log(photo);
        let alert = this.alertCtrl.create({
        title: '',
        message: 'Tem certeza que deseja deletar a photo?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
            text: 'Sim',
            handler: () => {
                this.userProvider.delete_photo(photo.id)
                  .subscribe(response => {
                    console.log(response);
                    console.log("deletar photo");
                    const length = this.photos.length; //cache
                    for (let i = 0; i < length; i++) {
                        if (this.photos[i] == photo) {
                            this.photos.splice(i, 1);
                        }
                    }
                    this.presentToast( "Foto deletada com sucesso!" );
                  }, error => {
                    //loader.dismiss();
                    console.log("Erro ao deletar photo" + error.json())
                });
            }
        }
      ]
    });
        alert.present();
    }

  openMediaOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Carregar midia',
      cssClass: 'page-post-modal',
      buttons: [ {
        text: 'Carregar da Galeria',
        handler: () => {
          this.takePicture( this.camera.PictureSourceType.PHOTOLIBRARY );
        }
      },
      {
        text: 'Fotos',
        icon: !this.platform.is( 'ios' ) ? 'videocam' : null,
        handler: () => {
          this.takePicture( this.camera.PictureSourceType.CAMERA );
          console.log( 'Play clicked' );
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel', // will always sort to be on the bottom
        icon: !this.platform.is( 'ios' ) ? 'close' : null,
        handler: () => {
          console.log( 'Cancel clicked' );
        }
      } ]
    } );
    actionSheet.present();
  }

  takePicture( sourceType ) {
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
    this.camera.getPicture( options ).then( image_url =>
    {
      let includeToNewMedia = ( image ) =>
      {
        console.log( "got the image" );
        let newPhoto = new PhotoModel();
        //newPhoto.url = 'data:image/jpeg;base64,' + image;
        newPhoto.image = 'data:image/jpeg;base64,' + image;
        let date = new Date;
        //newPhoto.filename = ( this.current_user.id + date.getTime() ).toFixed( 2 );
        //newPhoto.original_filename = ( this.current_user.id + date.getTime() ).toFixed( 2 );
        this.newPhotos.push( newPhoto );
        this.photos.push( newPhoto );
        //this.photos.push('data:image/jpeg;base64,' + image);
        //console.log(this.photos);
      };
      includeToNewMedia( image_url );
    }, error =>
    {
      //this.erro = error;
      console.log( "error 1" );
      console.log( error );
    } );
  }
  presentToast( msg )
  {
    let toast = this.toastCtrl.create(
    {
      message: msg,
      duration: 5000
    } );
    toast.present();
  }
  redirectPage( page )
  {
    this.navCtrl.setRoot( page );
  }

  goBack() {
    this.navCtrl.pop();
  }

  getPhotos( album_id ) {
    this.userProvider.get_album_photos( album_id ).subscribe( response => {
      console.log( response );
      this.photos = response;

      //console.log( "photos" );
      //console.log( this.photos );
      //this.checkIfAlbumIsEmpty();
      //loader.dismiss();
    }, error => {
      //loader.dismiss();
      console.log( "Erro ao carregar a lista de classificados" + error.json() )
    } );
  }

  openPhoto( photo )
  {
    let modal = this.modalCtrl.create( PhotoModalPage,
    {
      photo: photo
    } );
    modal.present();
  }
}