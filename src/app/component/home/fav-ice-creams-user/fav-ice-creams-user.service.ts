import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { throws } from 'assert';
import { LoginService } from 'src/app/auth/login/login.service';
import { AppState } from 'src/app/store/app.state';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class FavIceCreamsUserService {
  constructor(
    private afs: AngularFirestore,
    private loginService: LoginService,
    private store: Store<AppState>
  ) {}

  getFavIceCreams(id: string) {
    this.afs.collection('users').doc(id).valueChanges();
  }

  addFavIceCreams() {
    const id = this.loginService.getUserID();
    const favs: any = this.store.select((state) => state.user.favouriteIC);
    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: favs,
    });
  }
}
