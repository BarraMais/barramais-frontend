import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { UserPage } from '../user/user';
import { FeedsPage } from '../feeds/feeds';
import { GroupModalPage } from '../groups/group-modal';
import { GroupsPage } from '../groups/groups';
import { EventsPage } from '../events/events';
import { GroupMembersPage } from "../groups/group-members";
import { AddGroupMembersPage } from "../groups/add-group-members";
import { FriendsPage } from '../friends/friends';
import { UserModel } from "../../models/user.model";
import { GroupModel } from "../../models/group.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { Posts } from '../../providers/posts';
import { ToastController } from 'ionic-angular';
import { Groups } from '../../providers/groups';
import { PopoverController } from 'ionic-angular';
import { GroupUpdatePage } from '../groups/group-update';
import { PopoverPage } from '../groups/group-popover';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-group-page',
  templateUrl: 'group-page.html'
})
export class GroupPagePage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel = new UserModel();
  userPage: any = UserPage;
  feedsPage: any = FeedsPage;
  groupsPage: any = GroupsPage;
  eventsPage: any = EventsPage;
  friendsPage: any = FriendsPage;
  groupModal: any = GroupModalPage;
  group: GroupModel = new GroupModel();
  postModal: any = PostModalPage;
  groupMembers: any = GroupMembersPage;
  addGroupMembers: any = AddGroupMembersPage;
  allMembers: any;
  l_allMembers: any;
  confirmedMembers: any;
  l_confirmedMembers: any;
  pendingByUser: any
  l_pendingByUser: any;
  pendingByAdmin: any;
  l_pendingByAdmin: any;
  refusedMembers: any;
  l_refusedMembers: any;
  showAdminActions: boolean = false;
  showMemberActions: boolean = false;
  showPendingByUserActions: boolean = false;
  showPendingByAdminActions: boolean = false;
  showGroupInformation: boolean = false;
  friends: any;
  posts: Array<any>;
  groupUpdate: any = GroupUpdatePage;

  i_was_invited_to: boolean = false;
  send_request_to: boolean = false;
  is_member_of: boolean = false;

  profileInformation: boolean = false;
  publications: boolean = false;
  show_album:boolean = false;


  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    params: NavParams,
    public groupProvider: Groups,
    public alertCtrl: AlertController,
    private userProvider: User,
    private postsProvider: Posts,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController
  ) {
      this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.group = new GroupModel(params.data.group);
      this.verifyGroupAdmin();
      this.loadMembers(this.group);
      this.loadPosts();
      this.checkMemberShip();
    }

  ionViewDidLoad() {

  }

  checkMemberShip(){
    this.is_memberOf();
    this.i_was_invitedTo();
    this.send_requestTo();
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage,
      {
        group: this.group,
        user: this.user,
        showAdminActions: this.showAdminActions,
        is_member_of: this.is_member_of,
        i_was_invited_to: this.i_was_invited_to,
        send_request_to: this.send_request_to
      });
    popover.onDidDismiss(group => {
      if(group){
        this.group = new GroupModel(group);
      }
      this.checkMemberShip();
      this.loadMembers(this.group);
    });
    popover.present({ ev: event });
  }

  loadMembers(group){
    this.pending_by_user(group);
    this.pending_by_admin(group);
    this.confirmed_members(group);
    this.userFriends(group);
  }

  openPage(page, group) {
    this.navCtrl.push(page, {group: group});
  }

  openModal(page, members, page_type) {
    let modal = this.modalCtrl.create(page, {group: this.group, members: members, page_type: page_type});
    modal.onDidDismiss(group => {
      this.loadMembers(this.group);
    });
    modal.present();
  }

  openEditModal(page, group){
    let modal = this.modalCtrl.create(page, {group: group});
    modal.onDidDismiss(group => {
      if(group){
        this.group = new GroupModel(group);
      }
    });
    modal.present();
  }

  openPostModal() {
    let domain = {
      domain: 'groups',
      domain_id: this.group.id
    };

    let modal = this.modalCtrl.create(PostModalPage, {'domain_config': domain});
    modal.onDidDismiss(newPost => {
      if(newPost) this.posts.unshift(newPost);
    });
    modal.present();
  }

  verifyGroupAdmin(){
    if(this.group.admin.id == this.user.id){
      this.showAdminActions = true;
      this.showMemberActions = false;
    }
  }

  verifyGroupMember(list){
    var members_id = [];
    for(let user of list) members_id.push(user.id);
    if(members_id.indexOf(this.user.id) > -1 ){
      this.showMemberActions = true;
      this.verifyGroupAdmin();
    }
    console.log(this.showMemberActions);
  }

  verifyPendingByUser(list){
    if(list){
      var members_id = [];
      for(let user of list) members_id.push(user.id);
      if(members_id.indexOf(this.user.id) > -1 ){
        this.showPendingByUserActions = true;
        this.verifyGroupAdmin();
      }
    }
  }

  verifyPendingByAdmin(list){
    if(list){
      var members_id = [];
      for(let user of list) members_id.push(user.id);
      if(members_id.indexOf(this.user.id) > -1 ){
        this.showPendingByAdminActions = true;
        this.verifyGroupAdmin();
      }
    }
  }


  confirmed_members(group){
    this.groupProvider.confirmed_members(group)
      .subscribe(response =>{
        this.confirmedMembers = response;
        this.l_confirmedMembers = response.length;
        this.verifyGroupMember(this.confirmedMembers);
      }, error =>{
        console.log("Erro ao exibir os membros: " + error.json());
      });
  }

  pending_by_user(group){
    this.groupProvider.pending_by_user(group)
      .subscribe(response =>{
        this.pendingByUser= response;
        this.l_pendingByUser = response.length;
        this.verifyPendingByUser(this.pendingByUser);
      }, error =>{
        console.log("Erro ao exibir os membros: " + error.json());
      });
  }

  pending_by_admin(group){
    this.groupProvider.pending_by_admin(group)
      .subscribe(response =>{
        this.pendingByAdmin= response;
        this.l_pendingByAdmin = response.length;
        this.verifyPendingByAdmin(this.pendingByAdmin);
      }, error =>{
        console.log("Erro ao exibir os membros: " + error.json());
      });
  }

  userFriends(group){
    this.userProvider.group_friends(group.id)
    .subscribe(response => {
      this.friends = response;
    }, error => {
      console.log(error.json());
    });
  }

  refuse_group(){
    this.userProvider.refuse_group(this.user, this.group).
    subscribe(response =>{
      this.openPage(GroupPagePage, this.group);
      this.presentToast(response.sucess);
    }, error =>{
      this.presentToast(error.json());
      console.log(error.json());
    });
  }

  accept_group(){
    this.userProvider.accept_group(this.user, this.group).
    subscribe(response =>{
      this.openPage(GroupPagePage, this.group);
      this.presentToast(response.sucess);
    }, error =>{
      this.presentToast(error.json());
      console.log(error.json());
    });
  }

  is_memberOf(){
    this.userProvider.is_member_of(this.group).
    subscribe(response =>{
      this.is_member_of = response.response;
    }, error =>{
      console.log(error.json());
    });
  }

  send_requestTo(){
    this.userProvider.send_request_to(this.group).
    subscribe(response =>{
      this.send_request_to = response.response;
    }, error =>{
      console.log(error.json());
    });
  }

  i_was_invitedTo(){
    this.userProvider.i_was_invited_to(this.group).
    subscribe(response =>{
       this.i_was_invited_to = response.response;
    }, error =>{
      console.log(error.json());
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  loadPosts() {
    let domain_config = {
      domain: 'groups',
      domain_id: this.group.id
    };

    this.postsProvider.posts_with_domain(domain_config).subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => console.log(error)
    );
  }

  groupInformation(){
    this.showGroupInformation = !this.showGroupInformation;
  }

  presentConfirmDelete(group) {
    let alert = this.alertCtrl.create({
      title: 'Excluir Grupo',
      message: 'Tem certeza que deseja excuir este Grupo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.delete(group);
          }
        }
      ]
    });
    alert.present();
  }

  delete(group){
    this.groupProvider.delete(group.id)
      .subscribe(response => {
        this.presentToast("O grupo foi removido com sucesso!");
        this.navCtrl.setRoot(this.groupsPage);
      }, error => {
        console.log("Não foi possível remover o grupo" + error.json());
      })
  }

  hideAll() {
    this.profileInformation = false;
    this.publications = false;
    this.show_album = false;
  }

  showAlbums() {
    this.hideAll();
    this.show_album = !this.show_album;
  }

  showProfileInformation() {
    this.hideAll();
    this.profileInformation = true;
  }

  togglePublications() {
    this.hideAll();
    this.publications = !this.publications;
  }

}
