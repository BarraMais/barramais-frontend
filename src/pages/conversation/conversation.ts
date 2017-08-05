import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';
import { ProfilePage } from "../../pages/profile/profile";

/*
  Generated class for the Conversation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
export class ConversationPage {

  profilePage: any = ProfilePage;
  public conversations: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conversationsProvider: Conversations
  ) {
    this.loadConversations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  loadConversations() {
    this.conversationsProvider.my_conversations().subscribe(
      (conversations) => this.conversations =  conversations ,
      (error) => console.log(error),
      () => console.log("completed")
    );
    console.log("conv =");
    console.log(this.conversations);
  }

  openPage(page, params={}){
    this.navCtrl.push(page, params);
  }

  openProfile(user_id) {
    this.openPage(this.profilePage, {user: user_id});
  }

  openConversation(conversation) {
    this.navCtrl.push(MessagesPage, {conversation: conversation});
  }
}
