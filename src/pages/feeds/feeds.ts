import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { ProfilePage } from "../profile/profile";
import { HomePage } from "../home/home";
import { Posts } from '../../providers/posts';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { InterestSelectionPage } from '../interest-selection/interest-selection';

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {

  posts: Array<any> = [];
  profilePage: any = ProfilePage;
  user_token: any = localStorage.getItem('user');
  user: UserModel = new UserModel();
  jwtHelper: JwtHelper = new JwtHelper();
  userInterests: any[] = [];
  interestSelectionPage: any = InterestSelectionPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public postsProvider: Posts,
    public userProvider: User,
    public loadingCtrl: LoadingController,
    private app: App
  ) {
    this.loadPosts();
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.load_interests(this.user);
  }

  // ionViewDidLoad() {
  //   this.loadPosts();
  //   this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
  //   this.load_interests(this.user);
  // }

  openModal() {
    let domain = {
      domain: 'profiles',
      domain_id: this.user.id
    };

    let modal = this.modalCtrl.create(PostModalPage, {'domain_config': domain});
    modal.onDidDismiss(newPost => {
      if(newPost){
        this.posts.unshift(newPost);
      }
    });
    modal.present();
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  openRoot(page){
    this.navCtrl.setRoot(page);
  }

  loadPosts() {
    let loader = this.loadingCtrl.create({
      content: "Carregando Feed..."
    });

    //loader.present();

    this.postsProvider.index().subscribe(
      (posts) => {
        for (var index in posts) {
            posts[index]['show_comment_box'] = false;
        }
        this.posts = posts;
        console.log(posts);
        //loader.dismiss();
      },
      (error) => {
        console.log(error);
        if (typeof error.statusText != "undefined"  &&
            error.statusText == "Unauthorized") {
            this.userProvider.logout().subscribe(
              (response) => {
                console.log("logout init");
                window.localStorage.removeItem("jwt");
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("vessels_type");
                window.localStorage.clear();
                this.navCtrl.setRoot(HomePage);
                this.app.getRootNav().setRoot(HomePage);

              },
              (error) => console.log(error)
            );
        }

        //loader.dismiss();
      }
    );
  }

  load_interests(user){
    this.userProvider.load_interests(user.id)
      .subscribe(response => {
        this.userInterests = response;
        if(this.userInterests.length < 3){
          this.openRoot(this.interestSelectionPage);
        }
      }, error => {
        console.log(error.json());
      })
  }

  doRefresh(refresher) {
    this.loadPosts();
    refresher.complete();
  }

}
