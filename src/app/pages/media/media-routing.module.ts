import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaAddEditComponent } from './media-add-edit/media-add-edit.component';
import { MediaListComponent } from './media-list/media-list.component';
import { MediaDetailsComponent } from './media-details/media-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-media',
    pathMatch: 'full'
  },
  {
    path: 'all-media',
    component: MediaListComponent
  },
  {
    path: 'add-media',
    component: MediaAddEditComponent
  },
  {
    path: 'mediaDetails/:id',
    component: MediaDetailsComponent
  },
  {
    path: 'edit-media/:id',
    component: MediaAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
