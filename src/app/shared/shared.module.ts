import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, ContactComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
