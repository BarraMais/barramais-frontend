import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { ClassifiedVesselManufacturerPage } from '../classified-vessel-manufacturer/classified-vessel-manufacturer';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ClassifiedVesselStatus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-status',
  templateUrl: 'classified-vessel-status.html'
})
export class ClassifiedVesselStatusPage {
  classified: ClassifiedModel;
  vessel: VesselModel;
  classifiedVesselManufacturerPage: any = ClassifiedVesselManufacturerPage;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
      this.isEditing = navParams.data.isEditing;

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselStatusPage');
  }

  openNextPage(page, vessel, classified){
    var manufacturation_year = this.vessel.manufacturation_year.replace(/-/g, "");
    var activation_year = this.vessel.activation_year.replace(/-/g, "");
    var price = this.classified.price.toString();
    var priceRule = /^([0-9]+[\.]?[0-9]{2}?)$/

    if(this.vessel.manufacturation_year == null || this.vessel.manufacturation_year == ""){
      this.presentToast("Selecione a data de fabricação da embarcação!");
    }else if(this.classified.price <= 0 || !price.match(priceRule)){
      this.presentToast("Insira um valor válido!");
    }else if(this.vessel.activation_year == null || this.vessel.activation_year == ""){
      this.presentToast("Selecione a data de ativação da embarcação!");
    }else if(parseInt(manufacturation_year) > parseInt(activation_year)){
      this.presentToast("A data de fabricação não pode ser maior do que a de ativação!");
    }else{
      this.navCtrl.push(page, {'vessel': vessel, 'classified': classified, 'isEditing': this.isEditing});
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
