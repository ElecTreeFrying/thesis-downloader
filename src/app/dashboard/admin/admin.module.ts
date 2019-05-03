import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { MatDashboardModule } from '../../common/core/modules/mat-dashboard.module';
import { SharedUploadComponentModule } from '../../common/core/modules/shared-upload-component.module';

import { SharedService } from '../../common/core/services/shared.service';

import { AdminComponent } from './admin.component';
import { UploadDialogComponent } from '../../common/shared/components/upload-dialog/upload-dialog.component';
import { TrimPipe } from '../../common/shared/pipes/trim1.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    TrimPipe,
  ],
  entryComponents: [
    UploadDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDashboardModule,
    AdminRoutingModule,
    SharedUploadComponentModule,
  ],
  providers: [
    SharedService
  ]
})
export class AdminModule { }
