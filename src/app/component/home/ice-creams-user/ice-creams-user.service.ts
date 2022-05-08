import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/auth/login/login.service';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class IceCreamsUserService {
  private favs: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  constructor(
    private afs: AngularFirestore,
    private loginService: LoginService
  ) {}

  addFavIceCreams(name: any) {
    const id = this.loginService.getUserID();
    const newList = [...this.favs.getValue(), name];
    this.afs.doc<UserState>(`users/${id}`).update({
      favouriteIC: [...newList],
    });
  }
}
