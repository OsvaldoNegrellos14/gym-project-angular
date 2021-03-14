import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any;

  constructor(
    private adminService: AdminService
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

  confirm() {
    console.log("Subscription removed");
  }

  decline() {
    console.log("Operation canceled");
  }

}
