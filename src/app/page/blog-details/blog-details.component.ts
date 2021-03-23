import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  newDetails:any
  news:any;
  days:any;

  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService
  ) {
    // console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.publicService.getnewDetails(this.route.snapshot.paramMap.get('id'))
    .subscribe((newDetails:any) => {
      this.newDetails = newDetails
      // console.log(this.newDetails)
    })
    this.publicService.getDataNews()
    .subscribe((news:[]) => {
      this.news = news.sort((a:any, b:any) => (a.id > b.id) ? 1 : -1).reverse()
      // console.log(this.news)
    })
    this.publicService.getDaysGym()
    .subscribe((week:any) => {
      this.days = week;
      // console.log(this.days);
    })
  }

}
