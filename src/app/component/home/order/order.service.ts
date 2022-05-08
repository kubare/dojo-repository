import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/auth/login/login.service';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private loginService: LoginService,
    private afs: AngularFirestore
  ) {}

  addFavIceCreams(name: any) {
    const id = this.loginService.getUserID();
    this.afs.doc<UserState>(`users/${id}`).update({
      order: name,
    });
  }
}
