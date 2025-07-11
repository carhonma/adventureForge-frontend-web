import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { FirebaseService } from './services/firebase.service';
import { ImageService } from './services/image.service';
import { HeroType, heroStyles } from './enum/heroType';
import { EnemyType, enemyStyles } from './enum/enemyType';
import { CrafterType, crafterStyles } from './enum/crafterType';
import { ItemType, itemStyles } from './enum/itemType';
import { GradeType, gradeStyles } from './enum/gradeType';
import { TurnActionType,turnActionStyles } from './enum/turnActionType';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  informe = 'Informar';
  user: any = null;
  isAuthenticated: boolean = false;
  imageUrl: string = '';
  firebaseStatus: string = '';
  imageUrls: { [key: string]: string } = {};
  private readonly isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private renderer: Renderer2,
    private firebaseService: FirebaseService,
    private imageService: ImageService,
    @Inject(PLATFORM_ID) platformId: object          // ←‑ inyecta platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);  // ←‑ calcula una vez
  }
 

  ngOnInit() {
    
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
      if (this.isBrowser) {
        await this.preloadGlobalImages();
        await this.loadImage();
      }
      
     this.router.navigate([user ? '/dashboard' : '/login']);
    });
  }

  async preloadGlobalImages() {
    try {
      await this.imageService.preloadImages([
        'fondos/desierto4.jpg',
        'fondos/desierto3.jpg',
        'iconos/add.png',
        'iconos/marco_pocion.png',
        'iconos/gold.png',
        'iconos/editCheck.png',
        'iconos/map_1.jpg',
        'iconos/map_2.jpg',
        'iconos/marco_item.png',
        'iconos/marco_description.png',
        'iconos/boton_madera_1.png',
        'iconos/boton_madera_4.png',
        'iconos/boton_madera_5.png',
        'iconos/boton_madera_8.png',
        'iconos/boton_madera_9.png',
        'iconos/boton_madera_10.png',
        'iconos/boton_madera_11.png',

        'crafters/alchemist.png',
        'crafters/armorsmith.png',
        'crafters/carpenter.png',
        'crafters/enchanter.png',
        'crafters/tailor.png',
        'crafters/weaponsmith.png',

        'characters/guerrero.png',
        'characters/picaro.png',
        'characters/mago.png',
        'characters/paladin.png',
        'characters/cazador.png',
        'characters/clerigo.png',

        'skills/STANDARD_ATTACK.png',
        'skills/HARD_STRIKE.png',
        'skills/HARD_SHOT.png',
        'skills/HARD_SPELL.png',
        'skills/BUFF_ARMOR.png',
        'skills/DEBUFF_ARMOR.png',

        'gifs/Y_forest1_defeat.gif',
        'gifs/Y_forest1_victory.gif',
        'gifs/Y_ent1_defeat.gif','gifs/Y_ent1_up1_defeat.gif','gifs/Y_ent1_up2_defeat.gif',
        'gifs/Y_ent1_victory.gif','gifs/Y_ent1_up1_victory.gif','gifs/Y_ent1_up2_victory.gif',
        'gifs/Y_golem1_defeat.gif','gifs/Y_golem1_up1_defeat.gif','gifs/Y_golem1_up2_defeat.gif',
        'gifs/Y_golem1_victory.gif','gifs/Y_golem1_up1_victory.gif','gifs/Y_golem1_up2_victory.gif',
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
        
        'characters/A_forest1.jpg',
        'characters/A_golem1.jpg','characters/A_golem1_up1.jpg','characters/A_golem1_up2.jpg',
        'characters/A_ent1.jpg','characters/A_ent1_up1.jpg','characters/A_ent1_up2.jpg',
        'characters/A_jabali1.jpg',
        'characters/A_jabali2.jpg',
        'characters/A_jabali3.jpg',
        'characters/A_jabali4.jpg',
        'characters/A_jabali5.jpg',
        'characters/A_jabali6.jpg',
        'characters/A_jabali7.jpg',

        'characters/A_pez2.jpg','characters/A_pez2_up1.jpg','characters/A_pez2_up2.jpg',
        
        'missions/C_forest1.png',
        'missions/C_golem1.png','missions/C_golem1_up1.png','missions/C_golem1_up2.png',
        'missions/C_ent1.png','missions/C_ent1_up1.png','missions/C_ent1_up2.png',
        'missions/C_jabali1.png',
        'missions/C_jabali2.png',
        'missions/C_jabali3.png',
        'missions/C_jabali4.png',
        'missions/C_jabali5.png',
        'missions/C_jabali6.png',
        'missions/C_jabali7.png',

        'missions/C_pez2.png','missions/C_pez2_up1.png','missions/C_pez2_up2.png',

        'grade/grade_a.png','grade/grade_b.png','grade/grade_c.png','grade/grade_d.png','grade/grade_s.png',

        'items/tinder1.png','items/mushroom1.png','items/log1.png','items/cloth1.png','items/stone1.png','items/metal1.png','items/tooth1.png',
        'items/splinter1.png','items/splinter2.png','items/block1.png','items/block2.png','items/scrap1.png','items/scrap2.png','items/tooth2.png','items/tooth3.png','items/hoof1.png','items/wing1.png',
        'items/shadowbark1.png','items/holybark1.png',
        'items/leather1.png','items/leather2.png',
        'items/forestfragment1.png','items/hellfragment1.png',

        'items/A_hold_boots.png','items/A_hold_chest.png','items/A_hold_gloves.png','items/A_hold_helmet.png','items/A_hold_jewel.png','items/A_hold_weapon.png',
        'items/jewel1.png','items/jewel2.png',

        'items/ironhelmet1.png','items/blunthelmet1.png','items/guardhelmet1.png',
        'items/leatherhood1.png','items/studdedhood1.png','items/furhood1.png',
        'items/novicehat1.png','items/renegadehat1.png','items/guildhat1.png',
        'items/foresthelmet1.png',
        'items/holyhelmet1.jpg',

        'items/irongloves1.png','items/bluntgloves1.png','items/guardgloves1.png',
        'items/leathergloves1.png','items/studdedgloves1.png','items/furgloves1.png',
        'items/novicegloves1.png','items/renegadegloves1.png','items/guildgloves1.png',
        'items/forestgloves1.png',

        'items/ironchest1.png','items/bluntchest1.png','items/guardchest1.png',
        'items/leatherjacket1.png','items/studdedjacket1.png','items/furjacket1.png',
        'items/novicehabit1.png','items/renegadehabit1.png','items/guildhabit1.png',
        'items/forestchest1.png',

        'items/sword_1.1.png','items/sword_1.2.png','items/sword_1.3.png',
        'items/axe_1.1.png','items/axe_1.2.png','items/axe_1.3.png',
        'items/dage_1.1.png','items/dage_1.2.png','items/dage_1.3.png',
        'items/bow_1.1.png','items/bow_1.2.png','items/bow_1.3.png',
        'items/crosier_1.1.png','items/crosier_1.2.png','items/crosier_1.3.png',
        'items/wand_1.1.png','items/wand_1.2.png','items/wand_1.3.png',

        'items/ironboots1.png','items/bluntboots1.png','items/guardboots1.png',
        'items/leatherboots1.png','items/studdedboots1.png','items/furboots1.png',
        'items/noviceshoes1.png','items/renegadeshoes1.png','items/guildshoes1.png',
        'items/forestboots1.png',

        'items/potion1.png','items/potion2.png',

        'items/noItem.png',

        'bars/exp0.png','bars/exp10.png','bars/exp100.png','bars/exp12.5.png','bars/exp25.png','bars/exp37.5.png','bars/exp5.png','bars/exp50.png','bars/exp62.5.png','bars/exp75.png','bars/exp87.5.png','bars/exp90.png',
        'bars/life0.png','bars/life10.png','bars/life100.png','bars/life12.5.png','bars/life25.png','bars/life37.5.png','bars/life5.png','bars/life50.png','bars/life62.5.png','bars/life75.png','bars/life87.5.png','bars/life90.png'
      ]);

      crafterStyles[CrafterType.Alchemist].icon = this.imageService.getCachedImage('crafters/alchemist.png')!;
      crafterStyles[CrafterType.Armorsmith].icon = this.imageService.getCachedImage('crafters/armorsmith.png')!;
      crafterStyles[CrafterType.Carpenter].icon = this.imageService.getCachedImage('crafters/carpenter.png')!;
      crafterStyles[CrafterType.Enchanter].icon = this.imageService.getCachedImage('crafters/enchanter.png')!;
      crafterStyles[CrafterType.Tailor].icon = this.imageService.getCachedImage('crafters/tailor.png')!;
      crafterStyles[CrafterType.WeaponSmith].icon = this.imageService.getCachedImage('crafters/weaponsmith.png')!;

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

      turnActionStyles[TurnActionType.STANDARD_ATTACK].icon = this.imageService.getCachedImage('skills/STANDARD_ATTACK.png')!;
      turnActionStyles[TurnActionType.HARD_STRIKE].icon = this.imageService.getCachedImage('skills/HARD_STRIKE.png')!;
      turnActionStyles[TurnActionType.HARD_SPELL].icon = this.imageService.getCachedImage('skills/HARD_SPELL.png')!;
      turnActionStyles[TurnActionType.HARD_SHOT].icon = this.imageService.getCachedImage('skills/HARD_SHOT.png')!;
      turnActionStyles[TurnActionType.BUFF_ARMOR].icon = this.imageService.getCachedImage('skills/BUFF_ARMOR.png')!;
      turnActionStyles[TurnActionType.DEBUFF_ARMOR].icon = this.imageService.getCachedImage('skills/DEBUFF_ARMOR.png')!;
      turnActionStyles[TurnActionType.NOACTION].icon = this.imageService.getCachedImage('skills/STANDARD_ATTACK.png')!;

      enemyStyles[EnemyType.FOREST1].icon = this.imageService.getCachedImage('characters/A_forest1.jpg')!;enemyStyles[EnemyType.FOREST1].missionIcon = this.imageService.getCachedImage('missions/C_forest1.png')!;
      enemyStyles[EnemyType.GOLEM1].icon = this.imageService.getCachedImage('characters/A_golem1.jpg')!;enemyStyles[EnemyType.GOLEM1].missionIcon = this.imageService.getCachedImage('missions/C_golem1.png')!;
      enemyStyles[EnemyType.GOLEM1_UP1].icon = this.imageService.getCachedImage('characters/A_golem1_up1.jpg')!;enemyStyles[EnemyType.GOLEM1_UP1].missionIcon = this.imageService.getCachedImage('missions/C_golem1_up1.png')!;
      enemyStyles[EnemyType.GOLEM1_UP2].icon = this.imageService.getCachedImage('characters/A_golem1_up2.jpg')!;enemyStyles[EnemyType.GOLEM1_UP2].missionIcon = this.imageService.getCachedImage('missions/C_golem1_up2.png')!;
      enemyStyles[EnemyType.ENT1].icon = this.imageService.getCachedImage('characters/A_ent1.jpg')!;enemyStyles[EnemyType.ENT1].missionIcon = this.imageService.getCachedImage('missions/C_ent1.png')!;
      enemyStyles[EnemyType.ENT1_UP1].icon = this.imageService.getCachedImage('characters/A_ent1_up1.jpg')!;enemyStyles[EnemyType.ENT1_UP1].missionIcon = this.imageService.getCachedImage('missions/C_ent1_up1.png')!;
      enemyStyles[EnemyType.ENT1_UP2].icon = this.imageService.getCachedImage('characters/A_ent1_up2.jpg')!;enemyStyles[EnemyType.ENT1_UP2].missionIcon = this.imageService.getCachedImage('missions/C_ent1_up2.png')!;
      enemyStyles[EnemyType.JABALI1].icon = this.imageService.getCachedImage('characters/A_jabali1.jpg')!;enemyStyles[EnemyType.JABALI1].missionIcon = this.imageService.getCachedImage('missions/C_jabali1.png')!;
      enemyStyles[EnemyType.JABALI2].icon = this.imageService.getCachedImage('characters/A_jabali2.jpg')!;enemyStyles[EnemyType.JABALI2].missionIcon = this.imageService.getCachedImage('missions/C_jabali2.png')!;
      enemyStyles[EnemyType.JABALI3].icon = this.imageService.getCachedImage('characters/A_jabali3.jpg')!;enemyStyles[EnemyType.JABALI3].missionIcon = this.imageService.getCachedImage('missions/C_jabali3.png')!;
      enemyStyles[EnemyType.JABALI4].icon = this.imageService.getCachedImage('characters/A_jabali4.jpg')!;enemyStyles[EnemyType.JABALI4].missionIcon = this.imageService.getCachedImage('missions/C_jabali4.png')!;
      enemyStyles[EnemyType.JABALI5].icon = this.imageService.getCachedImage('characters/A_jabali5.jpg')!;enemyStyles[EnemyType.JABALI5].missionIcon = this.imageService.getCachedImage('missions/C_jabali5.png')!;
      enemyStyles[EnemyType.JABALI6].icon = this.imageService.getCachedImage('characters/A_jabali6.jpg')!;enemyStyles[EnemyType.JABALI6].missionIcon = this.imageService.getCachedImage('missions/C_jabali6.png')!;
      enemyStyles[EnemyType.JABALI7].icon = this.imageService.getCachedImage('characters/A_jabali7.jpg')!;enemyStyles[EnemyType.JABALI7].missionIcon = this.imageService.getCachedImage('missions/C_jabali7.png')!;

      enemyStyles[EnemyType.PEZ2].icon = this.imageService.getCachedImage('characters/A_pez2.jpg')!;enemyStyles[EnemyType.PEZ2].missionIcon = this.imageService.getCachedImage('missions/C_pez2.png')!;
      enemyStyles[EnemyType.PEZ2_UP1].icon = this.imageService.getCachedImage('characters/A_pez2_up1.jpg')!;enemyStyles[EnemyType.PEZ2_UP1].missionIcon = this.imageService.getCachedImage('missions/C_pez2_up1.png')!;
      enemyStyles[EnemyType.PEZ2_UP2].icon = this.imageService.getCachedImage('characters/A_pez2_up2.jpg')!;enemyStyles[EnemyType.PEZ2_UP2].missionIcon = this.imageService.getCachedImage('missions/C_pez2_up2.png')!;

      gradeStyles[GradeType.F].icon = this.imageService.getCachedImage('grade/grade_d.png')!;
      gradeStyles[GradeType.A].icon = this.imageService.getCachedImage('grade/grade_a.png')!;
      gradeStyles[GradeType.B].icon = this.imageService.getCachedImage('grade/grade_b.png')!;
      gradeStyles[GradeType.C].icon = this.imageService.getCachedImage('grade/grade_c.png')!;
      gradeStyles[GradeType.D].icon = this.imageService.getCachedImage('grade/grade_d.png')!;
      gradeStyles[GradeType.S].icon = this.imageService.getCachedImage('grade/grade_s.png')!;

      itemStyles[ItemType.ITEM_00011].icon = itemStyles[ItemType.ITEM_00012].icon = itemStyles[ItemType.ITEM_00013].icon = itemStyles[ItemType.ITEM_00014].icon = itemStyles[ItemType.ITEM_00015].icon = this.imageService.getCachedImage('items/tinder1.png')!;
      itemStyles[ItemType.ITEM_00021].icon = itemStyles[ItemType.ITEM_00022].icon = itemStyles[ItemType.ITEM_00023].icon = itemStyles[ItemType.ITEM_00024].icon = itemStyles[ItemType.ITEM_00025].icon = this.imageService.getCachedImage('items/mushroom1.png')!;
      itemStyles[ItemType.ITEM_00031].icon = itemStyles[ItemType.ITEM_00032].icon = itemStyles[ItemType.ITEM_00033].icon = itemStyles[ItemType.ITEM_00034].icon = itemStyles[ItemType.ITEM_00035].icon = this.imageService.getCachedImage('items/log1.png')!;
      itemStyles[ItemType.ITEM_00041].icon = itemStyles[ItemType.ITEM_00042].icon = itemStyles[ItemType.ITEM_00043].icon = itemStyles[ItemType.ITEM_00044].icon = itemStyles[ItemType.ITEM_00045].icon = this.imageService.getCachedImage('items/cloth1.png')!;
      itemStyles[ItemType.ITEM_00051].icon = itemStyles[ItemType.ITEM_00052].icon = itemStyles[ItemType.ITEM_00053].icon = itemStyles[ItemType.ITEM_00054].icon = itemStyles[ItemType.ITEM_00055].icon = this.imageService.getCachedImage('items/stone1.png')!;
      itemStyles[ItemType.ITEM_00061].icon = itemStyles[ItemType.ITEM_00062].icon = itemStyles[ItemType.ITEM_00063].icon = itemStyles[ItemType.ITEM_00064].icon = itemStyles[ItemType.ITEM_00065].icon = this.imageService.getCachedImage('items/metal1.png')!;
      itemStyles[ItemType.ITEM_00071].icon = itemStyles[ItemType.ITEM_00072].icon = itemStyles[ItemType.ITEM_00073].icon = itemStyles[ItemType.ITEM_00074].icon = itemStyles[ItemType.ITEM_00075].icon = this.imageService.getCachedImage('items/tooth1.png')!;
      itemStyles[ItemType.ITEM_00081].icon = itemStyles[ItemType.ITEM_00082].icon = itemStyles[ItemType.ITEM_00083].icon = itemStyles[ItemType.ITEM_00084].icon = itemStyles[ItemType.ITEM_00085].icon = this.imageService.getCachedImage('items/splinter1.png')!;
      itemStyles[ItemType.ITEM_00091].icon = itemStyles[ItemType.ITEM_00092].icon = itemStyles[ItemType.ITEM_00093].icon = itemStyles[ItemType.ITEM_00094].icon = itemStyles[ItemType.ITEM_00095].icon = this.imageService.getCachedImage('items/splinter2.png')!;
      itemStyles[ItemType.ITEM_00101].icon = itemStyles[ItemType.ITEM_00102].icon = itemStyles[ItemType.ITEM_00103].icon = itemStyles[ItemType.ITEM_00104].icon = itemStyles[ItemType.ITEM_00105].icon = this.imageService.getCachedImage('items/block1.png')!;
      itemStyles[ItemType.ITEM_00111].icon = itemStyles[ItemType.ITEM_00112].icon = itemStyles[ItemType.ITEM_00113].icon = itemStyles[ItemType.ITEM_00114].icon = itemStyles[ItemType.ITEM_00115].icon = this.imageService.getCachedImage('items/block2.png')!;
      itemStyles[ItemType.ITEM_00121].icon = itemStyles[ItemType.ITEM_00122].icon = itemStyles[ItemType.ITEM_00123].icon = itemStyles[ItemType.ITEM_00124].icon = itemStyles[ItemType.ITEM_00125].icon = this.imageService.getCachedImage('items/scrap1.png')!;
      itemStyles[ItemType.ITEM_00131].icon = itemStyles[ItemType.ITEM_00132].icon = itemStyles[ItemType.ITEM_00133].icon = itemStyles[ItemType.ITEM_00134].icon = itemStyles[ItemType.ITEM_00135].icon = this.imageService.getCachedImage('items/scrap2.png')!;
      itemStyles[ItemType.ITEM_00141].icon = itemStyles[ItemType.ITEM_00142].icon = itemStyles[ItemType.ITEM_00143].icon = itemStyles[ItemType.ITEM_00144].icon = itemStyles[ItemType.ITEM_00145].icon = this.imageService.getCachedImage('items/tooth2.png')!;
      itemStyles[ItemType.ITEM_00151].icon = itemStyles[ItemType.ITEM_00152].icon = itemStyles[ItemType.ITEM_00153].icon = itemStyles[ItemType.ITEM_00154].icon = itemStyles[ItemType.ITEM_00155].icon = this.imageService.getCachedImage('items/tooth3.png')!;
      itemStyles[ItemType.ITEM_00161].icon = itemStyles[ItemType.ITEM_00162].icon = itemStyles[ItemType.ITEM_00163].icon = itemStyles[ItemType.ITEM_00164].icon = itemStyles[ItemType.ITEM_00165].icon = this.imageService.getCachedImage('items/hoof1.png')!;
      itemStyles[ItemType.ITEM_00171].icon = itemStyles[ItemType.ITEM_00172].icon = itemStyles[ItemType.ITEM_00173].icon = itemStyles[ItemType.ITEM_00174].icon = itemStyles[ItemType.ITEM_00175].icon = this.imageService.getCachedImage('items/wing1.png')!;
      itemStyles[ItemType.ITEM_00181].icon = itemStyles[ItemType.ITEM_00182].icon = itemStyles[ItemType.ITEM_00183].icon = itemStyles[ItemType.ITEM_00184].icon = itemStyles[ItemType.ITEM_00185].icon = this.imageService.getCachedImage('items/shadowbark1.png')!;
      itemStyles[ItemType.ITEM_00191].icon = itemStyles[ItemType.ITEM_00192].icon = itemStyles[ItemType.ITEM_00193].icon = itemStyles[ItemType.ITEM_00194].icon = itemStyles[ItemType.ITEM_00195].icon = this.imageService.getCachedImage('items/holybark1.png')!;
      itemStyles[ItemType.ITEM_00201].icon = itemStyles[ItemType.ITEM_00202].icon = itemStyles[ItemType.ITEM_00203].icon = itemStyles[ItemType.ITEM_00204].icon = itemStyles[ItemType.ITEM_00205].icon = this.imageService.getCachedImage('items/leather1.png')!;
      itemStyles[ItemType.ITEM_00211].icon = itemStyles[ItemType.ITEM_00212].icon = itemStyles[ItemType.ITEM_00213].icon = itemStyles[ItemType.ITEM_00214].icon = itemStyles[ItemType.ITEM_00215].icon = this.imageService.getCachedImage('items/leather2.png')!;
      itemStyles[ItemType.ITEM_00221].icon = itemStyles[ItemType.ITEM_00222].icon = itemStyles[ItemType.ITEM_00223].icon = itemStyles[ItemType.ITEM_00224].icon = itemStyles[ItemType.ITEM_00225].icon = this.imageService.getCachedImage('items/forestfragment1.png')!;
      itemStyles[ItemType.ITEM_00231].icon = itemStyles[ItemType.ITEM_00232].icon = itemStyles[ItemType.ITEM_00233].icon = itemStyles[ItemType.ITEM_00234].icon = itemStyles[ItemType.ITEM_00235].icon = this.imageService.getCachedImage('items/hellfragment1.png')!;

      itemStyles[ItemType.ITEM_01000].icon = this.imageService.getCachedImage('items/A_hold_helmet.png')!;
      itemStyles[ItemType.ITEM_02000].icon = this.imageService.getCachedImage('items/A_hold_gloves.png')!;
      itemStyles[ItemType.ITEM_03000].icon = this.imageService.getCachedImage('items/A_hold_chest.png')!;
      itemStyles[ItemType.ITEM_04000].icon = this.imageService.getCachedImage('items/A_hold_weapon.png')!;
      itemStyles[ItemType.ITEM_05000].icon = this.imageService.getCachedImage('items/A_hold_boots.png')!;
      itemStyles[ItemType.ITEM_06000].icon = this.imageService.getCachedImage('items/A_hold_jewel.png')!;

      itemStyles[ItemType.ITEM_01011].icon = itemStyles[ItemType.ITEM_01012].icon = itemStyles[ItemType.ITEM_01013].icon = itemStyles[ItemType.ITEM_01014].icon = itemStyles[ItemType.ITEM_01015].icon = this.imageService.getCachedImage('items/ironhelmet1.png')!;
      itemStyles[ItemType.ITEM_01021].icon = itemStyles[ItemType.ITEM_01022].icon = itemStyles[ItemType.ITEM_01023].icon = itemStyles[ItemType.ITEM_01024].icon = itemStyles[ItemType.ITEM_01025].icon = this.imageService.getCachedImage('items/blunthelmet1.png')!;
      itemStyles[ItemType.ITEM_01031].icon = itemStyles[ItemType.ITEM_01032].icon = itemStyles[ItemType.ITEM_01033].icon = itemStyles[ItemType.ITEM_01034].icon = itemStyles[ItemType.ITEM_01035].icon = this.imageService.getCachedImage('items/guardhelmet1.png')!;
      itemStyles[ItemType.ITEM_01041].icon = itemStyles[ItemType.ITEM_01042].icon = itemStyles[ItemType.ITEM_01043].icon = itemStyles[ItemType.ITEM_01044].icon = itemStyles[ItemType.ITEM_01045].icon = this.imageService.getCachedImage('items/leatherhood1.png')!;
      itemStyles[ItemType.ITEM_01051].icon = itemStyles[ItemType.ITEM_01052].icon = itemStyles[ItemType.ITEM_01053].icon = itemStyles[ItemType.ITEM_01054].icon = itemStyles[ItemType.ITEM_01055].icon = this.imageService.getCachedImage('items/studdedhood1.png')!;
      itemStyles[ItemType.ITEM_01061].icon = itemStyles[ItemType.ITEM_01062].icon = itemStyles[ItemType.ITEM_01063].icon = itemStyles[ItemType.ITEM_01064].icon = itemStyles[ItemType.ITEM_01065].icon = this.imageService.getCachedImage('items/furhood1.png')!;
      itemStyles[ItemType.ITEM_01071].icon = itemStyles[ItemType.ITEM_01072].icon = itemStyles[ItemType.ITEM_01073].icon = itemStyles[ItemType.ITEM_01074].icon = itemStyles[ItemType.ITEM_01075].icon = this.imageService.getCachedImage('items/novicehat1.png')!;
      itemStyles[ItemType.ITEM_01081].icon = itemStyles[ItemType.ITEM_01082].icon = itemStyles[ItemType.ITEM_01083].icon = itemStyles[ItemType.ITEM_01084].icon = itemStyles[ItemType.ITEM_01085].icon = this.imageService.getCachedImage('items/renegadehat1.png')!;
      itemStyles[ItemType.ITEM_01091].icon = itemStyles[ItemType.ITEM_01092].icon = itemStyles[ItemType.ITEM_01093].icon = itemStyles[ItemType.ITEM_01094].icon = itemStyles[ItemType.ITEM_01095].icon = this.imageService.getCachedImage('items/guildhat1.png')!;
      itemStyles[ItemType.ITEM_01101].icon = itemStyles[ItemType.ITEM_01102].icon = itemStyles[ItemType.ITEM_01103].icon = itemStyles[ItemType.ITEM_01104].icon = itemStyles[ItemType.ITEM_01105].icon = this.imageService.getCachedImage('items/foresthelmet1.png')!;
      itemStyles[ItemType.ITEM_01111].icon = itemStyles[ItemType.ITEM_01112].icon = itemStyles[ItemType.ITEM_01113].icon = itemStyles[ItemType.ITEM_01114].icon = itemStyles[ItemType.ITEM_01115].icon = this.imageService.getCachedImage('items/holyhelmet1.jpg')!;

      itemStyles[ItemType.ITEM_02011].icon = itemStyles[ItemType.ITEM_02012].icon = itemStyles[ItemType.ITEM_02013].icon = itemStyles[ItemType.ITEM_02014].icon = itemStyles[ItemType.ITEM_02015].icon = this.imageService.getCachedImage('items/irongloves1.png')!;
      itemStyles[ItemType.ITEM_02021].icon = itemStyles[ItemType.ITEM_02022].icon = itemStyles[ItemType.ITEM_02023].icon = itemStyles[ItemType.ITEM_02024].icon = itemStyles[ItemType.ITEM_02025].icon = this.imageService.getCachedImage('items/bluntgloves1.png')!;
      itemStyles[ItemType.ITEM_02031].icon = itemStyles[ItemType.ITEM_02032].icon = itemStyles[ItemType.ITEM_02033].icon = itemStyles[ItemType.ITEM_02034].icon = itemStyles[ItemType.ITEM_02035].icon = this.imageService.getCachedImage('items/guardgloves1.png')!;
      itemStyles[ItemType.ITEM_02041].icon = itemStyles[ItemType.ITEM_02042].icon = itemStyles[ItemType.ITEM_02043].icon = itemStyles[ItemType.ITEM_02044].icon = itemStyles[ItemType.ITEM_02045].icon = this.imageService.getCachedImage('items/leathergloves1.png')!;
      itemStyles[ItemType.ITEM_02051].icon = itemStyles[ItemType.ITEM_02052].icon = itemStyles[ItemType.ITEM_02053].icon = itemStyles[ItemType.ITEM_02054].icon = itemStyles[ItemType.ITEM_02055].icon = this.imageService.getCachedImage('items/studdedgloves1.png')!;
      itemStyles[ItemType.ITEM_02061].icon = itemStyles[ItemType.ITEM_02062].icon = itemStyles[ItemType.ITEM_02063].icon = itemStyles[ItemType.ITEM_02064].icon = itemStyles[ItemType.ITEM_02065].icon = this.imageService.getCachedImage('items/furgloves1.png')!;
      itemStyles[ItemType.ITEM_02071].icon = itemStyles[ItemType.ITEM_02072].icon = itemStyles[ItemType.ITEM_02073].icon = itemStyles[ItemType.ITEM_02074].icon = itemStyles[ItemType.ITEM_02075].icon = this.imageService.getCachedImage('items/novicegloves1.png')!;
      itemStyles[ItemType.ITEM_02081].icon = itemStyles[ItemType.ITEM_02082].icon = itemStyles[ItemType.ITEM_02083].icon = itemStyles[ItemType.ITEM_02084].icon = itemStyles[ItemType.ITEM_02085].icon = this.imageService.getCachedImage('items/renegadegloves1.png')!;
      itemStyles[ItemType.ITEM_02091].icon = itemStyles[ItemType.ITEM_02092].icon = itemStyles[ItemType.ITEM_02093].icon = itemStyles[ItemType.ITEM_02094].icon = itemStyles[ItemType.ITEM_02095].icon = this.imageService.getCachedImage('items/guildgloves1.png')!;
      itemStyles[ItemType.ITEM_02101].icon = itemStyles[ItemType.ITEM_02102].icon = itemStyles[ItemType.ITEM_02103].icon = itemStyles[ItemType.ITEM_02104].icon = itemStyles[ItemType.ITEM_02105].icon = this.imageService.getCachedImage('items/forestgloves1.png')!;
      
      itemStyles[ItemType.ITEM_03011].icon = itemStyles[ItemType.ITEM_03012].icon = itemStyles[ItemType.ITEM_03013].icon = itemStyles[ItemType.ITEM_03014].icon = itemStyles[ItemType.ITEM_03015].icon = this.imageService.getCachedImage('items/ironchest1.png')!;
      itemStyles[ItemType.ITEM_03021].icon = itemStyles[ItemType.ITEM_03022].icon = itemStyles[ItemType.ITEM_03023].icon = itemStyles[ItemType.ITEM_03024].icon = itemStyles[ItemType.ITEM_03025].icon = this.imageService.getCachedImage('items/bluntchest1.png')!;
      itemStyles[ItemType.ITEM_03031].icon = itemStyles[ItemType.ITEM_03032].icon = itemStyles[ItemType.ITEM_03033].icon = itemStyles[ItemType.ITEM_03034].icon = itemStyles[ItemType.ITEM_03035].icon = this.imageService.getCachedImage('items/guardchest1.png')!;
      itemStyles[ItemType.ITEM_03041].icon = itemStyles[ItemType.ITEM_03042].icon = itemStyles[ItemType.ITEM_03043].icon = itemStyles[ItemType.ITEM_03044].icon = itemStyles[ItemType.ITEM_03045].icon = this.imageService.getCachedImage('items/leatherjacket1.png')!;
      itemStyles[ItemType.ITEM_03051].icon = itemStyles[ItemType.ITEM_03052].icon = itemStyles[ItemType.ITEM_03053].icon = itemStyles[ItemType.ITEM_03054].icon = itemStyles[ItemType.ITEM_03055].icon = this.imageService.getCachedImage('items/studdedjacket1.png')!;
      itemStyles[ItemType.ITEM_03061].icon = itemStyles[ItemType.ITEM_03062].icon = itemStyles[ItemType.ITEM_03063].icon = itemStyles[ItemType.ITEM_03064].icon = itemStyles[ItemType.ITEM_03065].icon = this.imageService.getCachedImage('items/furjacket1.png')!;
      itemStyles[ItemType.ITEM_03071].icon = itemStyles[ItemType.ITEM_03072].icon = itemStyles[ItemType.ITEM_03073].icon = itemStyles[ItemType.ITEM_03074].icon = itemStyles[ItemType.ITEM_03075].icon = this.imageService.getCachedImage('items/novicehabit1.png')!;
      itemStyles[ItemType.ITEM_03081].icon = itemStyles[ItemType.ITEM_03082].icon = itemStyles[ItemType.ITEM_03083].icon = itemStyles[ItemType.ITEM_03084].icon = itemStyles[ItemType.ITEM_03085].icon = this.imageService.getCachedImage('items/renegadehabit1.png')!;
      itemStyles[ItemType.ITEM_03091].icon = itemStyles[ItemType.ITEM_03092].icon = itemStyles[ItemType.ITEM_03093].icon = itemStyles[ItemType.ITEM_03094].icon = itemStyles[ItemType.ITEM_03095].icon = this.imageService.getCachedImage('items/guildhabit1.png')!;
      itemStyles[ItemType.ITEM_03101].icon = itemStyles[ItemType.ITEM_03102].icon = itemStyles[ItemType.ITEM_03103].icon = itemStyles[ItemType.ITEM_03104].icon = itemStyles[ItemType.ITEM_03105].icon = this.imageService.getCachedImage('items/forestchest1.png')!;

      itemStyles[ItemType.ITEM_04011].icon = itemStyles[ItemType.ITEM_04012].icon = itemStyles[ItemType.ITEM_04013].icon = itemStyles[ItemType.ITEM_04014].icon = itemStyles[ItemType.ITEM_04015].icon = this.imageService.getCachedImage('items/sword_1.1.png')!;
      itemStyles[ItemType.ITEM_04021].icon = itemStyles[ItemType.ITEM_04022].icon = itemStyles[ItemType.ITEM_04023].icon = itemStyles[ItemType.ITEM_04024].icon = itemStyles[ItemType.ITEM_04025].icon = this.imageService.getCachedImage('items/sword_1.2.png')!;
      itemStyles[ItemType.ITEM_04031].icon = itemStyles[ItemType.ITEM_04032].icon = itemStyles[ItemType.ITEM_04033].icon = itemStyles[ItemType.ITEM_04034].icon = itemStyles[ItemType.ITEM_04035].icon = this.imageService.getCachedImage('items/sword_1.3.png')!;
      itemStyles[ItemType.ITEM_04041].icon = itemStyles[ItemType.ITEM_04042].icon = itemStyles[ItemType.ITEM_04043].icon = itemStyles[ItemType.ITEM_04044].icon = itemStyles[ItemType.ITEM_04045].icon = this.imageService.getCachedImage('items/axe_1.1.png')!;
      itemStyles[ItemType.ITEM_04051].icon = itemStyles[ItemType.ITEM_04052].icon = itemStyles[ItemType.ITEM_04053].icon = itemStyles[ItemType.ITEM_04054].icon = itemStyles[ItemType.ITEM_04055].icon = this.imageService.getCachedImage('items/axe_1.2.png')!;
      itemStyles[ItemType.ITEM_04061].icon = itemStyles[ItemType.ITEM_04062].icon = itemStyles[ItemType.ITEM_04063].icon = itemStyles[ItemType.ITEM_04064].icon = itemStyles[ItemType.ITEM_04065].icon = this.imageService.getCachedImage('items/axe_1.3.png')!;
      itemStyles[ItemType.ITEM_04071].icon = itemStyles[ItemType.ITEM_04072].icon = itemStyles[ItemType.ITEM_04073].icon = itemStyles[ItemType.ITEM_04074].icon = itemStyles[ItemType.ITEM_04075].icon =this.imageService.getCachedImage('items/dage_1.1.png')!;
      itemStyles[ItemType.ITEM_04081].icon = itemStyles[ItemType.ITEM_04082].icon = itemStyles[ItemType.ITEM_04083].icon = itemStyles[ItemType.ITEM_04084].icon = itemStyles[ItemType.ITEM_04085].icon =this.imageService.getCachedImage('items/dage_1.2.png')!;
      itemStyles[ItemType.ITEM_04091].icon = itemStyles[ItemType.ITEM_04092].icon = itemStyles[ItemType.ITEM_04093].icon = itemStyles[ItemType.ITEM_04094].icon = itemStyles[ItemType.ITEM_04095].icon =this.imageService.getCachedImage('items/dage_1.3.png')!;
      itemStyles[ItemType.ITEM_04101].icon = itemStyles[ItemType.ITEM_04102].icon = itemStyles[ItemType.ITEM_04103].icon = itemStyles[ItemType.ITEM_04104].icon = itemStyles[ItemType.ITEM_04105].icon =this.imageService.getCachedImage('items/bow_1.1.png')!;
      itemStyles[ItemType.ITEM_04111].icon = itemStyles[ItemType.ITEM_04112].icon = itemStyles[ItemType.ITEM_04113].icon = itemStyles[ItemType.ITEM_04114].icon = itemStyles[ItemType.ITEM_04115].icon =this.imageService.getCachedImage('items/bow_1.2.png')!;
      itemStyles[ItemType.ITEM_04121].icon = itemStyles[ItemType.ITEM_04122].icon = itemStyles[ItemType.ITEM_04123].icon = itemStyles[ItemType.ITEM_04124].icon = itemStyles[ItemType.ITEM_04125].icon =this.imageService.getCachedImage('items/bow_1.3.png')!;
      itemStyles[ItemType.ITEM_04131].icon = itemStyles[ItemType.ITEM_04132].icon = itemStyles[ItemType.ITEM_04133].icon = itemStyles[ItemType.ITEM_04134].icon = itemStyles[ItemType.ITEM_04135].icon =this.imageService.getCachedImage('items/crosier_1.1.png')!;
      itemStyles[ItemType.ITEM_04141].icon = itemStyles[ItemType.ITEM_04142].icon = itemStyles[ItemType.ITEM_04143].icon = itemStyles[ItemType.ITEM_04144].icon = itemStyles[ItemType.ITEM_04145].icon =this.imageService.getCachedImage('items/crosier_1.2.png')!;
      itemStyles[ItemType.ITEM_04151].icon = itemStyles[ItemType.ITEM_04152].icon = itemStyles[ItemType.ITEM_04153].icon = itemStyles[ItemType.ITEM_04154].icon = itemStyles[ItemType.ITEM_04155].icon =this.imageService.getCachedImage('items/crosier_1.3.png')!;
      itemStyles[ItemType.ITEM_04161].icon = itemStyles[ItemType.ITEM_04162].icon = itemStyles[ItemType.ITEM_04163].icon = itemStyles[ItemType.ITEM_04164].icon = itemStyles[ItemType.ITEM_04165].icon =this.imageService.getCachedImage('items/wand_1.1.png')!;
      itemStyles[ItemType.ITEM_04171].icon = itemStyles[ItemType.ITEM_04172].icon = itemStyles[ItemType.ITEM_04173].icon = itemStyles[ItemType.ITEM_04174].icon = itemStyles[ItemType.ITEM_04175].icon =this.imageService.getCachedImage('items/wand_1.2.png')!;
      itemStyles[ItemType.ITEM_04181].icon = itemStyles[ItemType.ITEM_04182].icon = itemStyles[ItemType.ITEM_04183].icon = itemStyles[ItemType.ITEM_04184].icon = itemStyles[ItemType.ITEM_04185].icon =this.imageService.getCachedImage('items/wand_1.3.png')!;

      itemStyles[ItemType.ITEM_05011].icon = itemStyles[ItemType.ITEM_05012].icon = itemStyles[ItemType.ITEM_05013].icon = itemStyles[ItemType.ITEM_05014].icon = itemStyles[ItemType.ITEM_05015].icon = this.imageService.getCachedImage('items/ironboots1.png')!;
      itemStyles[ItemType.ITEM_05021].icon = itemStyles[ItemType.ITEM_05022].icon = itemStyles[ItemType.ITEM_05023].icon = itemStyles[ItemType.ITEM_05024].icon = itemStyles[ItemType.ITEM_05025].icon = this.imageService.getCachedImage('items/bluntboots1.png')!;
      itemStyles[ItemType.ITEM_05031].icon = itemStyles[ItemType.ITEM_05032].icon = itemStyles[ItemType.ITEM_05033].icon = itemStyles[ItemType.ITEM_05034].icon = itemStyles[ItemType.ITEM_05035].icon = this.imageService.getCachedImage('items/guardboots1.png')!;
      itemStyles[ItemType.ITEM_05041].icon = itemStyles[ItemType.ITEM_05042].icon = itemStyles[ItemType.ITEM_05043].icon = itemStyles[ItemType.ITEM_05044].icon = itemStyles[ItemType.ITEM_05045].icon = this.imageService.getCachedImage('items/leatherboots1.png')!;
      itemStyles[ItemType.ITEM_05051].icon = itemStyles[ItemType.ITEM_05052].icon = itemStyles[ItemType.ITEM_05053].icon = itemStyles[ItemType.ITEM_05054].icon = itemStyles[ItemType.ITEM_05055].icon = this.imageService.getCachedImage('items/studdedboots1.png')!;
      itemStyles[ItemType.ITEM_05061].icon = itemStyles[ItemType.ITEM_05062].icon = itemStyles[ItemType.ITEM_05063].icon = itemStyles[ItemType.ITEM_05064].icon = itemStyles[ItemType.ITEM_05065].icon = this.imageService.getCachedImage('items/furboots1.png')!;
      itemStyles[ItemType.ITEM_05071].icon = itemStyles[ItemType.ITEM_05072].icon = itemStyles[ItemType.ITEM_05073].icon = itemStyles[ItemType.ITEM_05074].icon = itemStyles[ItemType.ITEM_05075].icon = this.imageService.getCachedImage('items/noviceshoes1.png')!;
      itemStyles[ItemType.ITEM_05081].icon = itemStyles[ItemType.ITEM_05082].icon = itemStyles[ItemType.ITEM_05083].icon = itemStyles[ItemType.ITEM_05084].icon = itemStyles[ItemType.ITEM_05085].icon = this.imageService.getCachedImage('items/renegadeshoes1.png')!;
      itemStyles[ItemType.ITEM_05091].icon = itemStyles[ItemType.ITEM_05092].icon = itemStyles[ItemType.ITEM_05093].icon = itemStyles[ItemType.ITEM_05094].icon = itemStyles[ItemType.ITEM_05095].icon = this.imageService.getCachedImage('items/guildshoes1.png')!;
      itemStyles[ItemType.ITEM_05101].icon = itemStyles[ItemType.ITEM_05102].icon = itemStyles[ItemType.ITEM_05103].icon = itemStyles[ItemType.ITEM_05104].icon = itemStyles[ItemType.ITEM_05105].icon = this.imageService.getCachedImage('items/forestboots1.png')!;
      
      
      itemStyles[ItemType.ITEM_07011].icon = itemStyles[ItemType.ITEM_07012].icon = itemStyles[ItemType.ITEM_07013].icon = itemStyles[ItemType.ITEM_07014].icon = itemStyles[ItemType.ITEM_07015].icon = this.imageService.getCachedImage('items/potion1.png')!;
      itemStyles[ItemType.ITEM_07021].icon = itemStyles[ItemType.ITEM_07022].icon = itemStyles[ItemType.ITEM_07023].icon = itemStyles[ItemType.ITEM_07024].icon = itemStyles[ItemType.ITEM_07025].icon = this.imageService.getCachedImage('items/potion2.png')!;
      
    
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

     if (this.isBrowser) {
        this.renderer.setStyle(document.body, 'background-image', `url(${this.imageUrl})`);
        this.renderer.setStyle(document.body, 'background-size',  'cover');
        this.renderer.setStyle(document.body, 'background-repeat','repeat');
      }
    } catch (error) {
      console.error('❌ Error cargando fondo:', error);
    }
  }

  logout(): void {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch(err => console.error(err));
  }

  informar(): void {
  const currentUrl = this.router.url;

  if (currentUrl.includes('/login')) {
    this.router.navigate(['/informar']);
  }
 else if (currentUrl.includes('/dashboard')) {
    this.informe = "Volver";
    this.router.navigate(['/informar']);
  } else if (currentUrl.includes('/informar')) {
    this.informe = "Informar";
    this.router.navigate(['/dashboard']);
  }
}
}
