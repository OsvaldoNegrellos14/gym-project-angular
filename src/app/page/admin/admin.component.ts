import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private firebaseService: FireService, private route: Router) { }
  isSigned = false;
  ngOnInit() {
    if(localStorage.getItem('user') !== null){
      this.isSigned = true;
    }else{
      this.isSigned = false;
      this.route.navigateByUrl('signin');
    }
  }

  logout() {
    this.firebaseService.logOut();
    //this.isLogout.emit();
    localStorage.removeItem('user');
    this.route.navigateByUrl('signin');
  }

}
