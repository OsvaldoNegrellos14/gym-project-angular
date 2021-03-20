import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any;
  newUser = this.form.group({

  });

  constructor(
    private adminService: AdminService,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.adminService.getGyms()
    .subscribe((gyms:any) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const gym = gyms.find(gym => gym.uid == user.uid)
      this.users = gym.subscribers
      console.log(this.users)
    })

  }

  confirm(uid: any) {
    console.log("Subscription removed! User:",uid);
  }

  decline() {
    console.log("Operation canceled!");
  }

}
