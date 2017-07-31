import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { UserPopover } from '../user-popover/user-popover';
import { FriendshipRequestPage } from '../friendship-request/friendship-request'
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { AddUsersPage } from '../users/add-users'
import { InterestSelectionPage } from '../interest-selection/interest-selection'



/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user: UserModel = new UserModel();
  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  friendsPage: any = FriendsPage;
  friendshipRequestPage: any = FriendshipRequestPage;
  friends: Array<any>;
  friendsCount: number = 0;
  //userPopover: UserPopover;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    params: NavParams,
    public conversationProvider: Conversations,
    public userProvider: User,
    public popoverCtrl: PopoverController,
    //public userPopover: UserPopover,
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.loadFriends();


  }

    presentPopover(myEvent, user) {
      //console.log("user-");
      //console.log(user);
      //console.log("myEvent");
      //console.log(myEvent);
        let popover = this.popoverCtrl.create(UserPopover, user);
        console.log(popover);
        popover.present({
          ev: myEvent
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  openPage(page){
    this.navCtrl.setRoot(page, {user: this.current_user});
  }

  openProfile(user) {
    this.navCtrl.push(this.profilePage, {user: user.id})
  }

  openAddUsersPage() {
    this.navCtrl.push(AddUsersPage);
  }

  unfriend(user){
    this.userProvider.unfriend(user)
    .subscribe(
      (response) =>{
        this.friends.splice(this.friends.indexOf(user), 1);
        this.presentToast(response.status);
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

  loadFriends() {
    this.userProvider.user_friends(this.current_user)
    .subscribe(
      (friends) => {
        this.friends = friends;
        this.friendsCount = friends.length;
        console.log("friends = ");
        console.log(this.friends);

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

}
