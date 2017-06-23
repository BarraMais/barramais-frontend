import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-user-popover',
  template: `    
      <p (click)="close()">EXCLUIR AMIGO</p>
      <p (click)="close()">BLOQUEAR</p>
      <p (click)="close()">NÃO VER PUBLICAÇÕES</p>
  `
})
export class UserPopover {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}