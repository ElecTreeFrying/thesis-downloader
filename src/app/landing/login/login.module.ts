import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { MatLoginModule } from '../../common/core/modules/mat-login.module';

import { LoginComponent } from './login.component';

import { SharedService } from '../../common/core/services/shared.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatLoginModule
  ],
  providers: [
    SharedService
  ]
})
export class LoginModule { }
