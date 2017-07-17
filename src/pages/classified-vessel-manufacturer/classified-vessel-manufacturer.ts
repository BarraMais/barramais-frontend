import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { Classified } from '../../providers/classified';
import { ClassifiedVesselAccessoriesPage } from '../classified-vessel-accessories/classified-vessel-accessories';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ClassifiedVesselManufacturer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-manufacturer',
  templateUrl: 'classified-vessel-manufacturer.html'
})
export class ClassifiedVesselManufacturerPage {
  classified: ClassifiedModel;
  vessel: VesselModel;
  brands: any;
  molds: any;
  classifiedVesselAccessoriesPage: any = ClassifiedVesselAccessoriesPage;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified,
    public toastCtrl: ToastController
  ) {
      this.isEditing = navParams.data.isEditing;

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);

      this.getBrands(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselManufacturerPage');
  }

  openNextPage(page, vessel){
    if(this.vessel.brand_id == null){
      this.presentToast("Escolha um fabricante!");
    }else if(this.vessel.mold_id == null){
      this.presentToast("Escolha um modelo!")
    }else if(this.vessel.chassis_number == null || this.vessel.chassis_number == ""){
      this.presentToast("Preencha o número do chassi!");
    }else{
      this.navCtrl.push(page, {'vessel': vessel, 'classified': this.classified, 'isEditing': this.isEditing});
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  getBrands(firstRun = false) {
    this.classifiedProvider.getBrands(this.vessel.vessel_type_id)
    .subscribe(response => {
      this.brands = response.brands;
      if(firstRun) this.getMolds(true);
    }, error => {
        console.log(error.json());
    });
  }

  getMolds(firstRun = false) {
    if(!firstRun) this.vessel.mold_id = null;
    this.classifiedProvider.getMolds(this.vessel.brand_id)
    .subscribe(response => {
      this.molds = response.molds;
    }, error => {
        console.log(error.json());
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
