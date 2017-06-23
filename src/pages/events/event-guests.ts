import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { EventProvider } from "../../providers/events";
import { User } from "../../providers/user";
import { EventModel } from "../../models/event.model";
import { ToastController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";

/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-guests',
  templateUrl: 'event-guests.html'
})
export class EventGuestsPage {

  guests: any;
  event: EventModel = new EventModel();
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  selectedGuests: any[] = [];
  all_guests: any;
  profilePage: any = ProfilePage;
  showAdminActions: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public eventProvider: EventProvider,
    public userProvider: User,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.event = params.data.event;
      this.guests = params.data.guests;
      this.verifyEventAdmin();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  verifyEventAdmin(){
    if(this.event.user_id == this.current_user.id){
      this.showAdminActions = true;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openProfile(user) {
    this.navCtrl.push(this.profilePage, {user: user.id})
  }

  getSelect(isChecked, guest) {
    if (isChecked === true) {
      this.selectedGuests.push(guest);
    } else {
      this.selectedGuests.splice(this.selectedGuests.indexOf(guest), 1);
    }
  }

  invitation(guests){
    this.eventProvider.invitation(this.event, guests)
    .subscribe(response => {
        console.log(response.guests);
        this.viewCtrl.dismiss();
        this.presentToast("Usuário(s) convidado(s) com sucesso!");
    }, error => {
        console.log(error.json().error);
        this.presentToast(error.json().error);
    });
    this.clearInvitedGuests();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  clearInvitedGuests(){
    for (let i = 0; i < this.selectedGuests.length; i++) {
        this.guests.splice(this.guests.indexOf(this.selectedGuests[i]), 1);
    }
    this.selectedGuests = [];
  }

}
