import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: any = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.getAuthState().subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
      if (user) {
        this.router.navigate(['/dashboard']);  // Redirigir al dashboard si está autenticado
      } else {
        this.router.navigate(['/login']);  // Redirigir a login si no está autenticado
      }
    });
  }
  logout() {
    this.authService.logout().then(() => {
      alert('Has cerrado sesión exitosamente');
      this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
    }).catch(error => {
      console.error(error);
      alert('Error al cerrar sesión');
    });
  }
}