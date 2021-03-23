import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.component.html',
  styleUrls: ['./diets.component.css']
})
export class DietsComponent implements OnInit {
  initSubscription: Subscription;
  // addSubscription: Subscription;

  diets:any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.initSubscription = this.publicService.getDiets()
    .subscribe((diets:any) => {
      this.diets = diets
      console.log(this.diets)
    })
  }

  addToDiets(diet:any) {
    let addSubscription = this.publicService.getUsers()
    .subscribe((users:any) => {
      const user = JSON.parse(localStorage.getItem('user'))
      for (let index = 0; index < users.length; index++) {
        if(users[index].uid == user.uid) {
          this.publicService.postToDiets(diet, index);
          addSubscription.unsubscribe();
        }
      }
    });
    
  }

  ngOnDestroy(): void {
    this.initSubscription.unsubscribe();
    // this.diets = ''
  }

}
