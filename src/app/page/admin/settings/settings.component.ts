import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  preview = true;
  gym:any;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getGyms()
    .subscribe((gyms:any) => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.gym = gyms.find(gym => gym.uid == user.uid)
      console.log(this.gym)
    })
  }

  confirm() {
    console.log("Routine deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
