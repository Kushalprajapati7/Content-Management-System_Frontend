import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentAddEditComponent } from './content-add-edit/content-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentDetailsComponent } from './content-details/content-details.component';


@NgModule({
  declarations: [
    ContentAddEditComponent,
    ContentDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
