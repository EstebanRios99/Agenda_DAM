import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Schedules';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_schedule(record) {
    console.log(record);

    return this.firestore.collection(this.collectionName).add(record);
  }

  read_schedule() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_schedule(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_schedule(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
