import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  isCollapsedSub = true;
  path: string;
  user;
  constructor(private router: Router, private fire: FireService) {
    this.path = router.url;
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  logout() {
    this.fire.logOut();
  }

}
