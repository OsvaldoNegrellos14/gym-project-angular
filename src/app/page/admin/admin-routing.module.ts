import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RoutinesComponent } from './routines/routines.component';
import { DietsComponent } from './diets/diets.component';
import { BlogComponent } from './blog/blog.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'routines',
        component: RoutinesComponent
      },
      {
        path: 'diets',
        component: DietsComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
