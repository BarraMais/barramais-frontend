import { Component, Input } from '@angular/core';
import { ProfilePage } from "../../pages/profile/profile";
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../../pages/main/main';
import { HomePage } from '../../pages/home/home';
import { UsersPage } from '../../pages/users/users';
import { ConversationPage } from '../../pages/conversation/conversation';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';


/*
  Generated class for the CocoButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'bm-header',
  templateUrl: 'bm-header.html'
})

export class BmHeaderComponent {
  @Input() title: string;
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;

  profilePage: any = ProfilePage;
  mainPage: any = MainPage;
  homePage: any = HomePage;
  conversationPage: any = ConversationPage;
  usersPage: any = UsersPage;  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    }


  logout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    this.openPage(this.homePage);
  }

  openPage(page){
    this.navCtrl.setRoot(page);
  }

  openUserPage() {
    this.navCtrl.push(this.usersPage);
  }

  openProfile(){
    this.navCtrl.setRoot(this.profilePage, {user: this.current_user})
  }

}
