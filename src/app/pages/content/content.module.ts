import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentAddEditComponent } from './content-add-edit/content-add-edit.component';
import { ContentListComponent } from './content-list/content-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentDetailsComponent } from './content-details/content-details.component';
@NgModule({
  declarations: [
    ContentAddEditComponent,
    ContentListComponent,
    ContentDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ContentModule { }
