import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentAddEditComponent } from './content-add-edit/content-add-edit.component';
import { ContentDetailsComponent } from './content-details/content-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-content',
    pathMatch: 'full'
  },
  {
    path: 'all-content',
    component: ContentListComponent
  },
  {
    path: 'add-content',
    component: ContentAddEditComponent
  },
  {
    path: 'contentDetails/:id',
    component: ContentDetailsComponent
  },
  {
    path: 'edit-content/:id',
    component: ContentAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
