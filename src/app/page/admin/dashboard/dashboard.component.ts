import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  users;
  news;
  routines;
  diets;

  constructor(
    private adminService: AdminService
  ) {
   }

  ngOnInit() {
    this.adminService.getGyms()
    .subscribe((gyms: any) => {
      const gym = gyms.find(gym => gym.uid == this.user.uid)
      this.users = Object.values(gym.subscribers).length;
      this.news = Object.values(gym.news).length;
      this.routines = Object.values(gym.routines).length;
      this.diets = Object.values(gym.diets).length;
    });
  }

}
