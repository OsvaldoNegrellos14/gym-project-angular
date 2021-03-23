import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  data:any = {
    'address': '',
    'phone': '',
    'mail': '',
    'schedule': ''
  };

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.publicService.getDataGym()
    .subscribe((datas:any) => {
      this.data = datas.info
      console.log(this.data)
    })
  }

}
