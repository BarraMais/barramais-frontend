import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
//import { StatusBar, Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { EventsPage } from '../pages/events/events';
import { UserPage } from '../pages/user/user';
import { AdvertiserPage } from '../pages/advertiser/advertiser';
import { AdsPage } from '../pages/ads/ads';
import { MidiaKitPage } from '../pages/midia-kit/midia-kit';
import { TermsPage } from '../pages/terms/terms';
import { PrivacyPage } from '../pages/privacy/privacy';
import { InAppBrowser } from 'ionic-native';
import { ConversationPage } from '../pages/conversation/conversation';
import { AlbumListPage } from '../pages/album-list/album-list';
import { AlbumPhotoCreatePage } from '../pages/album-photo-create/album-photo-create';
import { AdBannersPage } from '../pages/ad-banners/ad-banners';
import { AdInterestsPage } from '../pages/ad-interests/ad-interests';
import { AdDescriptionsPage } from '../pages/ad-descriptions/ad-descriptions';
import { AdPreviewPage } from '../pages/ad-preview/ad-preview';
import { AdListPage } from '../pages/ad-list/ad-list';
import { LoginPage } from '../pages/login/login';
import { AdvertisersPage } from '../pages/advertisers/advertisers';
import { AdvertiserPaymentPage } from '../pages/advertiser-payment/advertiser-payment';
import { ClassifiedUserListPage } from '../pages/classified-user-list/classified-user-list';
import { ClassifiedPage } from '../pages/classified/classified';
import { ClassifiedVesselTypePage } from '../pages/classified-vessel-type/classified-vessel-type';
import { ClassifiedVesselStatusPage } from '../pages/classified-vessel-status/classified-vessel-status';
import { ClassifiedVesselManufacturerPage } from '../pages/classified-vessel-manufacturer/classified-vessel-manufacturer';
import { ClassifiedVesselAccessoriesPage } from '../pages/classified-vessel-accessories/classified-vessel-accessories';
import { ClassifiedVesselDescriptionPage } from '../pages/classified-vessel-description/classified-vessel-description';
import { ClassifiedVesselPreviewPage } from '../pages/classified-vessel-preview/classified-vessel-preview';
import { ClassifiedFishingPage } from '../pages/classified-fishing/classified-fishing';
import { ClassifiedFishingStatusPage } from '../pages/classified-fishing-status/classified-fishing-status';
import { ClassifiedFishingDescriptionPage } from '../pages/classified-fishing-description/classified-fishing-description';
import { ClassifiedFishingPreviewPage } from '../pages/classified-fishing-preview/classified-fishing-preview';
import { ClassifiedProductCategoryPage } from '../pages/classified-product-category/classified-product-category';
import { ClassifiedProductStatusPage } from '../pages/classified-product-status/classified-product-status';
import { ClassifiedProductDescriptionPage } from '../pages/classified-product-description/classified-product-description';
import { ClassifiedProductPreviewPage } from '../pages/classified-product-preview/classified-product-preview';
import { ClassifiedShowFishingsPage } from '../pages/classified-show-fishings/classified-show-fishings';
import { ClassifiedShowProductsPage } from '../pages/classified-show-products/classified-show-products';
import { ClassifiedShowVesselsPage } from '../pages/classified-show-vessels/classified-show-vessels';
import { UserPopover } from '../pages/user-popover/user-popover';
import { AddUsersPage } from '../pages/users/add-users';
import { AlertController } from 'ionic-angular';
import { UserModel } from "../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../providers/user';
import { MenuController, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { InterestSelectionPage } from '../pages/interest-selection/interest-selection';
import { Facebook } from '@ionic-native/facebook'; //removido do import, não usado FacebookLoginResponse
// import { NotificationViewPage } from '../pages/notification-view/notification-view';
import { HelpPage } from '../pages/help/help';
import { Events } from 'ionic-angular';
import { Camera } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'app-menu',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  mainPage: any = MainPage;
  profilePage: any = ProfilePage;
  friendsPage: any = FriendsPage;
  userPage: any = UserPage;
  advertiserPage: any = AdvertiserPage;
  adsPage: any = AdsPage;
  showPaginas: boolean = false;
  showAnuncios: boolean = false;
  showClassificados: boolean = false;
  showAjudaESuporte: boolean = false;
  showBlog: boolean = false;
  showConvidarAmigos: boolean = false;
  termsPage: any = TermsPage;
  privacyPage: any = PrivacyPage;
  conversationPage: any = ConversationPage;
  midiaKitPage: any = MidiaKitPage;
  albumListPage: any = AlbumListPage;
  albumPhotoCreatePage: any = AlbumPhotoCreatePage;
  adBannersPage: any = AdBannersPage;
  adInterestsPage: any = AdInterestsPage;
  adDescriptionsPage: any = AdDescriptionsPage;
  adPreviewPage: any = AdPreviewPage;
  adListPage: any = AdListPage;
  advertisersPage: any = AdvertisersPage;
  advertiserPaymentPage: any = AdvertiserPaymentPage;
  classifiedUserListPage: any = ClassifiedUserListPage;
  classifiedPage: any = ClassifiedPage;
  classifiedVesselTypePage: any = ClassifiedVesselTypePage;
  classifiedVesselStatusPage: any = ClassifiedVesselStatusPage;
  classifiedVesselManufacturerPage: any = ClassifiedVesselManufacturerPage;
  classifiedVesselAccessoriesPage: any = ClassifiedVesselAccessoriesPage;
  classifiedVesselDescriptionPage: any = ClassifiedVesselDescriptionPage;
  classifiedVesselPreviewPage: any = ClassifiedVesselPreviewPage;
  classifiedFishingPage: any = ClassifiedFishingPage;
  classifiedFishingStatusPage: any = ClassifiedFishingStatusPage;
  classifiedFishingDescriptionPage: any = ClassifiedFishingDescriptionPage;
  classifiedFishingPreviewPage: any = ClassifiedFishingPreviewPage;
  classifiedProductCategoryPage: any = ClassifiedProductCategoryPage;
  classifiedProductStatusPage: any = ClassifiedProductStatusPage;
  classifiedProductDescriptionPage: any = ClassifiedProductDescriptionPage;
  classifiedProductPreviewPage: any = ClassifiedProductPreviewPage;
  classifiedShowFishingsPage: any = ClassifiedShowFishingsPage;
  classifiedShowProductsPage: any = ClassifiedShowProductsPage;
  classifiedShowVesselsPage: any = ClassifiedShowVesselsPage;
  userPopover: any = UserPopover;
  addUsersPage: any = AddUsersPage;
  interestSelectionPage: any = InterestSelectionPage;
  loginPage: any = LoginPage;
  eventsPage: any = EventsPage;
  helpPage: any = HelpPage;
  friends: any;
  friendsCount: number;

  user: UserModel = new UserModel();
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any;

  options: NativeTransitionOptions = {
     direction: 'up',
     duration: 500,
     slowdownfactor: 3,
     slidePixels: 20,
     iosdelay: 100,
     androiddelay: 150,
     fixedPixelsTop: 0,
     fixedPixelsBottom: 60
    };

  openLink(link){
    this.closeSubItems();
    let browser = new InAppBrowser(link, '_system');
    browser
  }

  openProfile(user_id) {
    this.nav.push(this.profilePage, {user: user_id})
  }

  constructor(
    public platform: Platform,
    private alertCtrl: AlertController,
    private userProvider: User,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    public events: Events,
    private nativePageTransitions: NativePageTransitions,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public fb: Facebook
  ) {
      this.checkMainPage();
      //this.initializeApp();
      this.platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
      this.setUser();
      events.subscribe('onUpdateUser', (user) => { this.user = new UserModel(user) });
  }

  menuClosed(){
    this.closeSubItems();
  }

  openFriends() {
    this.nav.push(this.mainPage,{user: this.user, tabIndex: "1"});
    this.closeSubItems();
  }
  openMessages(){
    this.nav.push(this.mainPage,{user: this.user, tabIndex: "2"});
    this.closeSubItems();
  }

  loadFriends(user) {
    this.userProvider.user_friends(user)
    .subscribe(
      (friends) => {
        this.friends = friends;
        this.friendsCount = friends.length;
      },
      (error) => console.log(error)
    );
  }



  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     StatusBar.styleDefault();
  //     Splashscreen.hide();
  //   });
  // }

  setUser(){
    if(localStorage.getItem("user")){
      this.user = new UserModel(this.jwtHelper.decodeToken(localStorage.getItem("user")));
    }
  }

  checkMainPage(){
    if (localStorage.getItem("user")){
      this.rootPage = this.mainPage;
    }
  }

  checkCurrentUser(){
    this.events.subscribe('onUpdateUser', (user)=>{this.user = new UserModel(user);});
  }

  openPageWithClassifiedConditional(page, classifiedConditional){
    this.nav.push(page, {'classifiedConditional': classifiedConditional});
    this.closeSubItems();
  }

  showSubMenuAnuncios() {
    this.showAnuncios = !this.showAnuncios;
  }

  showSubMenuPaginas() {
    this.showPaginas = !this.showPaginas;
  }

  showSubMenuClassificados() {
    this.showClassificados = !this.showClassificados;
  }

  showSubMenuAjudaESuporte() {
    this.showAjudaESuporte = !this.showAjudaESuporte;
  }

  showSubMenuBlog() {
    this.showBlog = !this.showBlog;
  }

  showSubMenuConvidarAmigos() {
    this.showConvidarAmigos = !this.showConvidarAmigos;
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Sair',
      message: 'Tem certeza que deseja sair?',
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
            this.userProvider.logout().subscribe(
              (response) => {
                window.localStorage.removeItem("jwt");
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("vessels_type");
                this.nav.setRoot(HomePage);
              },
              (error) => console.log(error)
            );
            console.log('Abrir a página de sair');
          }
        }
      ]
    });
    alert.present();
    this.closeSubItems();
  }


  openPage(page, index) {
    this.nativePageTransitions.slide(this.options);
    this.nav.push(page, { tabIndex: index });
    this.closeSubItems();
  }

  closeSubItems(){
    this.showAnuncios = false;
    this.showPaginas = false;
    this.showClassificados = false;
    this.showAjudaESuporte = false;
    this.showBlog = false;
    this.showConvidarAmigos = false;
  }

  openRoot(page) {
    this.nativePageTransitions.slide(this.options);
    this.nav.setRoot(page);
    this.closeSubItems();
  }

  inviteFacebookFriends() {
    let options = {
      url: "https://fb.me/202248836944012",
      picture: "https://placehold.it/350x350"
    }
    this.fb.appInvite(options).then(
      (obj) => console.log(obj),
      (error) => {
        alert(error);
        console.log(error)
      }
    );
    this.closeSubItems();
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a origem da imagem',
      buttons: [
        {
          text: 'Carregar da Galeria',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: true,
      //mediaType: Camera.MediaType.ALLMEDIA,
      destinationType: Camera.DestinationType.DATA_URL
    };

    Camera.getPicture(options).then(image => {
      let prompt = this.alertCtrl.create({
        title: 'Usar foto',
        message: 'Deseja usar esta foto como foto de perfil?',
        buttons: [
          {
            text: 'Não',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sim',
            handler: data => {
              this.user.avatar = "data:image/jpeg;base64," + image;
              this.save_avatar(this.user);
            }
          }
        ]
      });
      prompt.present();
    });
  }

  save_avatar(user) {
      let loader = this.loadingCtrl.create({
        content: "Salvando avatar..."
      });

      loader.present();

      this.userProvider.save_avatar(user)
      .subscribe(token_params => {
        localStorage.setItem("user", token_params.user);
        this.user_token = token_params.user;
        this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
        this.events.publish("onUpdateUser", this.jwtHelper.decodeToken(token_params.user));
        this.presentToast("Avatar salvo com sucesso!");
      }, error => {
        this.presentToast(error.json());
        console.log(JSON.stringify(error.json()));
      }, () => {
        loader.dismiss();
      }
    );
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
