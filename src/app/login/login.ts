import { Component, ElementRef, ViewChild, AfterViewInit, NgModule  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  title = 'Login';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método que se llama al enviar el formulario
  getInputsLogin(event: Event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

    if (this.email && this.password) {
      // Llamada al servicio para hacer login
      this.authService.login(this.email, this.password)
        .then(() => {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
        })
        .catch(error => {
          console.error(error);
          alert('Error en el inicio de sesión');
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}