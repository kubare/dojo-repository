import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { IceCreamFavourtie, UserState } from 'src/app/store/user/user.state';
import { IceCreamFav } from './ice-cream.model';

@Injectable({
  providedIn: 'root',
})
export class IceCreamsUserService {
  private favs = new BehaviorSubject([{}]);
  constructor(
    private afs: AngularFirestore,
    private loginService: LoginService
  ) {}

  addFavIceCreams(iceCream: IceCreamFavourtie, list: IceCreamFavourtie[]) {
    const id = this.loginService.getUserID();
    console.log(list);

    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: [...list, iceCream],
    });
  }

  removeFavIceCreams(iceCream: IceCreamFavourtie, list: IceCreamFavourtie[]) {
    const id = this.loginService.getUserID();
    console.log(list);
    console.log(iceCream);

    const newFav = list.filter((item) => item.name !== iceCream.name);
    console.log(newFav);

    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: [...newFav],
    });
  }
}
