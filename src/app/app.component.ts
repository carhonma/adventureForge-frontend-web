import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { FirebaseService } from './services/firebase.service';
import { ImageService } from './services/image.service';
import { HeroType, heroStyles } from './enum/heroType';
import { EnemyType, enemyStyles } from './enum/enemyType';
import { ItemType, itemStyles } from './enum/ItemType';



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
        'iconos/gold.png',
        'iconos/editCheck.png',
        'iconos/map_1.jpg',
        'iconos/marco_description.png',
        'iconos/marco_descripcion2.png',
        'iconos/boton_madera_1.png',
        'iconos/boton_madera_4.png',
        'iconos/boton_madera_5.png',
        'iconos/boton_madera_8.png',
        'iconos/boton_madera_9.png',

        'characters/guerrero.png',
        'characters/picaro.png',
        'characters/mago.png',
        'characters/paladin.png',
        'characters/cazador.png',
        'characters/clerigo.png',

        'gifs/Y_spring1_defeat.gif',
        'gifs/Y_spring1_victory.gif',
        'gifs/Y_ent1_defeat.gif',
        'gifs/Y_ent1_victory.gif',
        'gifs/Y_golem1_defeat.gif',
        'gifs/Y_golem1_victory.gif',
        'gifs/Y_jabali1_defeat.gif',
        'gifs/Y_jabali1_victory.gif',
        'gifs/Y_jabali2_defeat.gif',
        'gifs/Y_jabali2_victory.gif',
        'gifs/Y_jabali3_defeat.gif',
        'gifs/Y_jabali3_victory.gif',
         'gifs/Y_jabali4_defeat.gif',
        'gifs/Y_jabali4_victory.gif',
        'gifs/Y_jabali5_defeat.gif',
        'gifs/Y_jabali5_victory.gif',
        'gifs/Y_jabali6_defeat.gif',
        'gifs/Y_jabali6_victory.gif',
        'gifs/Y_jabali7_defeat.gif',
        'gifs/Y_jabali7_victory.gif',
        
        'characters/A_jabali1.jpg',
        'characters/A_jabali2.jpg',
        'characters/A_jabali3.jpg',

        'items/tinder1.png','items/mushroom1.png','items/log1.png','items/cloth1.png','items/stone1.png','items/metal1.png','items/tooth1.png',

        'items/A_hold_boots.png','items/A_hold_chest.png','items/A_hold_gloves.png','items/A_hold_helmet.png','items/A_hold_jewel.png','items/A_hold_weapon.png',
        'items/boots1.png','items/boots2.png','items/boots3.png','items/boots4.png','items/boots5.png','items/boots6.png',
        'items/chest1.png','items/chest2.png','items/chest3.png','items/chest4.png','items/chest5.png',
        'items/gloves1.png','items/gloves2.png','items/gloves3.png','items/gloves4.png','items/gloves5.png','items/gloves6.png',
        'items/helmet1.png','items/helmet2.png',
        'items/jewel1.png','items/jewel2.png',
        'items/weapon1.png','items/weapon2.png','items/weapon3.png','items/weapon4.png','items/weapon5.png','items/weapon6.png','items/weapon7.png',
        'items/noItem.png',
      ]);
      
      heroStyles[HeroType.GUERRERO].icon = this.imageService.getCachedImage('characters/guerrero.png')!;
      heroStyles[HeroType.PICARO].icon = this.imageService.getCachedImage('characters/picaro.png')!;
      heroStyles[HeroType.MAGO].icon = this.imageService.getCachedImage('characters/mago.png')!;
      heroStyles[HeroType.PALADIN].icon = this.imageService.getCachedImage('characters/paladin.png')!;
      heroStyles[HeroType.CAZADOR].icon = this.imageService.getCachedImage('characters/cazador.png')!;
      heroStyles[HeroType.CLERIGO].icon = this.imageService.getCachedImage('characters/clerigo.png')!;

      heroStyles[HeroType.GUERRERO].gif = this.imageService.getCachedImage('characters/guerrero.png')!;
      heroStyles[HeroType.PICARO].gif = this.imageService.getCachedImage('characters/picaro.png')!;
      heroStyles[HeroType.MAGO].gif = this.imageService.getCachedImage('characters/mago.png')!;
      heroStyles[HeroType.PALADIN].gif = this.imageService.getCachedImage('characters/paladin.png')!;
      heroStyles[HeroType.CAZADOR].gif = this.imageService.getCachedImage('characters/cazador.png')!;
      heroStyles[HeroType.CLERIGO].gif = this.imageService.getCachedImage('characters/clerigo.png')!;

      /*heroStyles[HeroType.GUERRERO].gif = this.imageService.getCachedImage('gifs/Y_golem1_victory.gif')!;
      heroStyles[HeroType.PICARO].gif = this.imageService.getCachedImage('gifs/Y_golem1_victory.gif')!;
      heroStyles[HeroType.MAGO].gif = this.imageService.getCachedImage('gifs/Y_golem1_victory.gif')!;
      heroStyles[HeroType.PALADIN].gif = this.imageService.getCachedImage('gifs/Y_golem1_victory.gif')!;
      heroStyles[HeroType.CAZADOR].gif = this.imageService.getCachedImage('gifs/Y_golem1_victory.gif')!;
      heroStyles[HeroType.CLERIGO].gif = this.imageService.getCachedImage('gifs/Y_golem1_victory.gif')!;*/
      //heroStyles[HeroType.GUERRERO].gif = await this.storageService.getImageUrl('gifs', 'Y_ent1_victory.gif');//ejemplo con storageService

      enemyStyles[EnemyType.JABALI1].icon = this.imageService.getCachedImage('characters/A_jabali1.jpg')!;
      enemyStyles[EnemyType.JABALI2].icon = this.imageService.getCachedImage('characters/A_jabali2.jpg')!;
      enemyStyles[EnemyType.JABALI3].icon = this.imageService.getCachedImage('characters/A_jabali3.jpg')!;

      enemyStyles[EnemyType.JABALI1].gifVictory = this.imageService.getCachedImage('gifs/Y_jabali1_victory.gif')!;
      enemyStyles[EnemyType.JABALI1].gifDefeat = this.imageService.getCachedImage('gifs/Y_jabali1_defeat.gif')!;

      itemStyles[ItemType.ITEM_00010].icon = this.imageService.getCachedImage('items/tinder1.png')!;
      itemStyles[ItemType.ITEM_00020].icon = this.imageService.getCachedImage('items/mushroom1.png')!;
      itemStyles[ItemType.ITEM_00030].icon = this.imageService.getCachedImage('items/log1.png')!;
      itemStyles[ItemType.ITEM_00040].icon = this.imageService.getCachedImage('items/cloth1.png')!;
      itemStyles[ItemType.ITEM_00050].icon = this.imageService.getCachedImage('items/stone1.png')!;
      itemStyles[ItemType.ITEM_00060].icon = this.imageService.getCachedImage('items/metal1.png')!;
      itemStyles[ItemType.ITEM_00070].icon = this.imageService.getCachedImage('items/tooth1.png')!;

      itemStyles[ItemType.ITEM_01001].icon = this.imageService.getCachedImage('items/helmet1.png')!;
      itemStyles[ItemType.ITEM_01002].icon = this.imageService.getCachedImage('items/helmet2.png')!;
      itemStyles[ItemType.ITEM_01003].icon = this.imageService.getCachedImage('items/helmet2.png')!;
      itemStyles[ItemType.ITEM_02001].icon = this.imageService.getCachedImage('items/boots1.png')!;
      itemStyles[ItemType.ITEM_02002].icon = this.imageService.getCachedImage('items/boots2.png')!;
      itemStyles[ItemType.ITEM_02003].icon = this.imageService.getCachedImage('items/boots3.png')!;
      itemStyles[ItemType.ITEM_03001].icon = this.imageService.getCachedImage('items/chest1.png')!;
      itemStyles[ItemType.ITEM_03002].icon = this.imageService.getCachedImage('items/chest2.png')!;
      itemStyles[ItemType.ITEM_03003].icon = this.imageService.getCachedImage('items/chest3.png')!;
      itemStyles[ItemType.NULL].icon = this.imageService.getCachedImage('items/noItem.png')!;

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
