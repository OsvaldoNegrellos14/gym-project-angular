import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent implements OnInit {

  diets:any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.publicService.getDiets()
    .subscribe((diets:any) => {
      this.diets = diets
      console.log(this.diets)
    })
  }

}
