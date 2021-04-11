import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  user = this.form.group({
    info: {
      name: '',
      height: '',
      weight: '',
      age: ''
    },
    email: '',
    uid: '',
    img: ''
  });
  data:any;

  constructor(
    private form: FormBuilder,
    private publicService: PublicService
  ) { }

  ngOnChances() {

  }

  ngOnInit() {
    this.data = localStorage.getItem('user');
    if (this.data !== null) {
      this.publicService.getUsers().subscribe((response:any) => {
        const userLocal = JSON.parse(this.data);
        const user = response.find(user => user.uid == userLocal.uid)
        this.user.value.info = user.info;
        this.user.value.img = user.img;
        this.user.value.email = user.email;
        this.user.value.uid = user.uid;
        console.log(this.user.value)
        console.log(user)
      })
    }
  }
  
  async register() {
    console.log(this.user.value)
    await this.publicService.addUser(this.user.value, this.user.value.uid);
  }

}
