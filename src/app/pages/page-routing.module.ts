import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RoleGuard } from '../core/guards/role.guard';
import { MediaListComponent } from './media/media-list/media-list.component';

const routes: Routes = [
  {
    path: '',
    component: MediaListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard]
  },
  {
    path:'media',
    loadChildren:()=>import('./media/media.module').then(m=>m.MediaModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [RoleGuard]
  },
  {
    path: 'content',
    loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
    // canActivate: [RoleGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
