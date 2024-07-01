import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaAddEditComponent } from './media-add-edit/media-add-edit.component';
import { MediaListComponent } from './media-list/media-list.component';
import { MediaDetailsComponent } from './media-details/media-details.component';
import { MediaRoutingModule } from './media-routing.module';


@NgModule({
  declarations: [
    MediaAddEditComponent,
    MediaListComponent,
    MediaDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MediaRoutingModule,
    ReactiveFormsModule,
  ]
})
export class MediaModule { }
