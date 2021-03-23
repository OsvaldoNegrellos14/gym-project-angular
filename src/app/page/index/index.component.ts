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
    name: '',
    email: '',
    uid: ''
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
        this.user.value.name = user.name;
        this.user.value.email = user.email;
        this.user.value.uid = user.uid;
        console.log(response)
      })
    }
  }
  
  async register() {
    await this.publicService.addUser(this.user.value, this.user.value.uid);
  }

}
