import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPagePage } from '../groups/group-page';

/**
 * Generated class for the GroupsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groups-list',
  templateUrl: 'groups-list.html',
})
export class GroupsListPage {

  groups: Array<any>;
  pageTitle: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.groups = navParams.data.groups;
    this.pageTitle = navParams.data.pageTitle;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsListPage');
  }

  openPage(group){
    this.navCtrl.push(GroupPagePage, {group: group});
  }

}
