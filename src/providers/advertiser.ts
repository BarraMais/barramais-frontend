import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AdvertiserModel } from "../models/advertiser.model";
import { AdModel } from "../models/ad.model";
import { AuthHttp } from 'angular2-jwt';
import { Routes } from '../providers/routes';

import 'rxjs/add/operator/map';

/*
  Generated class for the Advertiser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Advertiser {

  private host: string;

  private url: string;
  private country_url: string;
  private states_url: string;
  private cities_url: string;
  private create_ad_url: string;
  private destroy_ad: string;
  private update_ad_url: string;
  private advertiser_area_url: string;

  public advertiser: AdvertiserModel;
  public ad: AdModel;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes
  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
   }

  setRoutes(host){
    this.url = host + "advertisers";
    this.country_url = host + "advertisers/country_for_select";
    this.states_url = host + "advertisers/states_for_select/";
    this.cities_url = host + "advertisers/cities_for_select/";
    this.create_ad_url = host + "advertisers/create_ad/";
    this.destroy_ad = host + "ads/";
    this.update_ad_url = host + "ads/"
    this.advertiser_area_url = host + "advertisers/advertiser_area/";
  }

  create(advertiser, address){
    return this.authHttp.post(this.url + ".json", {'advertiser': advertiser, 'address': address})
      .map(res => res.json());
  }

  update(advertiser, address){
    return this.authHttp.put(this.url + '/' + advertiser.id + ".json", {'advertiser': advertiser, 'address': address})
      .map(res => res.json());
  }

  createAd(ad, advertiser){
    // console.log(ad.interest_areas)
    return this.authHttp.post(this.create_ad_url + advertiser.id + ".json", {'ad': ad, 'interest_areas': ad.interest_areas})
      .map(res => res.json())
  }

  updateAd(ad, advertiser){
      return this.authHttp.put(this.update_ad_url + ad.id + ".json", {'ad': ad, 'interest_areas': ad.interest_areas})
        .map(res => res.json());
  }

  destroy(ad){
    return this.authHttp.delete(this.destroy_ad + ad.id + ".json")
      .map(res => res.json())
  }

  getCountry(){
    return this.authHttp.get(this.country_url + ".json")
      .map(res => res.json());
  }

  getStates(country){
    return this.authHttp.get(this.states_url + country + ".json")
      .map(res => res.json());
  }

  getCities(state){
    return this.authHttp.get(this.cities_url + state + ".json")
      .map(res => res.json());
  }

  advertiserArea(advertiser){
    return this.authHttp.get(this.advertiser_area_url + advertiser.id + ".json")
      .map(res => res.json());
  }

}
