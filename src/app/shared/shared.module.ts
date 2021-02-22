import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import {RouterModule} from '@angular/router';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { SidenavComponent } from './sidenav/sidenav.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, ContactComponent, SidenavComponent],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule
  ],
  exports: [
    NavbarComponent,
    SidenavComponent
  ]
})
export class SharedModule { }
