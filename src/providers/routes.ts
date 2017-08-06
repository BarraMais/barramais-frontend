import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Routes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Routes {

  constructor(public http: Http) {
    console.log('Hello Routes Provider');
  }

  host(){
    // return "http://10.0.2.2:3000/";
    return "http://barramais.herokuapp.com/";
    // return "http://localhost:3000/";
  }

}
