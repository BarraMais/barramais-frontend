import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Groups } from "../../providers/groups";
import { User } from "../../providers/user";
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
  selector: 'page-group-members',
  templateUrl: 'group-members.html'
})
export class GroupMembersPage {

  members: any;
  group: any;
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  selectedMembers: any[] = [];
  all_members: any;
  showAdminActions: boolean = false;
  profilePage: any = ProfilePage;
  page_type: string = "";

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public groupProvider: Groups,
    public userProvider: User,
    public actionsheetCtrl: ActionSheetController,
    public conversationProvider: Conversations,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.group = params.data.group;
      this.members = params.data.members;
      this.page_type = params.data.page_type;
      console.log(this.members);
      this.verifyGroupAdmin();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  verifyGroupAdmin(){
    if(this.group.admin.id == this.current_user.id){
      this.showAdminActions = true;
    }
  }

  openProfile(user) {
    this.navCtrl.push(this.profilePage, {user: user.id})
  }

  unfriend(user){
    this.userProvider.unfriend(user)
    .subscribe(
      (response) =>{
        this.presentToast(response.status);
        this.members[(this.members.indexOf(user))].isFriend = false;
      },
      (error) => {
        console.log(error.json());
      }
    );
  }

  request_friendship(user){
    this.userProvider.request_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
        this.members[(this.members.indexOf(user))].isFriend = 'waiting';
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getSelect(isChecked, member) {
    if (isChecked === true) {
      this.selectedMembers.push(member);
    } else {
      this.selectedMembers.splice(this.selectedMembers.indexOf(member), 1);
    }
  }

  invitation(members){
    this.groupProvider.invitation(this.group, members)
    .subscribe(response => {
        console.log(response.members);
        this.presentToast("Usuário(s) convidado(s) com sucesso!");
    }, error => {
        console.log(error.json().error);
        this.presentToast(error.json().error);
    });
    this.clearInvitedMembers();
  }

  accept_member(member){
    this.groupProvider.accept_member(this.group, member)
    .subscribe(response => {
        this.members.splice(this.members.indexOf(member), 1);
        this.presentToast(response.response);
    }, error => {
        console.log(error.json().error);
        this.presentToast(error.json().error);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  clearInvitedMembers(){
    for (let i = 0; i < this.selectedMembers.length; i++) {
      this.members.splice(this.members.indexOf(this.selectedMembers[i]), 1);
    }
    this.selectedMembers = [];
  }

}
