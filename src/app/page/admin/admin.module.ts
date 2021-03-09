import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users/users.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RoutinesComponent } from './routines/routines.component';
import { DietsComponent } from './diets/diets.component';
import { BlogComponent } from './blog/blog.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [DashboardComponent, AdminComponent, UsersComponent, GalleryComponent, RoutinesComponent, DietsComponent, BlogComponent, NotificationsComponent, SettingsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ModalModule.forRoot()
  ]
})
export class AdminModule { }
