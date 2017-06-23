import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Routes } from '../providers/routes';

import { AuthHttp } from 'angular2-jwt';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
/*
  Generated class for the Conversations provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Conversations {

  private host: string;
  private host_conversation: string;
  private conversation_url: string;
  private conversation_messages_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes
  )
    {
      this.host = this.routesProvider.host();
      this.setRoutes(this.host);
     }

  setRoutes(host){
    this.host_conversation = host + "conversations";
    this.conversation_url = this.host_conversation + ".json";
    this.conversation_messages_url = "/messages.json";
  }

  my_conversations() {
    return this.authHttp.get(this.conversation_url)
      .map(res => res.json());
  }

  conversation_messages(conversation_id) {
    return this.authHttp.get(this.host_conversation + "/" + conversation_id + this.conversation_messages_url)
      .map(res => res.json());
  }

  create(user) {
    return this.authHttp.post(this.conversation_url, {user_id: user.id})
      .map(res => res.json());
  }
}
