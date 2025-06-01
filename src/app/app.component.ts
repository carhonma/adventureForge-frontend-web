import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { FirebaseService } from './services/firebase.service';
import { ImageService } from './services/image.service';
import { HeroType, heroStyles } from './enum/heroType';
import { EnemyType, enemyStyles } from './enum/enemyType';
import { ItemType, itemStyles } from './enum/itemType';
import { GradeType, gradeStyles } from './enum/gradeType';



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

        'grade/grade_a.png','grade/grade_b.png','grade/grade_c.png','grade/grade_d.png','grade/grade_s.png',

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

      gradeStyles[GradeType.F].icon = this.imageService.getCachedImage('grade/grade_d.png')!;
      gradeStyles[GradeType.A].icon = this.imageService.getCachedImage('grade/grade_a.png')!;
      gradeStyles[GradeType.B].icon = this.imageService.getCachedImage('grade/grade_b.png')!;
      gradeStyles[GradeType.C].icon = this.imageService.getCachedImage('grade/grade_c.png')!;
      gradeStyles[GradeType.D].icon = this.imageService.getCachedImage('grade/grade_d.png')!;
      gradeStyles[GradeType.S].icon = this.imageService.getCachedImage('grade/grade_s.png')!;

      itemStyles[ItemType.ITEM_00010].icon = this.imageService.getCachedImage('items/tinder1.png')!;
      itemStyles[ItemType.ITEM_00020].icon = this.imageService.getCachedImage('items/mushroom1.png')!;
      itemStyles[ItemType.ITEM_00030].icon = this.imageService.getCachedImage('items/log1.png')!;
      itemStyles[ItemType.ITEM_00040].icon = this.imageService.getCachedImage('items/cloth1.png')!;
      itemStyles[ItemType.ITEM_00050].icon = this.imageService.getCachedImage('items/stone1.png')!;
      itemStyles[ItemType.ITEM_00060].icon = this.imageService.getCachedImage('items/metal1.png')!;
      itemStyles[ItemType.ITEM_00070].icon = this.imageService.getCachedImage('items/tooth1.png')!;

      itemStyles[ItemType.ITEM_01000].icon = this.imageService.getCachedImage('items/A_hold_helmet.png')!;
      itemStyles[ItemType.ITEM_02000].icon = this.imageService.getCachedImage('items/A_hold_gloves.png')!;
      itemStyles[ItemType.ITEM_03000].icon = this.imageService.getCachedImage('items/A_hold_chest.png')!;
      itemStyles[ItemType.ITEM_04000].icon = this.imageService.getCachedImage('items/A_hold_weapon.png')!;
      itemStyles[ItemType.ITEM_05000].icon = this.imageService.getCachedImage('items/A_hold_boots.png')!;
      itemStyles[ItemType.ITEM_06000].icon = this.imageService.getCachedImage('items/A_hold_jewel.png')!;

      itemStyles[ItemType.ITEM_01011].icon = itemStyles[ItemType.ITEM_01012].icon = itemStyles[ItemType.ITEM_01013].icon = itemStyles[ItemType.ITEM_01014].icon = itemStyles[ItemType.ITEM_01015].icon = this.imageService.getCachedImage('items/helmet1.png')!;
      itemStyles[ItemType.ITEM_01021].icon = itemStyles[ItemType.ITEM_01022].icon = itemStyles[ItemType.ITEM_01023].icon = itemStyles[ItemType.ITEM_01024].icon = itemStyles[ItemType.ITEM_01025].icon = this.imageService.getCachedImage('items/helmet2.png')!;
     
      itemStyles[ItemType.ITEM_02011].icon = itemStyles[ItemType.ITEM_02012].icon = itemStyles[ItemType.ITEM_02013].icon = itemStyles[ItemType.ITEM_02014].icon = itemStyles[ItemType.ITEM_02015].icon = this.imageService.getCachedImage('items/gloves1.png')!;
      itemStyles[ItemType.ITEM_02021].icon = itemStyles[ItemType.ITEM_02022].icon = itemStyles[ItemType.ITEM_02023].icon = itemStyles[ItemType.ITEM_02024].icon = itemStyles[ItemType.ITEM_02025].icon = this.imageService.getCachedImage('items/gloves2.png')!;
      itemStyles[ItemType.ITEM_02031].icon = itemStyles[ItemType.ITEM_02032].icon = itemStyles[ItemType.ITEM_02033].icon = itemStyles[ItemType.ITEM_02034].icon = itemStyles[ItemType.ITEM_02035].icon = this.imageService.getCachedImage('items/gloves3.png')!;
      itemStyles[ItemType.ITEM_02041].icon = itemStyles[ItemType.ITEM_02042].icon = itemStyles[ItemType.ITEM_02043].icon = itemStyles[ItemType.ITEM_02044].icon = itemStyles[ItemType.ITEM_02045].icon = this.imageService.getCachedImage('items/gloves4.png')!;
      itemStyles[ItemType.ITEM_02051].icon = itemStyles[ItemType.ITEM_02052].icon = itemStyles[ItemType.ITEM_02053].icon = itemStyles[ItemType.ITEM_02054].icon = itemStyles[ItemType.ITEM_02055].icon = this.imageService.getCachedImage('items/gloves5.png')!;
      itemStyles[ItemType.ITEM_02061].icon = itemStyles[ItemType.ITEM_02062].icon = itemStyles[ItemType.ITEM_02063].icon = itemStyles[ItemType.ITEM_02064].icon = itemStyles[ItemType.ITEM_02065].icon = this.imageService.getCachedImage('items/gloves6.png')!;

      itemStyles[ItemType.ITEM_03011].icon = itemStyles[ItemType.ITEM_03012].icon = itemStyles[ItemType.ITEM_03013].icon = itemStyles[ItemType.ITEM_03014].icon = itemStyles[ItemType.ITEM_03015].icon = this.imageService.getCachedImage('items/chest1.png')!;
      itemStyles[ItemType.ITEM_03021].icon = itemStyles[ItemType.ITEM_03022].icon = itemStyles[ItemType.ITEM_03023].icon = itemStyles[ItemType.ITEM_03024].icon = itemStyles[ItemType.ITEM_03025].icon = this.imageService.getCachedImage('items/chest2.png')!;
      itemStyles[ItemType.ITEM_03031].icon = itemStyles[ItemType.ITEM_03032].icon = itemStyles[ItemType.ITEM_03033].icon = itemStyles[ItemType.ITEM_03034].icon = itemStyles[ItemType.ITEM_03035].icon = this.imageService.getCachedImage('items/chest3.png')!;
      itemStyles[ItemType.ITEM_03041].icon = itemStyles[ItemType.ITEM_03042].icon = itemStyles[ItemType.ITEM_03043].icon = itemStyles[ItemType.ITEM_03044].icon = itemStyles[ItemType.ITEM_03045].icon = this.imageService.getCachedImage('items/chest4.png')!;
      itemStyles[ItemType.ITEM_03051].icon = itemStyles[ItemType.ITEM_03052].icon = itemStyles[ItemType.ITEM_03053].icon = itemStyles[ItemType.ITEM_03054].icon = itemStyles[ItemType.ITEM_03055].icon = this.imageService.getCachedImage('items/chest5.png')!;

      itemStyles[ItemType.ITEM_04011].icon = itemStyles[ItemType.ITEM_04012].icon = itemStyles[ItemType.ITEM_04013].icon = itemStyles[ItemType.ITEM_04014].icon = itemStyles[ItemType.ITEM_04015].icon = this.imageService.getCachedImage('items/weapon1.png')!;
      itemStyles[ItemType.ITEM_04021].icon = itemStyles[ItemType.ITEM_04022].icon = itemStyles[ItemType.ITEM_04023].icon = itemStyles[ItemType.ITEM_04024].icon = itemStyles[ItemType.ITEM_04025].icon = this.imageService.getCachedImage('items/weapon2.png')!;
      itemStyles[ItemType.ITEM_04031].icon = itemStyles[ItemType.ITEM_04032].icon = itemStyles[ItemType.ITEM_04033].icon = itemStyles[ItemType.ITEM_04034].icon = itemStyles[ItemType.ITEM_04035].icon = this.imageService.getCachedImage('items/weapon3.png')!;
      itemStyles[ItemType.ITEM_04041].icon = itemStyles[ItemType.ITEM_04042].icon = itemStyles[ItemType.ITEM_04043].icon = itemStyles[ItemType.ITEM_04044].icon = itemStyles[ItemType.ITEM_04045].icon = this.imageService.getCachedImage('items/weapon4.png')!;
      itemStyles[ItemType.ITEM_04051].icon = itemStyles[ItemType.ITEM_04052].icon = itemStyles[ItemType.ITEM_04053].icon = itemStyles[ItemType.ITEM_04054].icon = itemStyles[ItemType.ITEM_04055].icon = this.imageService.getCachedImage('items/weapon5.png')!;
      itemStyles[ItemType.ITEM_04061].icon = itemStyles[ItemType.ITEM_04062].icon = itemStyles[ItemType.ITEM_04063].icon = itemStyles[ItemType.ITEM_04064].icon = itemStyles[ItemType.ITEM_04065].icon = this.imageService.getCachedImage('items/weapon6.png')!;
      itemStyles[ItemType.ITEM_04071].icon = itemStyles[ItemType.ITEM_04072].icon = itemStyles[ItemType.ITEM_04073].icon = itemStyles[ItemType.ITEM_04074].icon = itemStyles[ItemType.ITEM_04075].icon =this.imageService.getCachedImage('items/weapon7.png')!;

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
