import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // usersCounter;
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
    // let user = JSON.parse(localStorage.getItem('user'))
    return this.firebaseApi.list(`/adminGeneral/0/gyms/`).valueChanges()
    // .subscribe((gyms:any) => {
    //     const gym = gyms.find(gym => gym.uid == user.uid)
    //     console.log(gym)
    //     return gym.subscribes
    // })
  }

  uploadGymImg(img, id){
    console.log(id);
    this.imgRef = this.fStorage.ref(id);
    return this.uploadTask = this.imgRef.put(img);
  }

  /*==============*/

  /*Admin*/

  // async getCountSubscribers() {
  //   await this.firebaseApi.list('/adminGeneral/0/gyms/0/subscribers/').valueChanges().subscribe((count) => {
  //     this.usersCounter = count.length.toString();
  //   });
  // }

  // addUser(info, id) {
  //   // const id = this.usersCounter;
  //   this.firebaseApi.database.ref('/adminGeneral/0/gyms/0/subscribers/').child(id).set(info);
  //   this.firebaseApi.database.ref('/users/').child(id).set(info);
  // }

  deleteUser(id) {
    this.firebaseApi.database.ref('/adminGeneral/0/gyms/0/subscribers/').child(id).remove();
  }

  addToGallery(img, id) {
    this.firebaseApi.database.ref('/adminGeneral/0/gyms/+/galery').child(id).set(img);
  }


}
