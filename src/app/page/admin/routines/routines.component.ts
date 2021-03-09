import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  preview = true;
  constructor() {

   }

  ngOnInit() {
  }

  confirm() {
    console.log("Routine deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
