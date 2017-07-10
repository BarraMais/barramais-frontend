import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Routes } from '../providers/routes';

import { AuthHttp } from 'angular2-jwt';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  private host: string;
  private url: string;
  private event_friends_url: string;
  private group_friends_url: string;
  private my_events_url: string;
  private confirmed_events_url: string;
  private pending_events_url: string;
  private accept_event_url: string;
  private refuse_event_url: string;
  private user_advertiser_url: string;
  private user_friends_url: string;
  private accept_friendship_url: string;
  private refuse_friendship_url: string;
  private request_friendship_url: string;
  private is_friend_of_url: string;
  private pending_friendships_url: string;
  private unfriend_url: string;
  private my_groups_url: string;
  private all_groups_url: string;
  private confirmed_groups_url: string;
  private pending_groups_url: string;
  private accept_group_url: string;
  private refuse_group_url: string;
  private load_nautical_sports_url: string;
  private load_state_for_travels_url: string;
  private load_country_for_travels_url: string;
  private get_user_album_url: string;
  private user_album_url: string;
  private get_interests_by_user_url: string;
  private interests_url: string;
  private update_user_interests_url: string;
  private update_user_nautical_sports_url: string;
  private get_nautical_sports_by_user_url: string;
  // private get_notifications: string;
  private open_all_user_notifications_url: string;
  private is_member_of_url: string;
  private send_request_to_url: string;
  private i_was_invited_to_url: string;
  private comments_url: string;
  private password_url: string;
  private devise_token_url: string;
  private update_password_url: string;
  private support_url: string;
  private load_interests_url: string;
  private omniauth_callback_url: string;
  private my_notifications_url: string;
  private open_my_notifications_url: string;
  private get_ads_with_starting_id_url: string;
  private create_album_url: string;
  private get_albums_url: string;
  private edit_album_url: string;
  private delete_album_url: string;
  private get_album_photos_url: string;
  private add_photos_to_album_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes

  ) {
      this.host = this.routesProvider.host();
      this.setRoutes(this.host);
   }

  setRoutes(host) {
    this.url = host + "users";
    this.event_friends_url = host + "users/event_friends/";
    this.group_friends_url = host + "users/group_friends/";
    this.my_events_url = host + "users/my_events/";
    this.confirmed_events_url = host + "users/confirmed_events/";
    this.pending_events_url = host + "users/pending_events/";
    this.accept_event_url = host + "users/accept_event/";
    this.refuse_event_url = host + "users/refuse_event/";
    this.user_advertiser_url = host + "users/user_advertiser/";
    this.user_friends_url = host + "users/user_friends/";
    this.accept_friendship_url = host + "users/accept_friendship/";
    this.refuse_friendship_url = host + "users/refuse_friendship/";
    this.request_friendship_url = host + "users/request_friendship/";
    this.is_friend_of_url = host + "users/is_friend_of/";
    this.pending_friendships_url = host + "users/pending_friendships";
    this.unfriend_url = host + "users/unfriend/";
    this.my_groups_url = host + "users/my_groups";
    this.all_groups_url = host + "users/all_groups";
    this.confirmed_groups_url = host + "users/confirmed_groups";
    this.pending_groups_url = host + "users/pending_groups";
    this.accept_group_url = host + "users/accept_group";
    this.refuse_group_url = host + "users/refuse_group";
    this.load_nautical_sports_url = host + "users/load_nautical_sports";
    this.load_state_for_travels_url = host + "users/load_state_for_travels";
    this.load_country_for_travels_url = host + "users/load_country_for_travels";
    this.update_user_interests_url = host + "users/update_user_interests";
    this.get_interests_by_user_url = host + "interests/get_interests_by_user/";
    this.interests_url = host + "interests";
    this.update_user_nautical_sports_url = host + "users/update_user_nautical_sports";
    this.get_nautical_sports_by_user_url = host + "nautical_sports/get_nautical_sports_by_user";
    this.open_all_user_notifications_url = host + "users/open_all_user_notifications/";
    this.is_member_of_url = host + "users/is_member_of/";
    this.send_request_to_url = host + "users/send_request_to/";
    this.i_was_invited_to_url = host + "users/i_was_invited_to/";
    this.comments_url = host + "comments/";
    this.password_url = host + 'users/password';
    this.devise_token_url = host + 'devise_token';
    this.update_password_url = host + 'users/password';
    this.support_url = host + '/users/send_support_email.json?message=';
    this.load_interests_url = host + '/users/load_interests/';
    this.omniauth_callback_url = host + '/users/auth/facebook/callback.json';
    this.my_notifications_url = host + '/users/my_notifications';
    this.open_my_notifications_url = host + '/users/open_my_notifications';
    this.get_ads_with_starting_id_url = host + 'users/get_ads_with_starting_id/';
    this.get_user_album_url = host + "album_photos/get_user_album/";
    this.user_album_url = host + "album_photos";
    this.create_album_url = host + "albums";
    this.get_albums_url = host + "albums/get_user_album/";
    this.get_album_photos_url = host + "photos/get_album_photo/";
    this.edit_album_url = host + "albums/edit";
    this.delete_album_url = host + "albums/";
    this.add_photos_to_album_url = host + "photos";
  }

  getAdsWithStartingId(ad_id){
    return this.authHttp.get(this.get_ads_with_starting_id_url + ad_id + ".json")
      .map(res => res.json());
  }

  open_my_notifications(user_id){
    return this.authHttp.get(this.open_my_notifications_url + ".json")
      .map(res => res.json());
  }

  load_interests(user_id){
    return this.authHttp.get(this.load_interests_url + user_id + ".json")
      .map(res => res.json());
  }

  is_member_of(group){
    return this.authHttp.get(this.is_member_of_url + group.id + ".json")
      .map(res => res.json());
  }

  send_request_to(group){
    return this.authHttp.get(this.send_request_to_url + group.id + ".json")
      .map(res => res.json());
  }

  i_was_invited_to(group){
    return this.authHttp.get(this.i_was_invited_to_url + group.id + ".json")
      .map(res => res.json());
    // this.comments_url = this.host + "comments/";
  }

  get_notification_by_id(user_id, notification_id){
    return this.authHttp.get(this.comments_url + notification_id + ".json")
      .map(res => res.json());
  }

  open_all_user_notifications(user_id){
    return this.authHttp.get(this.open_all_user_notifications_url + user_id + ".json")
      .map(res => res.json());
  }

  // get_all_notifications(user_id){
  //   return this.authHttp.get(this.url + "/" + user_id + "/notifications" + ".json")
  //     .map(res => res.json());
  // }

  get_all_notifications(user_id){
    return this.authHttp.get(this.my_notifications_url + ".json")
      .map(res => res.json());
  }

  get_nautical_sports_by_user(user_id){
    return this.authHttp.get(this.get_nautical_sports_by_user_url + "/" + user_id + ".json")
      .map(res => res.json());
  }

  update_user_nautical_sports(user_id, userNauticalSports){
    return this.authHttp.put(this.update_user_nautical_sports_url + "/" + user_id + ".json", {'user_nautical_sports': userNauticalSports})
      .map(res => res.json());
  }

  update_user_interests(user_id, userInterests){
    return this.authHttp.put(this.update_user_interests_url + "/" + user_id + ".json", {'user_interests': userInterests})
      .map(res => res.json());
  }

  get_interests_by_user(user_id){
    return this.authHttp.get(this.get_interests_by_user_url + "/" + user_id + ".json")
      .map(res => res.json());
  }

  get_interests(){
    return this.authHttp.get(this.interests_url + ".json")
      .map(res => res.json());
  }

  create_album(album, user_id) {
    let d = new Date;
    let new_name = user_id + d.getTime();
    return this.authHttp.post(this.create_album_url + ".json", {
        'image': album.cover_url,
        'title': album.title, 
        'filename': new_name
    })
      .map(res => res.json());
  }

  create_album_photo(albumPhoto, user_id){
    let d = new Date;
    let new_name = user_id + d.getTime();
    return this.authHttp.post(this.user_album_url + ".json", {'photo': {'image': albumPhoto.photo, 'filename': new_name}})
      .map(res => res.json());
  }
    
  update_album_photo(albumPhoto){
    return this.authHttp.put(this.user_album_url + "/" + albumPhoto.id + ".json", {'album_photo': albumPhoto})
      .map(res => res.json());
  }
    //gu
  add_photos_to_album(album_id, photos_array) {
    // const param = {
    //     'photo': {
    //         'album_id': album_id,
    //         'image': photos_array,
    //     }
    // };

    const param = {
        'album_id': album_id,
        'image': photos_array,
    };
    
    const path = this.add_photos_to_album_url + ".json";
    console.log("path url = " + path);    
    console.log(param);

    return this.authHttp.post(path, param)
      .map(res => res.json());
  }

  get_user_album(user_id){
    return this.authHttp.get(this.get_user_album_url + user_id + ".json")
      .map(res => res.json());
  }
  
  //gu
  get_albums(user_id) {
    return this.authHttp.get(this.get_albums_url  + user_id )
      .map(res => res.json());
  }

  //gu
  get_album_photos(album_id) {
    return this.authHttp.get(this.get_album_photos_url  + album_id )
      .map(res => res.json());
  }

  //gu
  delete_album(album_id){
    return this.authHttp.delete(this.delete_album_url + album_id + ".json")
      .map(res => res.json());
  }

  destroy_user_album_photo(photo_id){
    return this.authHttp.delete(this.user_album_url + "/" + photo_id + ".json")
      .map(res => res.json());
  }

  load_nautical_sports(){
    return this.authHttp.get(this.load_nautical_sports_url + ".json")
      .map(res => res.json());
  }

  load_state_for_travels(){
    return this.authHttp.get(this.load_state_for_travels_url + ".json")
      .map(res => res.json());
  }

  load_country_for_travels(){
    return this.authHttp.get(this.load_country_for_travels_url + ".json")
      .map(res => res.json());
  }

  getUser(user_id){
    return this.authHttp.get(this.url + "/" + user_id + ".json")
      .map(res => res.json());
  }

  create(user){
    return this.http.post(this.url + ".json", {'user': user})
      .map(res => res.json());
  }

  update(user){
    return this.authHttp.put(this.url + ".json", {'user': user})
      .map(res => {
        let user_token = res.json();
        localStorage.setItem("user", user_token.user);
        return user_token;
      });
  }

  delete(){
    return this.authHttp.delete(this.url + ".json")
      .map(res => res.json());
  }

  // Session sign_up : (post)users.json
  login(user){
    return this.http.post(this.url + "/sign_in.json", {'user': user})
      .map(res => res.json());
  }

  logout(){
    return this.authHttp.delete(this.url + "/sign_out.json")
      .map(res => res.json());
  }

  event_friends(event){
    return this.authHttp.get(this.event_friends_url + event + ".json")
      .map(res => res.json());
  }

  group_friends(group){
    return this.authHttp.get(this.group_friends_url + group + ".json")
      .map(res => res.json());
  }

  myEvents(current_user){
    return this.authHttp.get(this.my_events_url + current_user.id + ".json")
      .map(res => res.json());
  }

  confirmedEvents(current_user){
    return this.authHttp.get(this.confirmed_events_url + current_user.id + ".json")
      .map(res => res.json());
  }

  pendingEvents(current_user){
    return this.authHttp.get(this.pending_events_url + current_user.id + ".json")
      .map(res => res.json());
  }

  accept_event(event){
    return this.authHttp.put(this.accept_event_url + event.id + ".json", {})
    .map(res => res.json());
  }

  refuse_event(current_user, event){
    return this.authHttp.put(this.refuse_event_url + event.id + ".json", {'event': event.id})
    .map(res => res.json());
  }

  myGroups(current_user){
    return this.authHttp.get(this.my_groups_url + ".json")
      .map(res => res.json());
  }

  allGroups(){
    return this.authHttp.get(this.all_groups_url + ".json")
      .map(res => res.json());
  }

  confirmedGroups(current_user){
    return this.authHttp.get(this.confirmed_groups_url + ".json")
      .map(res => res.json());
  }

  pendingGroups(current_user){
    return this.authHttp.get(this.pending_groups_url + ".json")
      .map(res => res.json());
  }

  accept_group(current_user, group){
    return this.authHttp.put(this.accept_group_url + ".json", {'group': group.id})
    .map(res => res.json());
  }

  refuse_group(current_user, group){
    return this.authHttp.put(this.refuse_group_url + ".json", {'group': group.id})
    .map(res => res.json());
  }

  save_avatar(user){
    let d = new Date;
    let new_name = user.id + d.getTime();

    return this.authHttp.put(this.url + "/" + user.id + "/" + "save_avatar.json", {'avatar': {'image': user.avatar, 'filename': new_name}})
      .map(res => res.json());
  }

  save_cover_photo(user){
    let d = new Date;
    let new_name = user.id + d.getTime();

    return this.authHttp.put(this.url + "/" + user.id + "/" + "save_cover_photo.json", {'cover_photo': {'image': user.cover_photo, 'filename': new_name}})
      .map(res => {
        let user_token = res.json();
        localStorage.setItem("user", user_token.user);
        return user_token;
      });
  }

  userAdvertiser(current_user){
    return this.authHttp.get(this.user_advertiser_url + current_user.id + ".json")
      .map(res => res.json());
  }

  user_friends(user) {
    return this.authHttp.get(this.user_friends_url + user.id + ".json" )
      .map(res => res.json());
  }

  accept_friendship(user){
    return this.authHttp.get(this.accept_friendship_url + user.id + ".json" )
      .map(res => res.json());
  }

  refuse_friendship(user){
    return this.authHttp.get(this.refuse_friendship_url + user.id + ".json" )
      .map(res => res.json());
  }

  request_friendship(user){
    return this.authHttp.get(this.request_friendship_url + user.id + ".json" )
      .map(res => res.json());
  }

  is_friend_of(user){
    return this.authHttp.get(this.is_friend_of_url + user.id + ".json")
      .map(res => res.json());
  }

  pending_friendships(){
    return this.authHttp.get(this.pending_friendships_url + ".json")
      .map(res => res.json());
  }

  unfriend(user){
    return this.authHttp.get(this.unfriend_url + user.id + ".json")
      .map(res => res.json());
  }

  user_list(){
    return this.authHttp.get(this.url + ".json")
      .map(res => res.json());
  }

  forgot_password(user) {
    return this.authHttp.post(this.password_url + ".json", user)
      .map(res => res.json());
  }

  get_devise_token() {
    return this.authHttp.get(this.devise_token_url + ".json")
      .map(res => res.json());
  }

  update_password(user) {
    return this.authHttp.put(this.update_password_url + ".json", user)
      .map(res => res.json());
  }

  send_support_email(message) {
    this.support_url += message;
    return this.authHttp.get(this.support_url).map(res => res.json());
  }

  register_or_login_with_facebook(auth) {
    return this.http.post(this.omniauth_callback_url, {cordova: btoa(JSON.stringify(auth))}).map(res => res.json());
  }
}
