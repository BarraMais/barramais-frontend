import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { Classified } from '../../providers/classified';
import { ClassifiedVesselDescriptionPage } from '../classified-vessel-description/classified-vessel-description';

/*
  Generated class for the ClassifiedVesselAccessories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-accessories',
  templateUrl: 'classified-vessel-accessories.html'
})
export class ClassifiedVesselAccessoriesPage {
  classified: ClassifiedModel;
  vessel: VesselModel;
  accessories: any;
  communications: any;
  eletronics: any;
  accessory_for_select: any;
  communication_for_select: any;
  eletronic_for_select: any;
  chosenAccessories: any[] = [];
  classifiedVesselDescriptionPage: any = ClassifiedVesselDescriptionPage;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified
  ) {
      this.isEditing = navParams.data.isEditing;

      this.getAccessories();
      this.getCommunications();
      this.getEletronics();

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselAccessoriesPage');
  }

  getAccessories() {
    this.classifiedProvider.getAccessories()
    .subscribe(accessories => {
      this.accessories = accessories;
    }, error => {
        console.log(error.json());
    });
  }

  getCommunications() {
    this.classifiedProvider.getCommunications()
    .subscribe(communications => {
      this.communications = communications;
    }, error => {
        console.log(error.json());
    });
  }

  getEletronics() {
    this.classifiedProvider.getEletronics()
    .subscribe(eletronics => {
      this.eletronics = eletronics;
    }, error => {
        console.log(error.json());
    });
  }

  checkPermissionToInclude(itemForSelect){
    var permissionToInclude = true;
    for(var i = 0; i < this.chosenAccessories.length; i++){
      if(this.chosenAccessories[i].id == itemForSelect){
        permissionToInclude = false;
      }
    }

    return permissionToInclude;
  }

  includeAccessoryToVessel(){
    if(this.checkPermissionToInclude(this.accessory_for_select.id))
      this.chosenAccessories.push(this.accessory_for_select);
  }

  includeCommunicationToVessel(){
    if(this.checkPermissionToInclude(this.communication_for_select.id))
      this.chosenAccessories.push(this.communication_for_select);
  }

  includeEletronicToVessel(){
    if(this.checkPermissionToInclude(this.eletronic_for_select.id))
      // this.includeAccessoryToVessel(this.eletronic_for_select.id);
      this.chosenAccessories.push(this.eletronic_for_select);
  }

  // includeAccessoryToVessel(what_to_include){
  //   this.chosenAccessories.push(what_to_include);
  // }

  excludeAccessoryFromVessel(accessory){
    this.chosenAccessories.splice(this.chosenAccessories.indexOf(accessory), 1);
  }

  openNextPage(page){
    this.navCtrl.push(page, {'vessel': this.vessel, 'classified': this.classified, 'accessories': this.chosenAccessories, 'isEditing': this.isEditing});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
