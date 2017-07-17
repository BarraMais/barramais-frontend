import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { NotificationModel } from "../../models/notification.model";
import { CommentableModel } from "../../models/commentable.model";
import { Posts } from '../../providers/posts';

/*
  Generated class for the NotificationView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notification-view',
  templateUrl: 'notification-view.html'
})
export class NotificationViewPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  notification_id: number = 0;
  notification: any = new NotificationModel();
  user: UserModel;
  commentable: any = new CommentableModel();
  posts: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    private postProvider: Posts
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.notification_id = navParams.data.notification_id;
      this.get_notification_by_id();
      this.user = new UserModel(navParams.data.user);
      // this.get_post_by_id(this.commentable.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationViewPage');
  }

  get_notification_by_id(){
    this.userProvider.get_notification_by_id(this.current_user.id, this.notification_id)
      .subscribe(response => {
        this.notification = response;
        this.commentable = response.commentable;
        // this.posts.push(this.commentable);
        // console.log(response);
        // console.log(this.commentable);
        // console.log(this.posts);
        this.get_post_by_id(this.commentable.id);

      }, error => {
        console.log("Erro ao exibir a notificação" + error.json());
      });
  }

  get_post_by_id(post_id){
    this.postProvider.get_post_by_id(post_id)
      .subscribe(response => {
        // console.log(response);
        this.posts.push(response);
        console.log(this.posts);
      }, error => {
        console.log("Erro ao exibir o post" + error.json());
      });
  }

  goBack(){
    this.navCtrl.pop();
  }

}
