import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  preview = true;
  news:any;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getGyms()
    .subscribe((gyms:any) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const gym = gyms.find(gym => gym.uid == user.uid)
      this.news = gym.news
      console.log(this.news)
    })
  }

  confirm() {
    console.log("Blog deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
