import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { Classified } from '../../providers/classified';
import { ProductModel } from "../../models/product.model";
import { ClassifiedProductStatusPage } from '../classified-product-status/classified-product-status';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ClassifiedProductCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-product-category',
  templateUrl: 'classified-product-category.html'
})
export class ClassifiedProductCategoryPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  product: ProductModel;
  productCategories: any;
  productSubCategories: any;
  productSubCategories2: any;
  isSubCategoryEmpty: boolean = false;
  classifiedProductStatusPage: any = ClassifiedProductStatusPage;
  isSubCategory2Empty: boolean = false;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public classifiedProvider: Classified,
    public toastCtrl: ToastController
  ) {
      this.getProductCategories(true);
      this.isEditing = navParams.data.isEditing;

      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.classified = new ClassifiedModel(navParams.data.classified);
      if(this.classified.bonded == true){
        if(this.classified.document_type == 0){
          this.classified.seller_name = this.current_user.first_name;
        }

        this.classified.email = this.current_user.email;
        this.classified.cell_phone = this.current_user.cellphone;
      }

      if(this.isEditing){
        this.product = new ProductModel();
        this.getProductByClassified();
        this.getProductSubCategories(true);
      }else{
        this.product = new ProductModel();
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedProductCategoryPage');
  }

  getProductCategories(firstRun = false){
    this.classifiedProvider.getProductCategories()
      .subscribe(response => {
        this.productCategories = response;
        this.getProductSubCategories(firstRun);
      }, error => {
        console.log(error.json());
      });
  }

  getProductSubCategories(firstRun = false){
    if(!firstRun) this.product.product_sub_category_id = null;
    if(!firstRun) this.product.product_sub_category2_id = null;
    this.productSubCategories2 = [];
    this.classifiedProvider.getProductSubCategories(this.product.product_category_id)
    .subscribe(response => {
    this.productSubCategories = response;
    if(this.productSubCategories.length <= 0){
      this.isSubCategoryEmpty = true;
    }else{
      this.isSubCategoryEmpty = false;
    }
    console.log(firstRun);
    if(firstRun && this.product.product_sub_category2_id != null) this.getProductSubCategories2(true)
    if(this.product.product_sub_category2_id == null && this.isEditing) this.isSubCategory2Empty = true;
    }, error => {
    console.log(error.json());
    });
  }

  getProductSubCategories2(firstRun = false){
    if(!firstRun) this.product.product_sub_category2_id = null;
    console.log(this.product.product_sub_category2_id);
    this.classifiedProvider.getProductSubCategories2(this.product.product_sub_category_id)
    .subscribe(response => {
    this.productSubCategories2 = response;
    console.log(this.productSubCategories2);
    if(this.productSubCategories2.length <= 0){
      this.isSubCategory2Empty = true;
    }else{
      this.isSubCategory2Empty = false;
    }
    }, error => {
    console.log(error.json());
    });
  }

  getProductByClassified(){
    this.classifiedProvider.getProductByClassified(this.classified.id)
      .subscribe(response => {
        this.product = response;
        console.log(this.product);
      }, error => {
        console.log(error.json());
      });
  }

  openNextPage(page, product){
    if(this.product.product_category_id == null || this.product.product_sub_category_id == null){
        this.presentToast("Escolha uma categoria e sub categoria!");
    }else if(this.productSubCategories2.length > 0 && this.product.product_sub_category2_id == null){
        this.presentToast("Escolha uma segunda sub categoria!")
    }else{
      this.navCtrl.push(page, {'product': product, 'classified': this.classified, 'isEditing': this.isEditing});
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
