import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './page/index/index.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { GalleryComponent } from './page/gallery/gallery.component';
import { BlogComponent } from './page/blog/blog.component';
import { BlogDetailsComponent } from './page/blog-details/blog-details.component';
import { ContactComponent } from './page/contact/contact.component';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutUsComponent,
    ScheduleComponent,
    GalleryComponent,
    BlogComponent,
    BlogDetailsComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
