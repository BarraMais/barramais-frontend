import { AddressModel } from './address.model';
import { StateModel } from './state.model';
import { CityModel } from './city.model';

export class EventModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Event informartion
  user_id: number;
  name: string;
  event_date: Date;
  about: string;
  cover_photo: string;
  cover_photo_url: string;
  address: AddressModel;
  state: StateModel;
  city: CityModel;


  constructor(public params?:any) {
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;
    this.about = params.about || null;
    this.user_id = params.user_id || 0;
    this.event_date = params.event_date || new Date().toISOString();
    this.name = params.name || null;
    this.cover_photo = params.cover_photo || null;
    this.cover_photo_url = params.cover_photo_url || null;
    this.address = new AddressModel(params.address);
    this.state = new StateModel(params.state);
    this.city = new CityModel(params.city);
  }
}
