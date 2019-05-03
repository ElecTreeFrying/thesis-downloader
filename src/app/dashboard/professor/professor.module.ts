import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfessorRoutingModule } from './professor-routing.module';
import { MatDashboardModule } from '../../common/core/modules/mat-dashboard.module';
import { SharedUploadComponentModule } from '../../common/core/modules/shared-upload-component.module';

import { SharedService } from '../../common/core/services/shared.service';

import { ProfessorComponent } from './professor.component';
import { UploadDialogComponent } from '../../common/shared/components/upload-dialog/upload-dialog.component';
import { TrimPipe } from '../../common/shared/pipes/trim0.pipe';

@NgModule({
  declarations: [
    ProfessorComponent,
    TrimPipe,
  ],
  entryComponents: [
    UploadDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDashboardModule,
    ProfessorRoutingModule,
    SharedUploadComponentModule,
  ],
  providers: [
    SharedService
  ]
})
export class ProfessorModule { }
