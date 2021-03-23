import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(
    private firebaseApi: AngularFireDatabase
  ) { }

  getUsers() {
    return this.firebaseApi.list(`/users/`).valueChanges();
  }

  addUser(info, id) {
    // const id = this.usersCounter;
    this.firebaseApi.database.ref('/adminGeneral/0/gyms/0/subscribers/').child(id).set(info);
    // this.firebaseApi.database.ref('/users/').child(id).set(info);
  }

  getRoutines() {
    return this.firebaseApi.list(`/adminGeneral/0/gyms/0/routines`).valueChanges();
  }

  getTrainers() {
    return this.firebaseApi.list('/adminGeneral/0/gyms/0/coaches').valueChanges();
  }

  getGallery() {
    return this.firebaseApi.list('/adminGeneral/0/gyms/0/gallery').valueChanges();
  }

  getDiets() {
    return this.firebaseApi.list('/adminGeneral/0/gyms/0/diets').valueChanges();
  }
  
}
