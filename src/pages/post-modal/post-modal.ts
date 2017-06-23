import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { NavController, NavParams, ViewController, ActionSheetController, Platform, ModalController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Posts } from '../../providers/posts';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { GalleryModalPage } from "../../pages/gallery-modal/gallery-modal";
import 'rxjs/add/operator/debounceTime';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

/*
  Generated class for the PostModal page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-modal',
  templateUrl: 'post-modal.html'
})
export class PostModalPage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  erro: string = "";
  galleryModal: any = GalleryModalPage;
  postController: any = new FormControl();
  urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  public post: any = {medias: {images: [], videos: [], rich_url:[]}};
  public link_preview: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionsheetCtrl: ActionSheetController,
    public postsProvider: Posts,
    private sanitizer: DomSanitizer,
    private camera: Camera
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    let domain_config = navParams.get('domain_config');
    this.post.domain = domain_config.domain;
    this.post.domain_id = domain_config.domain_id;
  }

  ionViewDidLoad() {
    this.postController.valueChanges.debounceTime(1000).subscribe(e => {
      if(this.urlRegex.test(e)) {
        let link = this.urlRegex.exec(e);
        let loader = this.loadingCtrl.create({
          content: "Carregando dados da url, aguarde..."
        });

        loader.present();
        this.postsProvider.enrich_link(this.post, link[0]).subscribe(
          (link_data) => {
            this.link_preview = link_data;
            this.post.medias.rich_url.push(JSON.stringify(link_data));
            loader.dismiss();
          },
          (error) => {
            console.log(error)
            loader.dismiss();
          }
        );
      }
    });
  }

  transform(url) {
    let videoUrl: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(url);
    return videoUrl;
  }

  openPhotos(photos){
    let modal = this.modalCtrl.create(this.galleryModal, {photos: photos});
    modal.present();
  }

  dismiss(new_post = null) {
    this.post = {medias: {images: [], videos: [], rich_url:[]}};
    this.viewCtrl.dismiss(new_post);
  }

  openMediaOptions() {
    let actionSheet = this.actionsheetCtrl.create({
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

  createPost() {
    let loader = this.loadingCtrl.create({
      content: "Enviando postagem, aguarde..."
    });

    loader.present();
    this.postsProvider.create(this.post).subscribe(
      (post) => {
        this.post = post;
        this.dismiss(this.post);
        loader.dismiss();
      },
      (error) => {
        console.log(error)
        loader.dismiss();
      }
    );
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      allowEdit: true
    };
    let loader = this.loadingCtrl.create({
      content: "Carregando imagem, aguarde..."
    });

    loader.present();
    this.camera.getPicture(options).then(
      image_url => {
        let includeToNewMedia = (image) => {
          let d = new Date;
          let new_name = d.getTime();
          let new_media = {image: 'data:image/jpeg;base64,' + image, filename: new_name};
          this.post.medias.images.push(new_media);
        };

        includeToNewMedia(image_url);
        loader.dismiss();
      },
      error => {
        this.erro = error;
        loader.dismiss();
      }
    );
  }

  // getVideo(sourceType) {
  //   this.mediaCapture.captureVideo();
  // }

  // makeURLPreview(url) {
  //   console.log(url);
  //   if(!this.post.medias) {
  //     // Previewer(url, function(error, data){
  //     //   if(!error) {
  //     //     console.log(data);
  //     //   }
  //     // });
  //   }
  // }
}
