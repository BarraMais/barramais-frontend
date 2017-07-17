import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/*
  Generated class for the GalleryModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photo-modal',
  templateUrl: 'photo-modal.html'
})
export class PhotoModalPage {

  photo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer
  ) {
    this.photo = navParams.data.photo;
    console.log(navParams.data.photo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoModalPage');
  }

  imageOpen(image_url){
    this.photoViewer.show(image_url, '', {share: true});
  }

}
