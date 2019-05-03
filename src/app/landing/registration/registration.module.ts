import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { MatRegistrationModule } from '../../common/core/modules/mat-registration.module';

import { RegistrationComponent } from './registration.component';

import { SharedService } from '../../common/core/services/shared.service';
import { CheckComponent } from './check/check.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    CheckComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    MatRegistrationModule
  ],
  providers: [
    SharedService
  ]
})
export class RegistrationModule { }
