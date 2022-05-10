import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private afs: AngularFirestore) {}

  getUsersList() {
    return this.afs.collection<UserState>('users').valueChanges();
  }
}
