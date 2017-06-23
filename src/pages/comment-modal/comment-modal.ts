import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Posts } from '../../providers/posts';

/*
  Generated class for the CommentModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment-modal',
  templateUrl: 'comment-modal.html'
})
export class CommentModalPage {
  public post: any;
  public comments: Array<any>;
  public comment: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionsheetCtrl: ActionSheetController,
    public postsProvider: Posts
  ) {
    this.post = this.navParams.data.post;
    this.loadComments();
    this.comment = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  loadComments() {
    this.postsProvider.post_comments(this.post).subscribe(
      (comments) => {
        this.comments = comments;
        console.log(this.comments);
      },
      (error) => console.log(error)
    );
  }

  createComment() {
    this.postsProvider.comment(this.post, this.comment).subscribe(
      (comment) => {
        this.comment = {};
        this.comments.push(comment);
      },
      (error) => console.log(error)
    );
  }
}
