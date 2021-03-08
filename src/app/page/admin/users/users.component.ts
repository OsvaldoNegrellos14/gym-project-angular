import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  confirm() {
    console.log("Subscription removed");
  }

  decline() {
    console.log("Operation canceled");
  }

}
