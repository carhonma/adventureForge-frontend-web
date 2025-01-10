import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HeroType, HeroIcono } from '../enum/heroType';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  title = 'Login';
  email: string = '';
  password: string = '';
  state: string = 'loginState';
  imageUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  async loadImage() {
      // Obtén la ruta del archivo desde HeroIcono
      const imageFile = HeroIcono[HeroType.MAGO];
      // Usa el StorageService para obtener la URL pública
      this.imageUrl = await this.storageService.getImageUrl('iconos', imageFile);
      console.log('URL de la imagen:', this.imageUrl);
  }

  ngOnInit() {
    this.loadImage(); // Cargar la imagen del Cazador al iniciar
  }

  // Método que se llama al enviar el formulario
  getInputsLogin(event: Event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

    if (this.email && this.password) {
      this.authService
        .login(this.email, this.password)
        .then(() => {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error(error);
          alert('Error en el inicio de sesión');
        });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  // Cambia entre los estados de registro y login
  register(currentState: string) {
    if (currentState === 'loginState') {
      this.state = 'registerState';
      this.title = 'Registro';
      alert('Vamos a registrarnos');
    } else if (currentState === 'registerState') {
      alert('Registro completado');
      this.returnToLogin();
    }
  }

  // Vuelve al estado de login
  returnToLogin() {
    this.state = 'loginState';
    this.title = 'Login';
    alert('Volvemos al login');
  }
}