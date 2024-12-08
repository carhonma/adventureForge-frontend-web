import { Component, ElementRef, ViewChild, AfterViewInit, NgModule  } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  title = 'Login';
  password: string = '';
  email: string = '';

  getInputsLogin() {
    console.log('Usuario:', this.email);
    console.log('Contraseña:', this.password);
    if (this.email && this.password) {
      alert('campos completados');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }  
}