import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private firebaseApi: AngularFireDatabase
  ) { }

  getGyms() {
    // let user = JSON.parse(localStorage.getItem('user'))
    return this.firebaseApi.list(`/adminGeneral/0/gyms/`).valueChanges()
    // .subscribe((gyms:any) => {
    //     const gym = gyms.find(gym => gym.uid == user.uid)
    //     console.log(gym)
    //     return gym.subscribes
    // })
  }
  

}
