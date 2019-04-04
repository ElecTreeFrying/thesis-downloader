import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './landing/landing.module#LandingModule' },
  { path: 'student', loadChildren: './dashboard/student/student.module#StudentModule' },
  { path: 'professor', loadChildren: './dashboard/professor/professor.module#ProfessorModule' },
  { path: 'admin', loadChildren: './dashboard/admin/admin.module#AdminModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
