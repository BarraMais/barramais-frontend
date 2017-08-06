import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content } from 'ionic-angular';
import { Conversations } from '../../providers/conversations';
import { ConversationChannel } from '../../providers/conversation-channel';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";


/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  public messages: Array<any>;
  public conversation: any;
  public conversationChannel: any;
  public message: any;
  private jwtHelper: JwtHelper = new JwtHelper();
  private user: UserModel;
  private user_token: any = localStorage.getItem('user');
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public conversationsProvider: Conversations,
    public channel: ConversationChannel,
    public events: Events
  ) {
    this.conversation = params.data.conversation;
    this.conversationChannel = channel;
    events.subscribe('onCreatedMessage', (data) => this.appendMessage(data));
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.message = {};

    this.loadMessages();
  }

  ionViewDidEnter() {
    this.scrollToBottom();
  }

  loadMessages() {
    this.conversationsProvider.conversation_messages(this.conversation.id).subscribe(
      (messages) => {
        this.messages = messages
        console.log("messages");
        console.log(messages);
      },
      (error) => console.log(error)
    );
  }

  createMessage() {
    var data = {
      "message": [
        {"name": "conversation_id", "value": this.conversation.id},
        {"name": "body", "value": this.message.body}
      ]
    };

    this.conversationChannel.createMessage(data);
    this.message = {};
  }

  appendMessage(broadcasted_message) {
    var message = JSON.parse(broadcasted_message.message);
    this.messages.push(message);
    setTimeout(() => {
      this.scrollToBottom();
    }, 1000);
  }

  scrollToBottom() {
    this.content.scrollToBottom(1000);
  }
}
