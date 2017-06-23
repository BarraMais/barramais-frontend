import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { ProductModel } from "../../models/product.model";
import { ClassifiedProductDescriptionPage } from '../classified-product-description/classified-product-description';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ClassifiedProductStatus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-product-status',
  templateUrl: 'classified-product-status.html'
})
export class ClassifiedProductStatusPage {
  classified: ClassifiedModel;
  product: ProductModel;
  classifiedProductDescriptionPage: any = ClassifiedProductDescriptionPage;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
      this.isEditing = navParams.data.isEditing;

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.product = new ProductModel(navParams.data.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedProductStatusPage');
  }

  openNextPage(page, product, classified){
    var price = this.classified.price.toString();
    var priceRule = /^([0-9]+[\.]?[0-9]{2}?)$/

    if(classified.price <= 0 || !price.match(priceRule)){
      this.presentToast("Insira um valor válido!");
    }else{
      this.navCtrl.push(page, {'product': product, 'classified': classified, 'isEditing': this.isEditing});
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
