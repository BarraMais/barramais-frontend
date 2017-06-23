import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { Classified } from '../../providers/classified';
import { ProductModel } from "../../models/product.model";
import { MainPage } from '../main/main';
import { ToastController } from 'ionic-angular';
import { ClassifiedUserListPage } from '../classified-user-list/classified-user-list'

/*
  Generated class for the ClassifiedProductPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-product-preview',
  templateUrl: 'classified-product-preview.html'
})
export class ClassifiedProductPreviewPage {
  classified: ClassifiedModel;
  product: ProductModel;
  classifiedInformation: boolean = false;
  productCategory: any = {};
  productSubCategory: any = {};
  productSubCategory2: any = {};
  mainPage: any = MainPage;
  isEditing: boolean = false;
  classifiedUserListPage: any = ClassifiedUserListPage

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified,
    public toastCtrl: ToastController
  ) {
      this.isEditing = navParams.data.isEditing;

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.product = new ProductModel(navParams.data.product);

      this.getProductCategoryById();
      this.getProductSubCategoryById();
      this.getProductSubCategory2ById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedProductPreviewPage');
  }

  save(){
    this.classifiedProvider.createProduct(this.classified, this.product)
      .subscribe(response => {
        this.redirectPage(this.mainPage);
        this.presentToast("Classificado criado com sucesso!");
      }, error => {
        console.log(error.json());
      });
  }

  update(){
    this.classifiedProvider.updateProduct(this.classified, this.product)
      .subscribe(response => {
        this.redirectPage(this.classifiedUserListPage);
        this.presentToast("Classificado atualizado com sucesso!");
      }, error => {
        console.log(error.json());
      })
  }

  getProductCategoryById(){
    this.classifiedProvider.getProductCategoryById(this.product.product_category_id)
    .subscribe(response => {
      this.productCategory = response;
    }, error => {
        console.log(error.json());
    });
  }

  getProductSubCategoryById(){
    this.classifiedProvider.getProductSubCategoryById(this.product.product_sub_category_id)
    .subscribe(response => {
      this.productSubCategory = response;
    }, error => {
        console.log(error.json());
    });
  }

  getProductSubCategory2ById(){
    if(this.product.product_sub_category2_id != null){
      this.classifiedProvider.getProductSubCategory2ById(this.product.product_sub_category2_id)
        .subscribe(response => {
          this.productSubCategory2 = response;
        }, error => {
          console.log(error.json());
        });
    }
  }

  toggleClassifiedInformation(){
    if(this.classifiedInformation){
      this.classifiedInformation = false;
    }else{
      this.classifiedInformation = true;
    }
  }

  redirectPage(page){
    this.navCtrl.setRoot(page);
  }

  goBack(){
    this.navCtrl.pop();
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
