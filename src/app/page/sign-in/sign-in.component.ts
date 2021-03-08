import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  modalRef: BsModalRef;
  isSignedIn = false;
  user = this.form.group({
    email: [''],
    password: ['']
  });
  constructor(public firebaseService: FireService, private form: FormBuilder, private route: Router, private modalService: BsModalService) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignUp(template: TemplateRef<any>) {
    await this.firebaseService.signUp(this.user.value.email, this.user.value.password);
    if (this.firebaseService.isLoggin) {
      this.openModal(template);
      this.isSignedIn = true;
    }
  }

  async onSignIn() {
    await this.firebaseService.signIn(this.user.value.email, this.user.value.password);
    if (this.firebaseService.isLoggin) {
      this.isSignedIn = true;
      this.route.navigateByUrl('admin');
    }
  }
  openModal(template: TemplateRef<any>) {
    if (this.firebaseService.isLoggin == true) {
      this.modalRef = this.modalService.show(template);
    }
  }

  confirm() {
    this.route.navigateByUrl('admin');
    this.modalRef.hide();
  }

}
