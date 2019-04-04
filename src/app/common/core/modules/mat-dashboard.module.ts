import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatCardModule,
  MatMenuModule,
  MatChipsModule,
  MatButtonToggleModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
    MatButtonToggleModule,
  ]
})
export class MatDashboardModule { }
