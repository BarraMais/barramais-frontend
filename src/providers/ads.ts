import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Routes } from '../providers/routes';


import 'rxjs/add/operator/map';

/*
  Generated class for the Ads provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Ads {

  private host: string;

  private interest_list_url: string;
  private ad_area_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes
  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

  setRoutes(host){
    this.interest_list_url = host + "ads/interest_list";
    this.ad_area_url = host + "ads/ad_area/";
  }

  load_interest_list(){
    return this.authHttp.get(this.interest_list_url + ".json")
      .map(res => res.json());
  }

  adArea(ad){
    return this.authHttp.get(this.ad_area_url + ad.id + ".json")
      .map(res => res.json());
  }

}
