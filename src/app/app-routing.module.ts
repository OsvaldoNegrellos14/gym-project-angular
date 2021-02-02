import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './page/about-us/about-us.component';
import {IndexComponent} from './page/index/index.component';
import {ScheduleComponent} from './page/schedule/schedule.component';
import {GalleryComponent} from './page/gallery/gallery.component';
import {BlogComponent} from './page/blog/blog.component';
import {ContactComponent} from './page/contact/contact.component';
import {BlogDetailsComponent} from './page/blog-details/blog-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: IndexComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'portfolio', component: GalleryComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog-details', component: BlogDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
