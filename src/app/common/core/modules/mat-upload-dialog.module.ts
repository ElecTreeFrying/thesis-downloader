import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class MatUploadDialogModule { }
