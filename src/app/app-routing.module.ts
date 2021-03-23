import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './page/about-us/about-us.component';
import {IndexComponent} from './page/index/index.component';
import {ScheduleComponent} from './page/schedule/schedule.component';
import {GalleryComponent} from './page/gallery/gallery.component';
import {BlogComponent} from './page/blog/blog.component';
import {ContactComponent} from './page/contact/contact.component';
import {BlogDetailsComponent} from './page/blog-details/blog-details.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { AccountComponent } from './page/account/account.component';
import { DietsComponent } from './page/diets/diets.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'signin', component: SignInComponent},
  { path: 'home', component: IndexComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'diets', component: DietsComponent },
  { path: 'portfolio', component: GalleryComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'blog-details', component: BlogDetailsComponent },
  { path: 'account', component: AccountComponent },
  { path: '', loadChildren: () => import('./page/admin/admin.module').then( m => m.AdminModule ) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
