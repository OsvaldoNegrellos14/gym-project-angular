import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent implements OnInit {

  preview = true;
  diets:any;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getGyms()
    .subscribe((gyms:any) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const gym = gyms.find(gym => gym.uid == user.uid)
      this.diets = gym.routines
      console.log(this.diets)
    })
  }

  confirm() {
    console.log("Diet deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
