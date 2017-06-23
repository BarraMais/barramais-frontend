import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { NotificationViewPage } from '../notification-view/notification-view';
import { MainPage } from '../main/main';

/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  notifications: any[] = [];
  users: any[] = [];
  notificationViewPage: any = NotificationViewPage;
  main: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private userProvider: User
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.get_notifications();
      this.open_my_notifications();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  get_notifications(){
    this.userProvider.get_all_notifications(this.current_user.id)
      .subscribe(response =>{
        this.notifications = response;
        // this.remove_unused_notifications();
        // this.generate_user_list(this.notifications);
        // this.check_notifications(this.current_user.id);
        console.log(this.notifications);
      }, error =>{
        console.log("Erro ao exibir as notificações" + error.json());
      });
  }

  open_my_notifications(){
    this.userProvider.open_my_notifications(this.current_user.id)
      .subscribe(response => {

      }, error => {
        console.log(error.json());
      });
  }

  remove_unused_notifications(){
    var notifications_length = this.notifications.length
    console.log(notifications_length);
    for(var i = 0; i < notifications_length;){
      if(this.notifications[i].notifiable == null){
        console.log(i);
        this.notifications.splice(this.notifications.indexOf(this.notifications[i]), 1);
      }else{
        i++;
      }
    }
  }

  // generate_user_list(notifications){
  //   for(var i = 0; i < notifications.length; i++){
  //       this.add_to_users(notifications[i].notifiable.user_id);
  //   }
  // }

  // add_to_users(user_id){
  //   this.userProvider.getUser(user_id)
  //     .subscribe(response =>{
  //       var repeated_input = false;
  //       repeated_input = this.check_repeated_input(user_id);
  //
  //       if(!repeated_input){
  //         this.users.push(response);
  //       }
  //     }, error => {
  //       console.log("Erro ao exibir o usuário" + error.json());
  //     });
  // }

  // check_repeated_input(user_id){
  //   var found_repeated_input = false;
  //
  //   for(var i = 0; i < this.users.length; i ++){
  //     if(this.users[i].id == user_id){
  //       found_repeated_input = true;
  //     }
  //   }
  //
  //   return found_repeated_input;
  // }

  // check_notifications(user_id){
  //   this.userProvider.open_all_user_notifications(user_id)
  //     .subscribe(response =>{
  //
  //     }, error =>{
  //       console.log("Não foi possível abrir as notificações" + error.json());
  //     });
  // }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goBack() {
    this.navCtrl.setRoot(this.main);
  }

  openPage(page, notification_id, user){
    this.navCtrl.push(page, {'notification_id': notification_id, 'user': user});
  }
}
