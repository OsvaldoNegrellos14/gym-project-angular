import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isSignedIn = false;
  user = this.form.group({
    email: [''],
    password: ['']
  });
  constructor(public firebaseService: FireService, private form: FormBuilder, private route: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null){
      this.isSignedIn = true;
    }else {
      this.isSignedIn = false;
    }
  }

  async onSignUp(){
    console.log(this.user.value.email, this.user.value.password);
    await this.firebaseService.signUp(this.user.value.email, this.user.value.password);
    if(this.firebaseService.isLoggin){
      this.isSignedIn = true;
    }
  }

  async onSignIn() {
    await this.firebaseService.signIn(this.user.value.email, this.user.value.password);
    if(this.firebaseService.isLoggin){
      this.isSignedIn = true;
      this.route.navigateByUrl('admin')
    }
  }

  handleLogout(){
    this.isSignedIn = false;
  }


}
