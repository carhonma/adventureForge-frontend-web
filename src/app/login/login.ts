import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HeroType, HeroIcono } from '../enum/heroType';
import { StorageService } from '../services/storage.service';
import { ImageService } from '../services/image.service';
import e from 'express';

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
  password1: string = '';
  password2: string = '';
  heroImageUrls: { [key: string]: string } = {};
  otherImageUrls: { [key: string]: string } = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private imageService: ImageService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Precargar las imágenes necesarias
      await this.imageService.preloadImages([
        'iconos/google.png',
        'iconos/guerrero.png',
        'iconos/picaro.png',
        'iconos/mago.png',
        'iconos/paladin.png',
        'iconos/cazador.png',
        'iconos/clerigo.png',
      ]);

      // Obtener las URLs precargadas
      this.otherImageUrls['GOOGLE'] = this.imageService.getCachedImage('iconos/google.png')!;
      this.heroImageUrls['GUERRERO'] = this.imageService.getCachedImage('iconos/guerrero.png')!;
      this.heroImageUrls['PICARO'] = this.imageService.getCachedImage('iconos/picaro.png')!;
      this.heroImageUrls['MAGO'] = this.imageService.getCachedImage('iconos/mago.png')!;
      this.heroImageUrls['PALADIN'] = this.imageService.getCachedImage('iconos/paladin.png')!;
      this.heroImageUrls['CAZADOR'] = this.imageService.getCachedImage('iconos/cazador.png')!;
      this.heroImageUrls['CLERIGO'] = this.imageService.getCachedImage('iconos/clerigo.png')!;
    } catch (error) {
      //console.error('Error al precargar las imágenes:', error);
    }
  }

  // Método que se llama al enviar el formulario
  getInputsLogin(event: Event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
  
    if (event instanceof MouseEvent && (event.target as HTMLElement).id === 'googleButton') {
      // Este es el caso cuando se ha hecho clic en el botón de Google
      this.authService.loginWithGoogle().then(() => {
        
      }).catch((error) => {
        alert('Hubo un error con el inicio de sesión con Google: ' + error);
      });
    } else if (this.email && this.password) {
      // Este es el caso cuando los campos de email y contraseña están completos
      this.authService.login(this.email, this.password)
        .then(() => {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
        }).catch((error) => {
          alert('Hubo un error con el inicio de sesión: ' + error);
        });
    } else {
      // Si los campos no están completos
      alert('Por favor, completa todos los campos.');
    }
  }

  register(currentState: string) {
    if (currentState === 'loginState') {
      this.state = 'registerState';
      this.title = 'Registro';
      alert('Vamos a registrarnos');
    } else if (currentState === 'registerState') {
      if (this.email && this.password1 && this.password2) {
        if(this.password1 == this.password2){this.authService
          .register(this.email, this.password1) // El correo de verificación ya se envía aquí
          .then(() => {
            alert('Registro completado. Revisa tu correo para verificar tu cuenta.');
          })
          .catch((error) => {
            console.error('Error en el registro:', error);
            alert('Hubo un error en el registro.');
          });
        }
        else{
          alert('Las contraseñas deben coincidir');
        }
      } else {
        alert('Por favor, completa todos los campos.');
      }
    }
  }

  // Vuelve al estado de login
  returnToLogin() {
    this.state = 'loginState';
    this.title = 'Login';
    alert('Volvemos al login');
    
  }
}