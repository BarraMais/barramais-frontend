import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { EventProvider } from "../../providers/events";
import { EventModel } from "../../models/event.model";
import { AddressModel } from "../../models/address.model";
import { ToastController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { EventsPage } from '../events/events'
import { Camera } from '@ionic-native/camera';

declare var cordova: any;
/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html'
})
export class EventModalPage {

  event: EventModel = new EventModel();
  address: AddressModel = new AddressModel();
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel;
  cities: any;
  states: any;
  eventsPage: any = EventsPage;
  erro: string = "";

  constructor(
    public platform: Platform,
    private camera: Camera,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public eventProvider: EventProvider,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.getStates('1');
    this.event = new EventModel(navParams.data.event);
    this.address = new AddressModel(navParams.data.address);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  create(event, address){
    // var cepRule = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
    var cepRule = /^[0-9]{8}$/;

    if(event.name == null || event.name == ""){
      this.presentToast("Preencha o nome do evento!");
    }else if(event.event_date == null || event.event_date == ""){
      this.presentToast("Selecione uma data para o evento!");
    }else if(event.about == null || event.about == ""){
      this.presentToast("Preencha uma descrição para o evento!");
    }else if(address.state_id == ""){
      this.presentToast("Selecione o estado!");
    }else if(address.city_id == ""){
      this.presentToast("Selecione a cidade!");
    }else{
      let loader = this.loadingCtrl.create({
        content: "Salvando evento..."
      });

      loader.present();
      event.user_id = this.user.id;
      this.eventProvider.create(event, address)
      .subscribe(event_params => {
          this.event = new EventModel(event_params);
          loader.dismiss();
          this.viewCtrl.dismiss(event_params);
          this.presentToast('Evento criado com sucesso!');
      }, error => {
          console.log(error.json());
          this.presentToast(error);
          loader.dismiss();
      });
    }
  }

  update(event, address){
    // var cepRule = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
    var cepRule = /^[0-9]{8}$/;

    if(event.name == null || event.name == ""){
      this.presentToast("Preencha o nome do evento!");
    }else if(event.event_date == null || event.event_date == ""){
      this.presentToast("Selecione uma data para o evento!");
    }else if(event.about == null || event.about == ""){
      this.presentToast("Preencha uma descrição para o evento!");
    }else if(address.state_id == ""){
      this.presentToast("Selecione o estado!");
    }else if(address.city_id == ""){
      this.presentToast("Selecione a cidade!");
    }else{
      let loader = this.loadingCtrl.create({
        content: "Atualizando evento..."
      });

      loader.present();
      event.user_id = this.user.id;
      this.eventProvider.update(event, address)
      .subscribe(event_params => {
          this.event = new EventModel(event_params);
          this.presentToast('Evento atualizado com sucesso!');
          loader.dismiss();
          this.viewCtrl.dismiss(event_params);
      }, error => {
          loader.dismiss();
          console.log(error.json());
          this.presentToast(error);
      });
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  getCountry() {
    this.eventProvider.getCountry()
    .subscribe(response => {
      console.log(response);
    }, error => {
        console.log(error.json());
    });
  }

  getStates(country) {
    this.eventProvider.getStates(country)
    .subscribe(response => {
      this.states = response.states;
    }, error => {
        console.log(error.json());
    });
  }

  getCities() {
    this.eventProvider.getCities(this.address.state_id)
    .subscribe(response => {
      this.cities = response.cities;
    }, error => {
        console.log(error.json());
    });
  }

  public presentActionSheet(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Carregar midia',
      cssClass: 'page-post-modal',
      buttons: [
        {
          text: 'Carregar da Galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Fotos',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            console.log('Play clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      allowEdit: true
    };

    this.camera.getPicture(options).then(
      image_url => {
        let includeToNewMedia = (image) => {
          this.event.cover_photo = 'data:image/jpeg;base64,' + image;
        };

        includeToNewMedia(image_url);
      },
      error => {
        this.erro = error;
      }
    );
  }

  save_cover_photo() {
    this.eventProvider.save_cover_photo(this.event)
    .subscribe((event_params) => {
        this.event = new EventModel(event_params);
    }, error => {
        alert(error.json());
        console.log(JSON.stringify(error.json()));
    });
  }

  delete(event){
    this.eventProvider.delete(event.id)
      .subscribe(response => {
        this.presentToast("Evento removido com sucesso!");
      }, error => {
        console.log("Não foi possível deletar o evento" + error.json());
      })
  }

}
