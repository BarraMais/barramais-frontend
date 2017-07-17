import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Routes } from '../providers/routes';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the Search provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Search {
  private host: string;
  look_for_host: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes
  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

  setRoutes(host){
    this.look_for_host = host + "/search/look_for.json?query_param=";
  }

  look_for(query_param) {
    return this.authHttp.get(this.look_for_url(query_param))
      .map(res => res.json());
  }

  look_for_url(params) {
    return this.look_for_host + params;
  }
}
