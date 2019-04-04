import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfessorRoutingModule } from './professor-routing.module';
import { MatDashboardModule } from '../../common/core/modules/mat-dashboard.module';

import { ProfessorComponent } from './professor.component';

@NgModule({
  declarations: [
    ProfessorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDashboardModule,
    ProfessorRoutingModule
  ]
})
export class ProfessorModule { }
