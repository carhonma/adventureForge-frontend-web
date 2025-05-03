import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { FirebaseService } from './services/firebase.service';
import { ImageService } from './services/image.service';
import { heroStyles } from './enum/heroType'; // Asegúrate de importar esto
import { HeroType } from './enum/heroType';

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
  firebaseStatus: string = '';
  imageUrls: { [key: string]: string } = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private renderer: Renderer2,
    private firebaseService: FirebaseService,
    private imageService: ImageService // Importante inyectarlo
  ) {}

  async ngOnInit() {
    this.firebaseService.testConnection().subscribe(
      (response) => {
        this.firebaseStatus = response;
      },
      (error) => {
        console.error('Error conectando al backend', error);
        this.firebaseStatus = '❌';
      }
    );

    this.authService.getAuthState().subscribe(async (user) => {
      this.isAuthenticated = !!user;
      this.user = user;

      // Solo cargamos las imágenes y fondo si hay usuario
      if (user) {
        await this.preloadGlobalImages();
        await this.loadImage();
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async preloadGlobalImages() {
    try {
      await this.imageService.preloadImages([
        'fondos/desierto4.jpg',
        'iconos/add.png',
        'iconos/boton_alargado.png',
        'iconos/boton_alargado_izq.png',
        'iconos/boton_alargado_der.png',
        'iconos/guerrero.png',
        'iconos/picaro.png',
        'iconos/mago.png',
        'iconos/paladin.png',
        'iconos/cazador.png',
        'iconos/clerigo.png',
      ]);
      
      heroStyles[HeroType.GUERRERO].icon = this.imageService.getCachedImage('iconos/guerrero.png')!;
      heroStyles[HeroType.PICARO].icon = this.imageService.getCachedImage('iconos/picaro.png')!;
      heroStyles[HeroType.MAGO].icon = this.imageService.getCachedImage('iconos/mago.png')!;
      heroStyles[HeroType.PALADIN].icon = this.imageService.getCachedImage('iconos/paladin.png')!;
      heroStyles[HeroType.CAZADOR].icon = this.imageService.getCachedImage('iconos/cazador.png')!;
      heroStyles[HeroType.CLERIGO].icon = this.imageService.getCachedImage('iconos/clerigo.png')!;

      console.log('✅ Imágenes precargadas globalmente');
    } catch (error) {
      console.error('❌ Error precargando imágenes globalmente:', error);
    }
  }

  async loadImage() {
    try {
      // Usa el StorageService para obtener la URL pública
      this.imageUrl = await this.storageService.getImageUrl('fondos', 'desierto3.jpg');

      // Aplica la imagen como fondo del cuerpo
      this.renderer.setStyle(document.body, 'background-image', `url(${this.imageUrl})`);
      this.renderer.setStyle(document.body, 'background-size', 'cover');
      this.renderer.setStyle(document.body, 'background-repeat', 'repeat');
    } catch (error) {
      console.error('❌ Error cargando fondo:', error);
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
