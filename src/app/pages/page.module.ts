import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ContentListComponent } from './content/content-list/content-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ContentListComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    NgChartsModule
  ]
})
export class PageModule { }
