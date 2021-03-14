import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  preview = true;
  constructor() { }

  ngOnInit() {
  }

  confirm() {
    console.log("Routine deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
