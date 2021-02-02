import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import {RouterModule} from '@angular/router';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, ContactComponent],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule,
    BrowserAnimationsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
