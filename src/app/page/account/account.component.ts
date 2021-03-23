import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:any = {
    'name': '',
    'email': '',
    'height': '',
    'weight': '',
    'routines': null,
    'diets': null
  };

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.getUsers()
    .subscribe((users:any) => {
      this.user = users.find(user => user.uid == JSON.parse(localStorage.getItem('user')).uid)
      console.log(this.user)
    })
  }

}
