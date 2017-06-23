import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Routes } from '../providers/routes';

import 'rxjs/add/operator/map';

/*
  Generated class for the Classified provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Classified {

  private host: string;
  private url: string;
  private classified_user_url: string;
  private destroy_url: string;
  private create_vessel_url: string;
  private brand_url: string;
  private mold_url: string;
  private brands_url: string;
  private molds_url: string;
  private accessories_url: string;
  private communications_url: string;
  private eletronics_url: string;
  private fishing_categories_url: string;
  private fishing_sub_categories_url: string;
  private create_fishing_url: string;
  private fishing_category_url: string;
  private fishing_sub_category_url: string;
  private product_category_url: string;
  private product_sub_category_url: string;
  private product_category_by_id_url: string;
  private product_sub_category_by_id_url: string;
  private create_product_url: string;
  private product_sub_category_2_url: string;
  private product_sub_category_2_by_id_url: string;
  private vessel_type_url: string;
  private vessel_types_url: string;
  private get_vessel_by_classified_url: string;
  private get_fishing_by_classified_url: string;
  private get_product_by_classified_url: string;
  private update_vessel_url: string;
  private update_fishing_url: string;
  private update_product_url: string;
  private get_all_vessels_by_date_url: string;
  private get_all_fishings_by_date_url: string;
  private get_all_products_by_date_url: string;
  private get_vessels_with_starting_id: string;
  private get_fishings_with_starting_id: string;
  private get_products_with_starting_id: string;
  private get_classified_with_starting_id: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes
  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

  setRoutes(host){
    this.url = host + "classifieds";
    this.classified_user_url = host + "classifieds/get_classifieds_by_user/";
    this.destroy_url = host + "classifieds/";
    this.create_vessel_url = host + "classifieds/create_vessel";
    this.vessel_type_url = host + "classifieds/get_vessel_type_by_id/"
    this.brand_url = host + "classifieds/get_brand_by_id/";
    this.mold_url = host + "classifieds/get_mold_by_id/";
    this.vessel_types_url = host + "classifieds/vessel_types_for_select"
    this.brands_url = host + "classifieds/brands_for_select/";
    this.molds_url = host + "classifieds/molds_for_select/";
    this.accessories_url = host + "classifieds/accessories_for_select";
    this.communications_url = host + "classifieds/communications_for_select";
    this.eletronics_url = host + "classifieds/eletronics_for_select";
    this.fishing_categories_url = host + "classifieds/fishing_categories_for_select";
    this.fishing_sub_categories_url = host + "classifieds/fishing_sub_categories_for_select/";
    this.create_fishing_url = host + "classifieds/create_fishing";
    this.fishing_category_url = host + "classifieds/get_fishing_category_by_id/";
    this.fishing_sub_category_url = host + "classifieds/get_fishing_sub_category_by_id/";
    this.product_category_url = host + "classifieds/product_categories_for_select"
    this.product_sub_category_url = host + "classifieds/product_sub_categories_for_select/"
    this.product_category_by_id_url = host + 'classifieds/get_product_category_by_id/';
    this.product_sub_category_by_id_url = host + 'classifieds/get_product_sub_category_by_id/';
    this.create_product_url = host + 'classifieds/create_product';
    this.product_sub_category_2_url = host + 'classifieds/product_sub_categories_2_for_select/'
    this.product_sub_category_2_by_id_url = host + 'classifieds/get_product_sub_category_2_by_id/';
    this.get_vessel_by_classified_url = host + 'classifieds/get_vessel_by_classified/';
    this.get_fishing_by_classified_url = host + 'classifieds/get_fishing_by_classified/';
    this.get_product_by_classified_url = host + 'classifieds/get_product_by_classified/';
    this.update_vessel_url = host + 'classifieds/update_vessel/';
    this.update_fishing_url = host + 'classifieds/update_fishing/';
    this.update_product_url = host + 'classifieds/update_product/';
    this.get_all_vessels_by_date_url = host + 'classifieds/get_all_vessels_by_date';
    this.get_all_fishings_by_date_url = host + 'classifieds/get_all_fishings_by_date';
    this.get_all_products_by_date_url = host + 'classifieds/get_all_products_by_date';
    this.get_vessels_with_starting_id = host + 'classifieds/get_vessels_with_starting_id/';
    this.get_fishings_with_starting_id = host + 'classifieds/get_fishings_with_starting_id/';
    this.get_products_with_starting_id = host + 'classifieds/get_products_with_starting_id/';
    this.get_classified_with_starting_id = host + 'classifieds/get_classified_with_starting_id/';
  }

  getClassifiedWithStartingId(classified_id){
    return this.authHttp.get(this.get_classified_with_starting_id + classified_id + ".json")
      .map(res => res.json());
  }

  getAllVesselsByDate(){
    return this.authHttp.get(this.get_all_vessels_by_date_url + ".json")
      .map(res => res.json());
  }

  getVesselsWithStartingId(vessel_id){
    return this.authHttp.get(this.get_vessels_with_starting_id + vessel_id + ".json")
      .map(res => res.json());
  }

  getAllFishingsByDate(){
    return this.authHttp.get(this.get_all_fishings_by_date_url + ".json")
      .map(res => res.json());
  }

  getFishingsWithStartingId(fishing_id){
    return this.authHttp.get(this.get_fishings_with_starting_id + fishing_id + ".json")
      .map(res => res.json());
  }

  getAllProductsByDate(){
    return this.authHttp.get(this.get_all_products_by_date_url + ".json")
      .map(res => res.json());
  }

  getProductsWithStartingId(product_id){
    return this.authHttp.get(this.get_products_with_starting_id + product_id + ".json")
      .map(res => res.json());
  }

  getVesselByClassified(classified_id){
    return this.authHttp.get(this.get_vessel_by_classified_url + classified_id + ".json")
      .map(res => res.json());
  }

  getFishingByClassified(classified_id){
    return this.authHttp.get(this.get_fishing_by_classified_url + classified_id + ".json")
      .map(res => res.json());
  }

  getProductByClassified(classified_id){
    return this.authHttp.get(this.get_product_by_classified_url + classified_id + ".json")
      .map(res => res.json());
  }

  createProduct(classified, product){
    return this.authHttp.post(this.create_product_url + ".json", {'classified': classified, 'product': product})
      .map(res => res.json());
  }

  updateProduct(classified, product){
    return this.authHttp.put(this.update_product_url + product.id + ".json", {'classified': classified, 'product': product})
      .map(res => res.json());
  }

  createVessel(classified, vessel, accessories){
    return this.authHttp.post(this.create_vessel_url + ".json", {'classified': classified, 'vessel': vessel, 'accessories': accessories})
      .map(res => res.json());
  }

  updateVessel(classified, vessel, accessories){
    return this.authHttp.put(this.update_vessel_url + vessel.id + ".json", {'classified': classified, 'vessel': vessel, 'accessories': accessories})
      .map(res => res.json());
  }

  createFishing(classified, fishing){
    return this.authHttp.post(this.create_fishing_url + ".json", {'classified': classified, 'fishing': fishing})
      .map(res => res.json());
  }

  updateFishing(classified, fishing){
    return this.authHttp.put(this.update_fishing_url + fishing.id + ".json", {'classified': classified, 'fishing': fishing})
      .map(res => res.json());
  }

  destroy(classified){
    return this.authHttp.delete(this.destroy_url + classified + ".json")
      .map(res => res.json());
  }

  getClassifiedsByUser(user){
    return this.authHttp.get(this.classified_user_url + user + ".json")
      .map(res => res.json());
  }

  getClassified(classified_id){
    return this.authHttp.get(this.url + '/' + classified_id + ".json")
      .map(res => res.json());
  }

  getVesselTypeById(vessel_type){
    return this.authHttp.get(this.vessel_type_url + vessel_type + ".json")
      .map(res => res.json());
  }

  getBrandById(brand){
    return this.authHttp.get(this.brand_url + brand + ".json")
      .map(res => res.json());
  }

  getMoldById(mold){
    return this.authHttp.get(this.mold_url + mold + ".json")
      .map(res => res.json());
  }

  getVesselTypes(){
    return this.authHttp.get(this.vessel_types_url + ".json")
      .map(res => res.json());
  }

  getBrands(vessel_type){
    return this.authHttp.get(this.brands_url + vessel_type + ".json")
      .map(res => res.json());
  }

  getMolds(brand){
    return this.authHttp.get(this.molds_url + brand + ".json")
      .map(res => res.json());
  }

  getAccessories(){
    return this.authHttp.get(this.accessories_url + ".json")
      .map(res => res.json());
  }

  getCommunications(){
    return this.authHttp.get(this.communications_url + ".json")
      .map(res => res.json());
  }

  getEletronics(){
    return this.authHttp.get(this.eletronics_url + ".json")
      .map(res => res.json());
  }

  getFishingCategoryById(category){
    return this.authHttp.get(this.fishing_category_url + category + ".json")
      .map(res => res.json());
  }

  getFishingSubCategoryById(subCategory){
    return this.authHttp.get(this.fishing_sub_category_url + subCategory + ".json")
      .map(res => res.json());
  }

  getFishingCategories(){
    return this.authHttp.get(this.fishing_categories_url + ".json")
      .map(res => res.json());
  }

  getFishingSubCategories(fishing_category){
    return this.authHttp.get(this.fishing_sub_categories_url + fishing_category + ".json")
      .map(res => res.json());
  }

  getProductCategories(){
    return this.authHttp.get(this.product_category_url + ".json")
      .map(res => res.json());
  }

  getProductSubCategories(product_category){
    return this.authHttp.get(this.product_sub_category_url + product_category + ".json")
      .map(res => res.json());
  }

  getProductSubCategories2(product_sub_category_2){
    return this.authHttp.get(this.product_sub_category_2_url + product_sub_category_2 + ".json")
      .map(res => res.json());
  }

  getProductCategoryById(category){
    return this.authHttp.get(this.product_category_by_id_url + category + ".json")
      .map(res => res.json());
  }

  getProductSubCategoryById(sub_category){
    return this.authHttp.get(this.product_sub_category_by_id_url + sub_category + ".json")
      .map(res => res.json());
  }

  getProductSubCategory2ById(sub_category_2){
    return this.authHttp.get(this.product_sub_category_2_by_id_url + sub_category_2 + ".json")
      .map(res => res.json());
  }
}
