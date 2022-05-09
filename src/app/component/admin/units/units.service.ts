import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Unit } from './units.model';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  constructor(private afs: AngularFirestore) {}

  getUnitsList() {
    return this.afs.collection('units').snapshotChanges();
  }

  getUnitsValueList() {
    return this.afs.collection('units').valueChanges();
  }

  createUnit(value: Unit) {
    return this.afs.collection('units').add({ value });
  }

  deleteUnit(unit: any) {
    return this.afs.collection('units').doc(unit.id).delete();
  }
}
