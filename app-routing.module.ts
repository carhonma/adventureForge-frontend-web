import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/LoginComponent';
import { DashboardComponent } from './dashboard/DashboardComponent';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a /login por defecto
  { path: '**', redirectTo: '/login' }  // Redirigir cualquier ruta inválida a /login)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
