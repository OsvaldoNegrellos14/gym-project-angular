import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public contactForm: FormGroup;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(public firebaseService: FireService, private form: FormBuilder, private route: Router, private modalService: BsModalService) {
    this.contactForm = this.validation();
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }
  get email() { return this.contactForm.get('email'); }
  get password() { return this.contactForm.get('password'); }
  validation() {
    return this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  async onSignUp(template: TemplateRef<any>) {
    if (this.contactForm.valid) {
      await this.firebaseService.signUp(this.user.value.email, this.user.value.password);
      if (this.firebaseService.isLoggin) {
        this.openModal(template);
        this.isSignedIn = true;
      }
    }
  }

  async onSignIn() {
    if (this.contactForm.valid) {
      await this.firebaseService.signIn(this.user.value.email, this.user.value.password);
      if (this.firebaseService.isLoggin) {
        this.isSignedIn = true;
        this.route.navigateByUrl('admin');
      }
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
