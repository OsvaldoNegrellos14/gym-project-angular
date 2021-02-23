import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireService {
isLoggin = false
  constructor(public firebaseAuth: AngularFireAuth, private route: Router) { }
  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res=>{
      this.isLoggin = true
      localStorage.setItem('user',JSON.stringify(res.user))

    })
  }
  async signUp(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res=>{
      this.isLoggin = true
      localStorage.setItem('user',JSON.stringify(res.user));
      console.log(localStorage.getItem('user'));
    })
  }
  logOut(){
    this.firebaseAuth.signOut().then(()=>{
      this.isLoggin = false;
      localStorage.removeItem('user');
      this.route.navigateByUrl('signin', {skipLocationChange: true}).then(()=>{
        this.route.navigate(['home']);
      })
    })
  }
}
