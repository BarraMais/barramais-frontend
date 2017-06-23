import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Groups } from "../../providers/groups";
import { User } from "../../providers/user";
import { Posts } from "../../providers/posts";
import { ToastController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { ProfilePage } from '../profile/profile';
import { Conversations } from '../../providers/conversations';
import { AlertController } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';
/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bm-post-likes',
  templateUrl: 'bm-post-likes.html'
})
export class BmPostLikesPage {

  post_likes_users: any = [];
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  profilePage: any = ProfilePage;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public postsProvider: Posts,
    private alertCtrl: AlertController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public actionsheetCtrl: ActionSheetController,
    public conversationProvider: Conversations,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.get_likes(params.data);
      console.log(this.post_likes_users);
    }

  ionViewDidLoad() {
  }

  get_likes(post) {
    this.postsProvider.get_likes(post).subscribe(
      (post_likes_users) => this.post_likes_users = post_likes_users,
      (error) => console.log(error)
    );
  }

  openProfile(user) {
    this.navCtrl.push(this.profilePage, {user: user.id})
  }

  createConversationWith(user) {
    this.conversationProvider.create(user).subscribe(
      (conversation) => {
        this.navCtrl.push(MessagesPage, { conversation: conversation });
      },
      (error) => console.log(error)
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
