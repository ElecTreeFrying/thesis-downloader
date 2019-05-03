import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentRoutingModule } from './student-routing.module';
import { MatDashboardModule } from '../../common/core/modules/mat-dashboard.module';
import { SharedUploadComponentModule } from '../../common/core/modules/shared-upload-component.module';

import { SharedService } from '../../common/core/services/shared.service';

import { StudentComponent } from './student.component';
import { UploadDialogComponent } from '../../common/shared/components/upload-dialog/upload-dialog.component';
import { TrimPipe } from '../../common/shared/pipes/trim.pipe';

@NgModule({
  declarations: [
    StudentComponent,
    TrimPipe,
  ],
  entryComponents: [
    UploadDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDashboardModule,
    StudentRoutingModule,
    SharedUploadComponentModule,
  ],
  providers: [
    SharedService
  ]
})
export class StudentModule { }
