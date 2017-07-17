import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { Classified } from '../../providers/classified';
import { ClassifiedFishingPage } from '../classified-fishing/classified-fishing';
import { MainPage } from '../main/main';
import { ClassifiedPage } from '../classified/classified';

/*
  Generated class for the ClassifiedShowProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-show-products',
  templateUrl: 'classified-show-products.html'
})
export class ClassifiedShowProductsPage {
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  products: any[] = [];
  productLoader: any[] = [];
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
      this.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedShowProductsPage');
  }

  getProducts(){
    this.classifiedProvider.getAllProductsByDate()
      .subscribe(response => {
        this.products = response;
        for(var i = 0; i < this.products.length; i++){
          this.getClassified(i);
        }
        if(this.products.length > 0){
          this.isClassifiedEmpty = false;
        }
        console.log(this.classifieds);
      }, error => {
        console.log(error.json());
      });
  }

  loadMoreProducts(){
    if(this.products.length <= 0){
      this.getProducts();
    }else{
      this.classifiedProvider.getProductsWithStartingId(this.products[this.products.length - 1].id)
        .subscribe(response => {
          this.productLoader = [];
          this.productLoader = response;
          for(var i = 0; i < this.productLoader.length; i++){
            this.products.push(this.productLoader[i]);
          }
          for(var i = 0; i < this.productLoader.length; i++){
            this.getClassifiedForLoader(i);
          }
        }, error => {
          console.log(error.json());
        });
    }
  }

  getClassified(index){
    this.classifiedProvider.getClassified(this.products[index].classified_id)
      .subscribe(response => {
        this.classifieds.push(response);
        console.log(this.classifieds);
      }, error => {
        console.log(error.json());
      });
  }

  getClassifiedForLoader(index){
    this.classifiedProvider.getClassified(this.productLoader[index].classified_id)
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
