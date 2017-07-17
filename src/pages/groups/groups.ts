import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { GroupModalPage } from "../groups/group-modal";
import { Groups } from '../../providers/groups';
import { User } from '../../providers/user';
import { GroupPagePage } from '../groups/group-page';
import { UserModel } from "../../models/user.model";
import { GroupModel } from "../../models/group.model";
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  // host: string = "https://barramais.herokuapp.com";
  host: string = "http://localhost:3000";

  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  groups: any = "all-groups";
  groupPage: any = GroupPagePage;
  all_groups: Array<any>;
  my_groups: Array<any>;
  confirmed_groups: Array<any>;
  pending_groups: Array<any>;
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public groupProvider: Groups,
    public userProvider: User,
    public loadingCtrl: LoadingController)
    {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.loadGroups(this.current_user);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando Grupos...",
      duration: 1000
    });
    loader.present();
  }

  loadGroups(current_user){
    this.allGroups();
    this.myGroups(current_user);
    this.confirmedGroups(current_user);
    this.pendingGroups(current_user);
  }

  myGroups(current_user){
    this.userProvider.myGroups(current_user)
      .subscribe(response =>{
        // console.log(response.my_groups);
        this.my_groups = response.my_groups;

      }, error =>{
        console.log("Erro ao exibir meus eventos: " + error.json());
      });
  }

  allGroups(){
    let loader = this.loadingCtrl.create({
      content: "Carregando Grupos..."
    });

    loader.present();

    this.userProvider.allGroups()
      .subscribe(response =>{
        this.all_groups = response.all_groups;
        loader.dismiss();
      }, error =>{
        console.log("Erro ao exibir todos os eventos: " + error.json());
      });
  }

  pendingGroups(current_user){
    this.userProvider.pendingGroups(current_user)
      .subscribe(response =>{
        // console.log(response.pending_events);
        this.pending_groups = response.pending_groups;
      }, error =>{
        console.log("Erro ao exibir eventos confirmados: " + error.json());
      });
  }

  confirmedGroups(current_user){
    this.userProvider.confirmedGroups(current_user)
      .subscribe(response =>{
        // console.log(response.confirmed_events);
        this.confirmed_groups = response.confirmed_groups;
      }, error =>{
        console.log("Erro ao exibir eventos confirmados: " + error.json());
      });
  }

  openPage(group){
    this.navCtrl.push(GroupPagePage, {group: group});
  }

  openModal(group) {
    let modal = this.modalCtrl.create(GroupModalPage, { my_groups: this.my_groups, group: group });
    modal.onDidDismiss(group => {
      if(group){
        console.log(group);
        let new_group: GroupModel = new GroupModel(group);
        console.log(new_group);
        this.my_groups.push(new_group);
        this.all_groups.push(new_group);
        this.confirmed_groups.push(new_group);
        this.loadGroups(this.current_user);
      }
    });
    modal.present();
  }

  doRefresh(refresher) {
    this.loadGroups(this.current_user);
    refresher.complete();
  }

}
