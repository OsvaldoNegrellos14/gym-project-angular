import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  preview = true;
  routines:any;
  constructor(
    private adminService: AdminService
  ) {

   }

  ngOnInit() {
    this.adminService.getGyms()
    .subscribe((gyms:any) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const gym = gyms.find(gym => gym.uid == user.uid)
      this.routines = gym.routines
      console.log(this.routines)
    })
  }

  confirm() {
    console.log("Routine deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
