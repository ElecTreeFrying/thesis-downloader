import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressBarModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ]
})
export class MatLoginModule { }
