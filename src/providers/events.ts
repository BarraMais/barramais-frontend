import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Routes } from '../providers/routes';

import 'rxjs/add/operator/map';

/*
  Generated class for the Events provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {

  private host: string;
  private url: string;
  private country_url: string;
  private states_url: string;
  private cities_url: string;
  private invitation_url: string;
  private all_guests_url: string;
  private confirmed_guests_url: string;
  private pending_guests_url: string;
  private refused_guests_url: string;
  private is_on_event_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes

  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

  setRoutes(host){
    this.url = this.host + "events";
    this.country_url = this.host + "events/country_for_select";
    this.states_url = this.host + "events/states_for_select/";
    this.cities_url = this.host + "events/cities_for_select/";
    this.invitation_url = this.host + "events/invitation/";
    this.all_guests_url = this.host + "events/all_guests/";
    this.confirmed_guests_url = this.host + "events/confirmed_guests/";
    this.pending_guests_url = this.host + "events/pending_guests/";
    this.refused_guests_url = this.host + "events/refused_guests/";
    this.is_on_event_url = this.host + "events/is_on_event";
  }

  update(event, address){
    let d = new Date;
    let new_name = event.id + d.getTime();
    return this.authHttp.put(this.url + "/" + event.id + ".json", {'event': event, 'address': address, 'cover_photo': {'image': event.cover_photo, 'filename': new_name}})
      .map(res => res.json());
  }

  get_is_on_event(event_id){
    return this.authHttp.get(this.is_on_event_url + "/" + event_id +  ".json")
      .map(res => res.json());
  }

  delete(event_id){
    return this.authHttp.delete(this.url + "/" + event_id + ".json")
      .map(res => res.json());
  }

  create(event, address){
    let d = new Date;
    let new_name = event.id + d.getTime();
    return this.authHttp.post(this.url + ".json", {'event': event, 'address': address, 'cover_photo': {'image': event.cover_photo, 'filename': new_name}})
      .map(res => res.json());
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

  invitation(event, guests){
    return this.authHttp.put(this.invitation_url + event.id + ".json", {'guests': guests})
      .map(res => res.json());
  }

  all_guests(event){
    return this.authHttp.get(this.all_guests_url + event.id + ".json")
      .map(res => res.json());
  }

  confirmed_guests(event){
    return this.authHttp.get(this.confirmed_guests_url + event.id + ".json")
      .map(res => res.json());
  }

  pending_guests(event){
    return this.authHttp.get(this.pending_guests_url + event.id + ".json")
      .map(res => res.json());
  }

  refused_guests(event){
    return this.authHttp.get(this.refused_guests_url + event.id + ".json")
      .map(res => res.json());
  }

  save_cover_photo(event){
    let d = new Date;
    let new_name = event.id + d.getTime();
    return this.http.put(this.url + "/save_cover_photo/" + event.id + ".json", {'cover_photo': {'image': event.cover_photo, 'filename': new_name}})
      .map(res => res.json());
  }


}
