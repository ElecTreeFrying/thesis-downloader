import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryGuard, ExitGuard, ComponentGuard } from './common/core/services/route-guard.service';

const routes: Routes = [
  { path: '', loadChildren: './landing/landing.module#LandingModule', canActivate: [ ExitGuard ] },
  { path: 'student', loadChildren: './dashboard/student/student.module#StudentModule', canActivate: [ EntryGuard ] },
  { path: 'professor', loadChildren: './dashboard/professor/professor.module#ProfessorModule', canActivate: [ EntryGuard ] },
  { path: 'admin', loadChildren: './dashboard/admin/admin.module#AdminModule', canActivate: [ EntryGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
