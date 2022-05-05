import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = this.auth.authState;

  constructor(private auth: AngularFireAuth) {}

  login(username: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }
}
