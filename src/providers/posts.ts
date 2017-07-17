import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Routes } from '../providers/routes';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the Posts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Posts {
  private host: string;

  private host_post: string;
  private host_comment: string;
  private create_url: string;
  private index_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes

  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

  setRoutes(host){
    this.host_post = host + "posts";
    this.host_comment = host + "comments";
    this.create_url = this.host_post + ".json";
    this.index_url = this.host_post + ".json";
  }

  create(post) {
    console.log(post);
    return this.authHttp.post(this.create_url, post)
      .map(res => res.json());
  }

  index() {
    return this.authHttp.get(this.index_url)
      .map(res => res.json());
  }

  posts_with_domain(domain_config) {
    return this.authHttp.get(this.posts_with_domain_url(domain_config))
      .map(res => res.json());
  }

  get_post_by_id(post_id){
    return this.authHttp.get(this.host_post + '/' + post_id + ".json")
      .map(res => res.json());
  }

  delete(post) {
    return this.authHttp.delete(this.delete_url(post))
    .map(res => res.json());
  }

  like(post) {
    return this.authHttp.get(this.like_url(post))
      .map(res => res.json());
  }

  unlike(post) {
    return this.authHttp.get(this.unlike_url(post))
      .map(res => res.json());
  }

  get_likes(post) {
    return this.authHttp.get(this.get_likes_url(post))
      .map(res => res.json());
  }

  comment(post, comment) {
    return this.authHttp.post(this.comment_url(post), {comment: {body: comment}})
      .map(res => res.json());
  }

  delete_comment(comment) {
    return this.authHttp.delete(this.delete_comment_url(comment))
      .map(res => res.json());
  }


  post_comments(post) {
    return this.authHttp.get(this.post_comments_url(post))
      .map(res => res.json());
  }

  enrich_link(post, link) {
    return this.authHttp.get(this.enrich_link_url(post, link))
      .map(res => res.json());
  }

  like_url(post) {
    return this.host_post + '/' + post.id + '/like.json';
  }

  unlike_url(post) {
    return this.host_post + '/' + post.id + '/unlike.json';
  }

  get_likes_url(post) {
    return this.host_post + '/' + post.id + '/get_likes.json';
  }

  enrich_link_url(post, url) {
    return this.host_post + '/enrich_link.json?url='+url;
  }

  comment_url(post) {
    return this.host_post + '/' + post.id + '/comment.json';
  }

  post_comments_url(post) {
    return this.host_post + '/' + post.id + '/comments.json';
  }

  delete_url(post) {
    return this.host_post + '/' + post.id + '.json';
  }

  delete_comment_url(comment) {
    return this.host_comment + '/' + comment.id + '.json';
  }

  posts_with_domain_url(config) {
    return this.host_post + '/' + config.domain + '/' + config.domain_id + '.json';
  }
}
