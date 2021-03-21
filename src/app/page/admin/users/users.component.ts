import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  countUsers;
  user = this.form.group({
    name: '',
    email: ''
  });

  constructor(
    private adminService: AdminService,
    private form: FormBuilder
  ) { }

  async ngOnInit() {
    await this.adminService.getGyms()
      .subscribe((gyms: any) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const gym = gyms.find(gym => gym.uid == user.uid)
        // this.users = gym.subscribers;
        this.users = Object.values(gym.subscribers);
        this.countUsers = gym.subscribers.length;
      });
    // this.adminService.getCountSubscribers();
  }

  // async register() {
  //   await this.adminService.addUser(this.user.value, this.countUsers);
  // }

  async confirm(id) {
    await this.adminService.deleteUser(id);
    console.log("Subscription removed! User:", id);
  }

  decline() {
    console.log("Operation canceled!");
  }

}
