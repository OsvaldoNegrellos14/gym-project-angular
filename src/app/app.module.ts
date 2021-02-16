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
import {AngularFireModule} from '@angular/fire';
import { FireService } from './services/fire.service';
import { SignInComponent } from './sign-in/sign-in.component';

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
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    SharedModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD_Q3XUZ4RnNU9X9KkLGD6rFKbPUoDgwrw",
      authDomain: "gym-utt.firebaseapp.com",
      projectId: "gym-utt",
      storageBucket: "gym-utt.appspot.com",
      messagingSenderId: "1011619827046",
      appId: "1:1011619827046:web:59e258d018d689bb06cca7",
      measurementId: "G-450HD2E26H"
    })
  ],
  providers: [FireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
