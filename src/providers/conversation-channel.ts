import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as ActionCable from 'actioncable';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { Routes } from '../providers/routes';

/*
  Generated class for the ConversationChannel provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConversationChannel {

  private host: string;
  public host_cable: string;
  public conversationChannel: any;
  public subscription: any;

  constructor(
    public http: Http,
    public events: Events,
    public routesProvider: Routes

  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
    this.conversationChannel = ActionCable.createConsumer(this.host_cable+localStorage.getItem('jwt'));
    var subscription = this.conversationChannel.subscriptions.create('ConversationChannel', {
      connected: function() {},
      disconnected: function() {},
      received: function(data) {
        events.publish('onCreatedMessage', data);
      },

      speak: function(data) {
        this.perform('speak', data);
      }
    });
    this.subscription = subscription;
  }

  setRoutes(host){
    this.host_cable = host + 'cable/?jwt=';
  }

  createMessage(message_data) {
    this.subscription.speak(message_data);
  }
}
