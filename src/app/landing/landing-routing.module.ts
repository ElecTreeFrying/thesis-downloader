import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  template: '<router-outlet></router-outlet>'
})
export class LandingComponent { }

const routes: Routes = [
  { path: '', component: LandingComponent, children: [
    { path: '', loadChildren: './login/login.module#LoginModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'registration', loadChildren: './registration/registration.module#RegistrationModule' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
