import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/*
  Generated class for the GalleryModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gallery-modal',
  templateUrl: 'gallery-modal.html'
})
export class GalleryModalPage {

  photos: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer
  ) {
    this.photos = navParams.data.photos;
    console.log(navParams.data.photos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryModalPage');
  }

  imageOpen(image_url) {
    this.photoViewer.show(image_url, '', {share: true});
  }
    dismiss() {
        this.navCtrl.pop();
  }
}
