import {
    Component
} from '@angular/core';
import {
    NavController,
    NavParams,
    MenuController,
    ModalController,
    ViewController
} from 'ionic-angular';
import {
    UserPage
} from '../user/user';
import {
    GroupsPage
} from '../groups/groups';
import {
    FeedsPage
} from '../feeds/feeds';
import {
    ProfilePage
} from '../profile/profile';
import {
    ConversationPage
} from '../../pages/conversation/conversation';
import {
    UserModel
} from "../../models/user.model";
import {
    JwtHelper
} from 'angular2-jwt';
import {
    NotificationsPage
} from '../../pages/notifications/notifications';
import {
    FriendsPage
} from '../../pages/friends/friends';
import {
    User
} from '../../providers/user';

/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
})
export class MainPage {

    user: any = UserPage;
    feeds: any = FeedsPage;
    //groups: any = GroupsPage;
    friends: any = FriendsPage;
    profile: any = ProfilePage;
    conversation: any = ConversationPage;
    notifications: any = NotificationsPage;
    mySelectedIndex: number;

    user_token: any = localStorage.getItem('user');
    jwtHelper: JwtHelper = new JwtHelper();
    current_user: UserModel = new UserModel();

    allNotifications: any[] = [];
    uncheckedNotifications: any[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public viewCtrl: ViewController,
        public menu: MenuController,
        private userProvider: User
    ) {
        if (navParams.data.tabIndex) {
            this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
            this.mySelectedIndex = navParams.data.tabIndex;
            //this.openFriendsPage();
        }
        else {
            //
            this.mySelectedIndex = 0;
        }   
    }

    ionViewDidLoad() {
        this.menu.enable(true, 'menu');
        this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
        this.get_notifications();
    }

    openPage(page) {
        this.navCtrl.push(page);
    }

    openProfile() {
        this.navCtrl.setRoot(this.profile);
    }

    openNotificationsModal() {
        // let modal = this.modalCtrl.create(NotificationsPage);
        // modal.onDidDismiss(notifications => {
        //   this.get_notifications();
        // });
        // modal.present();
        this.navCtrl.push(NotificationsPage);
    }

    openFriendsPage() {
        this.navCtrl.push(FriendsPage, {
            user: this.current_user
        });
    }

    get_notifications() {
        this.userProvider.get_all_notifications(this.current_user.id)
            .subscribe(response => {
                this.allNotifications = response;

                this.uncheckedNotifications = [];

                for (var i = 0; i < this.allNotifications.length; i++) {
                    if (!this.allNotifications[i].opened_at) {
                        this.uncheckedNotifications.push(this.allNotifications[i]);
                    }
                }
                console.log(this.allNotifications);
            }, error => {
                console.log("Erro ao exibir os países" + error.json());
            });
    }
}
