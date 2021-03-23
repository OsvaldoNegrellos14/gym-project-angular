import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  news:any;
  days:any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.publicService.getDataNews()
    .subscribe((news:[]) => {
      this.news = news.sort((a:any, b:any) => (a.id > b.id) ? 1 : -1).reverse()
      console.log(this.news)
    })
    this.publicService.getDaysGym()
    .subscribe((week:any) => {
      this.days = week;
      console.log(this.days);
    })
  }

}
