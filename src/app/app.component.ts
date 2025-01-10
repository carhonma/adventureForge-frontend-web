import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { HeroIcono, HeroType } from './enum/heroType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: any = null;
  isAuthenticated: boolean = false;
  imageUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });

    this.loadImage(); // Carga la textura en el fondo
  }

  async loadImage() {
    try {
  

      // Usa el StorageService para obtener la URL pública
      this.imageUrl = await this.storageService.getImageUrl('fondos', 'desierto3.jpg');
      console.log('URL de la imagen:', this.imageUrl);

      // Aplica la imagen como fondo del cuerpo
      this.renderer.setStyle(document.body, 'background-image', `url(${this.imageUrl})`);
      this.renderer.setStyle(document.body, 'background-size', 'cover');
      this.renderer.setStyle(document.body, 'background-repeat', 'repeat');
    } catch (error) {
      
    }
  }

  logout() {
    this.authService.logout().then(() => {
      alert('Has cerrado sesión exitosamente');
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error(error);
      alert('Error al cerrar sesión');
    });
  }
}