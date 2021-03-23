import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  trainers:any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.publicService.getTrainers()
    .subscribe((coaches:any) => {
      this.trainers = coaches
      console.log(this.trainers)
    })
  }

}
