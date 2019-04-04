import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MatDashboardModule } from '../../common/core/modules/mat-dashboard.module';

import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDashboardModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
