import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  routines:any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.publicService.getRoutines()
    .subscribe((routines:any) => {
      this.routines = routines
      console.log(this.routines)
    })
  }

}
