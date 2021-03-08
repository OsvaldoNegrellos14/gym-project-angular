import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent implements OnInit {

  preview = true;
  constructor() { }

  ngOnInit() {
  }

  confirm() {
    console.log("Diet deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
