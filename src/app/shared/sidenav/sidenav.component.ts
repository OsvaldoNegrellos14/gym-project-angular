import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  //@Output() isLogout = new EventEmitter<void>();
  path: string;
  constructor(public firebaseService: FireService, private route: Router) {
    this.path = route.url;
  }

  ngOnInit() {
  }

  // logout() {
  //   this.firebaseService.logOut();
  //   //this.isLogout.emit();
  //   localStorage.removeItem('user');
  //   this.route.navigateByUrl('signin');
  // }

  onEvent(url) {
    this.path = url;
  }

}
