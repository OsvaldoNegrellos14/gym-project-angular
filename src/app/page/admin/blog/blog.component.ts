import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  preview = true;
  constructor() { }

  ngOnInit() {
  }

  confirm() {
    console.log("Blog deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
