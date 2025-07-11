import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformarComponent } from './informar/informar';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';

const routes: Routes = [
  { path: 'informar', component: InformarComponent },
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
