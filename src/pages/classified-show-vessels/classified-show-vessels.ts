import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { Classified } from '../../providers/classified';
import { ClassifiedFishingPage } from '../classified-fishing/classified-fishing';
import { MainPage } from '../main/main';
import { ClassifiedPage } from '../classified/classified';

/*
  Generated class for the ClassifiedShowVessels page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-show-vessels',
  templateUrl: 'classified-show-vessels.html'
})
export class ClassifiedShowVesselsPage {
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  vessels: any[] = [];
  vesselLoader: any[] = [];
  classifieds: any[] = [];
  isClassifiedEmpty: boolean = true;
  mainPage: any = MainPage;
  classifiedPage: any = ClassifiedPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public classifiedProvider: Classified
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.getVessels();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedShowVesselsPage');
  }

  getVessels(){
    this.classifiedProvider.getAllVesselsByDate()
      .subscribe(response => {
        this.vessels = response;
        for(var i = 0; i < this.vessels.length; i++){
          this.getClassified(i);
        }
        if(this.vessels.length > 0){
          this.isClassifiedEmpty = false;
        }
        console.log(this.classifieds);
      }, error => {
        console.log(error.json());
      });
  }

  loadMoreVessels(){
    if(this.vessels.length <= 0){
      this.getVessels();
    }else{
      this.classifiedProvider.getVesselsWithStartingId(this.vessels[this.vessels.length - 1].id)
        .subscribe(response => {
          this.vesselLoader = [];
          this.vesselLoader = response;
          for(var i = 0; i < this.vesselLoader.length; i++){
            this.vessels.push(this.vesselLoader[i]);
          }
          for(var i = 0; i < this.vesselLoader.length; i++){
            this.getClassifiedForLoader(i);
          }
        }, error => {
          console.log(error.json());
        });
    }
  }

  getClassified(index){
    this.classifiedProvider.getClassified(this.vessels[index].classified_id)
      .subscribe(response => {
        this.classifieds.push(response);
        console.log(this.classifieds);
      }, error => {
        console.log(error.json());
      });
  }

  getClassifiedForLoader(index){
    this.classifiedProvider.getClassified(this.vesselLoader[index].classified_id)
      .subscribe(response => {
        this.classifieds.push(response);
        console.log(this.classifieds);
      }, error => {
        console.log(error.json());
      });
  }

  openPageWithClassifiedConditional(page, classifiedConditional){
    this.navCtrl.push(page, {'classifiedConditional': classifiedConditional});
  }

  goBack(){
    this.navCtrl.setRoot(this.mainPage);
  }

}
