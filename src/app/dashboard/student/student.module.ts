import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentRoutingModule } from './student-routing.module';
import { MatDashboardModule } from '../../common/core/modules/mat-dashboard.module';

import { StudentComponent } from './student.component';

@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentRoutingModule,
    MatDashboardModule,
    MatDashboardModule,
  ]
})
export class StudentModule { }
