import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FeedsPage } from '../feeds/feeds';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';
import { Search } from '../../providers/search';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';
import { AlertController } from 'ionic-angular';
import { EventPagePage } from '../../pages/events/event-page';
import { GroupPagePage } from '../../pages/groups/group-page';
import { ProfilePage } from "../../pages/profile/profile";

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  userList: Array<any>;
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel = new UserModel();
  results: Array<any>;
  last_query_param: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    params: NavParams,
    public conversationProvider: Conversations,
    public userProvider: User,
    public searchProvider: Search
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.user_list();
    console.log(this.current_user);
    this.results = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  user_list(){
    this.userProvider.user_list()
    .subscribe(
      (users) => {
        this.userList = users;
      }, (error) => {
        console.log(error.json());
      }
    );
  }

  unfriend(user){
    this.userProvider.unfriend(user)
    .subscribe(
      (response) =>{
        this.presentToast(response.status);
        this.userList[(this.userList.indexOf(user))].isFriend = false;
      },
      (error) => {
        console.log(error.json());
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  request_friendship(user){
    this.userProvider.request_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
        this.userList[(this.userList.indexOf(user))].isFriend = 'waiting';
      },
      (error) => console.log(error)
    );
  }

  createConversationWith(user) {
    this.conversationProvider.create(user).subscribe(
      (conversation) => {
        this.navCtrl.push(MessagesPage, { conversation: conversation });
      },
      (error) => console.log(error)
    );
  }

  isWaiting(user_name) {
    let alert = this.alertCtrl.create({
      title: 'Aguardando',
      message: 'Você já convidou ' + user_name + ', aguarde a aceitação de eu convite.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        }
      ]
    });
    alert.present();
  }

  getResults(ev: any) {
    let query_param = ev.target.value;
    if(query_param && query_param.trim() != '' && query_param.trim() != this.last_query_param) {
      this.results = null;
      let loader = this.loadingCtrl.create({
        content: "Pesquisando..."
      });

      loader.present();
      this.searchProvider.look_for(query_param).subscribe(
        (results) => {
          this.results = results
          this.last_query_param = query_param;
          loader.dismiss();
        },
        (error) => {
          console.log(error);
          loader.dismiss();
        }
      );
    }
  }

  openPage(page, params={}){
    this.navCtrl.push(page, params);
  }

  openProfile(user_id) {
    this.openPage(this.profilePage, {user: user_id});
  }

  openEvent(event) {
    this.openPage(EventPagePage, {event: event});
  }

  openGroup(group) {
    this.openPage(GroupPagePage, {group: group});
  }

  getAvatarSrc(result) {
    if(result.type == 'user') {
      return result.item.avatar_url;
    } else {
      return result.item.cover_photo_url;
    }
  }

  getSearchItemName(result) {
    if(result.type == 'user') {
      return result.item.first_name + " " + result.item.last_name;
    } else {
      return result.item.name;
    }
  }

  openSearchItem(result) {
    switch(result.type) {
      case 'user': {
        this.openProfile(result.item.id);
        break;
      }
      case 'event': {
        this.openEvent(result.item);
        break;
      }
      case 'group': {
        this.openGroup(result.item);
      }
      default: { break; }
    }
  }

  closePage(): void {
    this.navCtrl.pop();
  }
}
