import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatUploadDialogModule } from './mat-upload-dialog.module';

import { UploadDialogComponent } from '../../shared/components/upload-dialog/upload-dialog.component';

@NgModule({
  declarations: [
    UploadDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatUploadDialogModule,
  ]
})
export class SharedUploadComponentModule { }
