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

  getDataGym() {
    return this.firebaseApi.object(`/adminGeneral/0/gyms/0`).valueChanges();
  }

  getDataNews() {
    return this.firebaseApi.list('/adminGeneral/0/gyms/0/news').valueChanges();
  }

  getDaysGym() {
    return this.firebaseApi.list('/adminGeneral/0/gyms/0/week').valueChanges();
  }

  getnewDetails(id:any) {
    return this.firebaseApi.object(`/adminGeneral/0/gyms/0/news/${id}`).valueChanges();
  }
  
  postToRoutines(routine:any, id) {
    this.firebaseApi.database.ref(`/users/${id}/routines`).child(routine.id).set(routine);
  }

  postToDiets(diet:any, id) {
    this.firebaseApi.database.ref(`/users/${id}/diets`).child(diet.id).set(diet);
  }

  deleteToRoutines(rotuine:any, id) {
    this.firebaseApi.database.ref(`/users/${id}/routines/${rotuine.id}`).remove();
  }

  deleteToDiet(diet:any, id) {
    this.firebaseApi.database.ref(`/users/${id}/diets/${diet.id}`).remove();
  }

}
