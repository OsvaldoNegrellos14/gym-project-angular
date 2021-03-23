import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images:any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.publicService.getGallery()
    .subscribe((gallery:any) => {
      this.images = gallery
      console.log(this.images)
    })
  }

}
