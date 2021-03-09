import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  preview = true;
  constructor() { }

  ngOnInit() {
  }

  confirm() {
    console.log("Image deleted");
  }

  decline() {
    console.log("Operation canceled");
  }

}
