import { Component, Input } from '@angular/core';
import { UserModel } from "../../models/user.model";
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { PostModalPage } from "../../pages/post-modal/post-modal";
import { CommentModalPage } from "../../pages/comment-modal/comment-modal";
import { GalleryModalPage } from "../../pages/gallery-modal/gallery-modal";
import { ProfilePage } from "../../pages/profile/profile";
import { Posts } from '../../providers/posts';
import { InAppBrowser } from 'ionic-native';
import { JwtHelper } from 'angular2-jwt';
import { Events } from 'ionic-angular';
import { EventPagePage } from '../../pages/events/event-page';
import { GroupPagePage } from '../../pages/groups/group-page';
import { BmPostLikesPage } from '../../pages/bm-post-likes/bm-post-likes';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController }  from 'ionic-angular';

/*
  Generated class for the BmPost component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'bm-post',
  templateUrl: 'bm-post.html'
})
export class BmPostComponent {
  @Input() posts;
  public comment: any;
  galleryModal: any = GalleryModalPage;
  profilePage: any = ProfilePage;
  likesPage: any = BmPostLikesPage;
  jwtHelper: JwtHelper = new JwtHelper();
  token: any = localStorage.getItem('jwt');
  user_token: any = localStorage.getItem('user');
  current_user: any;
  hasPosts: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public postsProvider: Posts,
    public alertCtrl: AlertController,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing
  ) {
    this.comment = {}
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    events.subscribe('onUpdateUser', (user) => { this.current_user = new UserModel(user) });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
    // this.check_posts(this.posts);
  }

  public share() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Para onde quer compartilhar',
      buttons: [
        {
          text: 'WhatsApp',
          handler: () => {
            this.whatsappShare();
          }
        },
        {
          text: 'Facebook',
          handler: () => {
            this.facebookShare();
          }
        },
        {
          text: 'Instagram',
          handler: () => {
            this.instagramShare();
          }
        },
        {
          text: 'Twitter',
          handler: () => {
            this.twitterShare();
          }
        },
        {
          text: 'Email',
          handler: () => {
            this.emailShare();
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

  whatsappShare(){
    this.socialSharing.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  "FOI" /* url */)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

  twitterShare(){
  this.socialSharing.shareViaTwitter("Message via Twitter",null /*Image*/,"FOI")
  .then(()=>{
      alert("Success");
    },
    ()=>{
       alert("failed")
    })
}

facebookShare(){
  this.socialSharing.shareViaFacebook("Message via Twitter",null /*Image*/,"FOI")
  .then(()=>{
      alert("Success");
    },
    ()=>{
       alert("failed")
    })
}

instagramShare(){
  this.socialSharing.shareViaInstagram("Message via Twitter",null /*Image*/)
  .then(()=>{
      alert("Success");
    },
    ()=>{
       alert("failed")
    })
}

emailShare(){
  this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
    alert("Success");
  }).catch(() => {
    alert("failed");
  });
}

  openModal() {
    let modal = this.modalCtrl.create(PostModalPage);
    modal.onDidDismiss(newPost => {
      if(newPost) {
        this.posts.unshift(newPost);
        // this.hasPosts = true;
      }
    });
    modal.present();
  }


  openCommentsModal(post) {
    let modal = this.modalCtrl.create(CommentModalPage, {post: post});
    modal.present();
  }

   toggleCommentBox(post) {
        post.show_comment_box = !post.show_comment_box;
  }
  openPage(page, params={}){
    this.navCtrl.push(page, params);
  }

  openProfile(user_id) {
    this.openPage(this.profilePage, {user: user_id});
  }

  openEvent(event) {
    this.openPage(EventPagePage, {event: event});
  }

  openGroup(group) {
    this.openPage(GroupPagePage, {group: group});
  }

  openPhotos(photos){
    let modal = this.modalCtrl.create(this.galleryModal, {photos: photos});
    modal.present();
  }

  openLink(link){
    if(link){
      let browser = new InAppBrowser(link, '_system');
      browser
    }
  }

  like(post) {
    this.postsProvider.like(post).subscribe(
      (updated_post) => post.likes = updated_post.likes,
      (error) => console.log(error)
    );
  }

  unlike(post) {
    this.postsProvider.unlike(post).subscribe(
      (updated_post) => post.likes = updated_post.likes,
      (error) => console.log(error)
    );
  }

  deletePost(post) {
    let prompt = this.alertCtrl.create({
      title: 'Deletar postagem',
      message: 'Deseja deletar este post?',
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
            this.postsProvider.delete(post).subscribe(
              (data) => {
                this.posts = this.posts.filter(data => data.id < post.id || data.id > post.id);
                // this.check_posts(this.posts);
              },
              (error) => console.log(error)
            );
          }
        }
      ]
    });
    prompt.present();
  }

  openDomain(domain_type, domain) {
    switch(domain_type) {
      case 'profiles': {
        this.openProfile(domain.id);
        break;
      }
      case 'events': {
        this.openEvent(domain);
        break;
      }
      case 'groups': {
        this.openGroup(domain);
      }
      default: { break; }
    }
  }

  getDomainName(post) {
    if (post.domain_type == 'profiles')
      return post.domain.first_name + " " + post.domain.last_name;

    return post.domain.name;
  }

  notTheAuthor(post) {
    if(post.domain_type == 'profiles' && post.domain.id == post.user.user_id){
      return false;
    }

    return true;
  }

  deleteComment(post, comment) {
    let prompt = this.alertCtrl.create({
      title: 'Deletar comentário',
      message: 'Deseja deletar este comentário?',
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
            this.postsProvider.delete_comment(comment).subscribe(
              (data) => {
                post.comments = post.comments.filter(data => data.id < comment.id || data.id > comment.id);
              },
              (error) => console.log(error)
            );
          }
        }
      ]
    });
    prompt.present();
  }

  like_color_for(post) {
    if(post.likes.didILiked)
      return 'barramais';
    else
      return 'grayed'
  }

  like_image_for(post) {
    if(post.likes.didILiked)
      return 'assets/images/star_blue.png';
    else
      return 'assets/images/star_gray.png'
  }

  toogle_like(post){
    if(!post.likes.didILiked)
      this.like(post)
    else
      this.unlike(post)
  }

  createComment(post, comment) {
    this.postsProvider.comment(post, comment).subscribe(
      (comment) => {
        post.new_comment_body = "";
        post.comments.push(comment);
      },
      (error) => console.log(error)
    );
  }

  show_plus_sign(i) {
    if(i==3) return "plus-sign-icon";
    return "";
  }

  bringsFourImages(post_images) {
    return post_images.filter((item, index) => { index < 4 })
  }

  // check_posts(posts){
  //   console.log(posts);
  //   if(posts.length > 0){
  //     this.hasPosts = true;
  //   } else {
  //     this.hasPosts = false;
  //   }
  // }

}
