import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Units } from './units.model';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  constructor(private afs: AngularFirestore) {}

  getUnitsList() {
    return this.afs.collection('units').valueChanges();
  }

  createUnit(value: Units) {
    return this.afs.collection('units').add({ value });
  }

  deleteUnit(unit: Units) {
    return this.afs.collection('units').doc(unit.id).delete();
  }
}
