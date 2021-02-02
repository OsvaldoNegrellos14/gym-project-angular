import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  isCollapsedSub = true;
  path: string;

  constructor(private router: Router) {
    this.path = router.url;
  }

  ngOnInit() {
  }

}
