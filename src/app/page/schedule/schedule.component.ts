import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  initSubscription: Subscription;
  // addSubscription: Subscription;
  routines:any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.initSubscription = this.publicService.getRoutines()
    .subscribe((routines:any) => {
      this.routines = routines
      console.log(this.routines)
    })
  }

  addToRoutines(routine:any) {
    let addSubscription = this.publicService.getUsers()
    .subscribe((users:any) => {
      const user = JSON.parse(localStorage.getItem('user'))
      for (let index = 0; index < users.length; index++) {
        if(users[index].uid == user.uid) {
          this.publicService.postToRoutines(routine, index);
          addSubscription.unsubscribe()
        }
      }
    });
    
  }

  ngOnDestroy(): void {
    this.initSubscription.unsubscribe();
    // this.routines = '';
  }

}
