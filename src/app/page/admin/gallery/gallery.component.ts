import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  preview = true;
  gallery:any;
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getGyms()
    .subscribe((gyms:any) => {
      const user = JSON.parse(localStorage.getItem('user'));
      const gym = gyms.find(gym => gym.uid == user.uid)
      this.gallery = gym.galery
      console.log(this.gallery)
    })
  }

  confirm(id:any) {
    console.log("Image deleted", id);
  }

  decline() {
    console.log("Operation canceled");
  }

}
