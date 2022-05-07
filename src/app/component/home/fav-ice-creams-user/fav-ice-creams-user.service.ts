import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { throws } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class FavIceCreamsUserService {
  constructor(private afs: AngularFirestore) {}

  getFavIceCreams(id: string) {
    this.afs.collection('users').doc(id).valueChanges();
  }
}
