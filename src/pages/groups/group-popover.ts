import { Component } from '@angular/core';

import { ViewController, NavController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { GroupModel } from "../../models/group.model";
import { User } from '../../providers/user';
import { Groups } from '../../providers/groups';
import { GroupUpdatePage } from '../groups/group-update';
import { ToastController } from 'ionic-angular';



@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="presentConfirmApply()" *ngIf="!participateButton">Participar</button>
      <button ion-item (click)="accept_group()" *ngIf="i_was_invited_to">Aceitar</button>
      <button ion-item (click)="refuse_group()" *ngIf="i_was_invited_to">Recusar</button>
      <button ion-item (click)="refuse_group()" *ngIf="is_member_of">Sair</button>
      <button ion-item (click)="openEditModal(groupUpdate, group)" *ngIf="showAdminActions">Editar</button>
    </ion-list>
  `
})
export class PopoverPage {

  showAdminActions: boolean = false;
  is_member_of: boolean = false;
  i_was_invited_to: boolean = false;
  send_request_to: boolean = false;
  groupUpdate: any = GroupUpdatePage;
  user: UserModel = new UserModel();
  group: GroupModel = new GroupModel();
  invite: string = "";
  participateButton: boolean = false;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams,
    private userProvider: User,
    private groupProvider: Groups,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    // public app: App,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
      this.user = params.data.user;
      this.group = params.data.group;
      this.showAdminActions = params.data.showAdminActions;
      this.is_member_of = params.data.is_member_of;
      this.i_was_invited_to = params.data.i_was_invited_to;
      this.send_request_to = params.data.send_request_to;
      this.checkParticipateButton();
  }

  openPage(page, group) {
    this.navCtrl.push(page, {group: group});
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  refuse_group(){
    this.userProvider.refuse_group(this.user, this.group).
    subscribe(response =>{
      this.presentToast(response.sucess);
      this.is_member_of = false;
      this.viewCtrl.dismiss(this.group);
    }, error =>{
      this.presentToast(error.json());
      console.log(error.json());
    });
  }

  accept_group(){
    this.userProvider.accept_group(this.user, this.group).
    subscribe(response =>{
      this.presentToast(response.sucess);
      this.is_member_of = true;
      this.viewCtrl.dismiss(this.group);
    }, error =>{
      this.presentToast(error.json());
      console.log(error.json());
    });
  }

  apply_group(){
    this.groupProvider.apply_group(this.group).
    subscribe(response => {
      this.presentToast(response.sucess);
      this.send_request_to = true;
      this.viewCtrl.dismiss(this.group);
    }, error => {
      this.presentToast(error.json());
      console.log(error.json());
    });
  }

  presentConfirmApply() {
    let alert = this.alertCtrl.create({
      title: 'Participar do Grupo',
      message: 'A solicitação para participar do grupo será enviada ao administrador do mesmo, mas você ainda não fará parte deste grupo até que a sua solicitação seja aceita. Confirma o envio?',
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
            this.apply_group();
          }
        }
      ]
    });
    alert.present();
  }

  openEditModal(page, group){
    let modal = this.modalCtrl.create(page, {group: group});
    modal.onDidDismiss(group => {
      if(group){
        this.group = new GroupModel(group);
        this.viewCtrl.dismiss(this.group);
      }
    });
    modal.present();
  }

  checkParticipateButton(){
    if(this.is_member_of || this.i_was_invited_to || this.send_request_to){
      this.participateButton = true;
    }
  }

}
