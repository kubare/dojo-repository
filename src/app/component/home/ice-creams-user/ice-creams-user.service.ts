import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class IceCreamsUserService {
  private favs = new BehaviorSubject([{}]);
  constructor(
    private afs: AngularFirestore,
    private loginService: LoginService
  ) {}

  addFavIceCreams(name: any, list: string[]) {
    const id = this.loginService.getUserID();
    console.log(list);

    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: [...list, name],
    });
  }

  removeFavIceCreams(name: any, list: string[]) {
    const id = this.loginService.getUserID();
    console.log(list);
    console.log(name);

    const newFav = list.filter((item) => item !== name);
    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: [...newFav],
    });
  }
}
