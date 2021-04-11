import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  imgRef: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;
  galleryRoute = '/images/gyms/'
  currentUser;

  constructor(
    private firebaseApi: AngularFireDatabase,
    private fStorage: AngularFireStorage
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  /*General*/
  getGyms() {
    return this.firebaseApi.list(`/adminGeneral/0/gyms/`).valueChanges();
  }

  uploadImg(img, route) {
    this.imgRef = this.fStorage.ref(route);
    return this.uploadTask = this.imgRef.put(img);
  }

  updateImg(img, route) {
    this.imgRef = this.fStorage.ref(route);
    return this.imgRef.put(img);
  }

  /*==============*/

  /*Admin*/

  // async getCountSubscribers() {
  //   await this.firebaseApi.list('/adminGeneral/0/gyms/0/subscribers/').valueChanges().subscribe((count) => {
  //     this.usersCounter = count.length.toString();
  //   });
  // }

  /* Users Component */
  deleteUser(id) {
    this.firebaseApi.database.ref('/adminGeneral/0/gyms/0/subscribers/').child(id).remove();
  }
  /*===========*/

  /* Gallery Component */
  addToGallery(img, id) {
    this.firebaseApi.database.ref('/adminGeneral/0/gyms/0/gallery').child(id).set(img);
  }
  /*===========*/

  /* Routines Component */
  setRoutine(routine, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/routines').child(id).set(routine);
  }
  updateRoutine(routine, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/routines').child(id).update(routine);
  }
  /*=================*/

  /* Diets Component */
  setDiet(diet, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/diets').child(id).set(diet);
  }
  updateDiet(diet, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/diets').child(id).update(diet);
  }
  /*===============*/

  /* News Component */
  setNews(news, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/news').child(id).set(news);
  }
  updateNews(news, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/news').child(id).update(news);
  }
  /*==============*/

  /* Settings Component */
  setAdminData(info) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/info').update(info);
  }
  setCoach(coach, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/coaches').child(id).set(coach)
  }
  updateCoach(coach, id) {
    this.firebaseApi.database.ref('adminGeneral/0/gyms/0/coaches').child(id).update(coach)
  }
  /*===================*/

  /* Drop Data */
  dropData(route) {
    this.firebaseApi.database.ref(route).remove();
  }

  dropImg(id) {
    this.fStorage.storage.refFromURL(id).delete();
  }
  /*==========*/


}
