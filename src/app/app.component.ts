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
import spriteDataButtons from '../assets/sprites_buttons.json';
import { SpritesService } from './services/sprites.service';

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
  soundUrl: string = '';
  firebaseStatus: string = '';
  imageUrls: { [key: string]: string } = {};
  mostrarInfo :boolean = false;
  backgroundMusic!: HTMLAudioElement;
  volume: number = 0.1;
  sprites = spriteDataButtons;
  spriteButton : string = '';
  spriteHeros : string = '';
  private readonly isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private renderer: Renderer2,
    private firebaseService: FirebaseService,
    private imageService: ImageService,
    private spritesService: SpritesService,
    @Inject(PLATFORM_ID) platformId: object     
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
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
      if(this.isAuthenticated){
        this.router.navigate(['/dashboard']);
        if(this.soundUrl==''){
      this.storageService.getSoundUrl('sonidos', 'antientitymix.mp3')
    .then(url => {
      //this.backgroundMusic.pause();
      this.soundUrl = url;
      this.backgroundMusic = new Audio(this.soundUrl);
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = this.volume;
      this.backgroundMusic.play();
    });}
      }
      else{
        this.router.navigate(['/login']);
      }
     //this.router.navigate([user ? '/dashboard' : '/login']);
    });
  }

  async preloadGlobalImages() {
    try {
      await this.imageService.preloadImages([

        'fondos/desierto4.jpg',
        'fondos/desierto3.jpg',
        'iconos/logo3.png',
        'iconos/logo_jugador1.png',
        'iconos/add.png',
        'iconos/marco_pocion.png',
        'iconos/gold.png',
        'iconos/diamonds.png',
        'iconos/orb.png',
        'iconos/editCheck.png',
        'iconos/map_1.jpg',
        'iconos/map_2.jpg',
        'iconos/marco_item.png',
        'iconos/marco_description.png',
        'iconos/botones_madera.png',
        'iconos/heros.png',
        'missions/missions_map1.png',

        'crafters/alchemist.png',
        'crafters/armorsmith.png',
        'crafters/carpenter.png',
        'crafters/enchanter.png',
        'crafters/tailor.png',
        'crafters/weaponsmith.png',

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
        
        'characters/A_forest1.jpg','characters/A_forest1_up1.jpg','characters/A_forest1_up2.jpg',
        'characters/A_golem1.jpg','characters/A_golem1_up1.jpg','characters/A_golem1_up2.jpg',
        'characters/A_ent1.jpg','characters/A_ent1_up1.jpg','characters/A_ent1_up2.jpg',
        'characters/A_jabali1.jpg','characters/A_jabali1_up1.jpg','characters/A_jabali1_up2.jpg',
        'characters/A_jabali2.jpg','characters/A_jabali2_up1.jpg','characters/A_jabali2_up2.jpg',
        'characters/A_jabali3.jpg','characters/A_jabali3_up1.jpg','characters/A_jabali3_up2.jpg',
        'characters/A_jabali4.jpg','characters/A_jabali4_up1.jpg','characters/A_jabali4_up2.jpg',
        'characters/A_jabali5.jpg','characters/A_jabali5_up1.jpg','characters/A_jabali5_up2.jpg',
        'characters/A_jabali6.jpg','characters/A_jabali6_up1.jpg','characters/A_jabali6_up2.jpg',
        'characters/A_jabali7.jpg','characters/A_jabali7_up1.jpg','characters/A_jabali7_up2.jpg',

        'characters/A_pez2.jpg','characters/A_pez2_up1.jpg','characters/A_pez2_up2.jpg',
        
        'missions/C_forest1.png','missions/C_forest1_up1.png','missions/C_forest1_up2.png',
        'missions/C_golem1.png','missions/C_golem1_up1.png','missions/C_golem1_up2.png',
        'missions/C_ent1.png','missions/C_ent1_up1.png','missions/C_ent1_up2.png',
        'missions/C_jabali1.png','missions/C_jabali1_up1.png','missions/C_jabali1_up2.png',
        'missions/C_jabali2.png','missions/C_jabali2_up1.png','missions/C_jabali2_up2.png',
        'missions/C_jabali3.png','missions/C_jabali3_up1.png','missions/C_jabali3_up2.png',
        'missions/C_jabali4.png','missions/C_jabali4_up1.png','missions/C_jabali4_up2.png',
        'missions/C_jabali5.png','missions/C_jabali5_up1.png','missions/C_jabali5_up2.png',
        'missions/C_jabali6.png','missions/C_jabali6_up1.png','missions/C_jabali6_up2.png',
        'missions/C_jabali7.png','missions/C_jabali7_up1.png','missions/C_jabali7_up2.png',

        'missions/C_pez2.png','missions/C_pez2_up1.png','missions/C_pez2_up2.png',

        'grade/grade_a.png','grade/grade_b.png','grade/grade_c.png','grade/grade_d.png','grade/grade_s.png',

        'items/metal1.png',
        'items/tinder1.png','items/cloth1.png',
        'items/hoof1.png','items/wing1.png',
        'items/block1.png','items/block2.png',
        'items/leather1.png','items/leather2.png',
        'items/tooth1.png','items/tooth2.png','items/tooth3.png',
        'items/stone1.png','items/forestfragment1.png','items/hellfragment1.png',
        'items/mushroom1.png','items/moonmushroom1.png','items/sunsetmushroom1.png',
        'items/log1.png','items/shadowbark1.png','items/holybark1.png',
        'items/splinter1.png','items/splinter2.png',
        'items/scrap1.png','items/scrap2.png',
        'items/frozenbasalt1.png','items/burningbasalt1.png',
        'items/stormleather1.png','items/hugeleather1.png',
        'items/ebonyplates1.png','items/magmaplates.png',
        'items/sylvanscrap1.png','items/shadowscrap1.png',
        'items/spectralscrap1.png','items/spectralscrap2.png',
        'items/stormsplinter1.png','items/stormsplinter2.png',
        'items/stormsplinter3.png','items/stormsplinter4.png',
        
        
        'items/A_hold_boots.png','items/A_hold_chest.png','items/A_hold_gloves.png','items/A_hold_helmet.png','items/A_hold_jewel.png','items/A_hold_weapon.png',
        'items/jewel1.png','items/jewel2.png',

        'items/ironhelmet1.png','items/blunthelmet1.png','items/guardhelmet1.png',
        'items/leatherhood1.png','items/studdedhood1.png','items/furhood1.png',
        'items/novicehat1.png','items/renegadehat1.png','items/guildhat1.png',
        'items/foresthelmet1.png','items/ebonyhelmet1.png','items/spectralhood1.png',
        'items/hellhelmet1.png','items/stormhood1.png','items/shadowhat1.png',
        'items/holyhelmet1.jpg','items/flamingmask1.png','items/fracturedhat1.png',
        

        'items/irongloves1.png','items/bluntgloves1.png','items/guardgloves1.png',
        'items/leathergloves1.png','items/studdedgloves1.png','items/furgloves1.png',
        'items/novicegloves1.png','items/renegadegloves1.png','items/guildgloves1.png',
        'items/forestgloves1.png','items/ebonygloves1.png','items/spectralgloves1.png',
        'items/hellgloves1.png','items/stormgloves1.png','items/shadowgloves1.png',
        'items/holygloves1.png','items/flaminggloves1.png','items/fracturedgloves1.png',

        'items/ironchest1.png','items/bluntchest1.png','items/guardchest1.png',
        'items/leatherjacket1.png','items/studdedjacket1.png','items/furjacket1.png',
        'items/novicehabit1.png','items/renegadehabit1.png','items/guildhabit1.png',
        'items/forestchest1.png','items/ebonychest1.png','items/spectralrobe1.png',
        'items/hellchest1.png','items/stormjacket1.png','items/shadowrobe1.png',
        'items/holychest1.png','items/flamingchest1.png','items/fracturedrobe1.png',

        'items/sword_1.1.png','items/sword_1.2.png','items/sword_1.3.png','items/magmasword1.png','items/holysword1.jpg','items/poisonoussword1.png',
        'items/axe_1.1.png','items/axe_1.2.png','items/axe_1.3.png','items/shadowaxe1.png','items/magmaaxe1.png','items/frozenaxe1.png',
        'items/dage_1.1.png','items/dage_1.2.png','items/dage_1.3.png','items/shadowdage1.png','items/stormdage1.png','items/poisonousdage1.png',
        'items/bow_1.1.png','items/bow_1.2.png','items/bow_1.3.png','items/shadowbow1.png','items/holybow1.png','items/frozenbow1.png',
        'items/crosier_1.1.png','items/crosier_1.2.png','items/crosier_1.3.png','items/magmacrosier1.png','items/holycrosier1.png','items/frozencrosier1.png',
        'items/wand_1.1.png','items/wand_1.2.png','items/wand_1.3.png','items/shadowwand1.png','items/stormwand1.png','items/poisonouswand1.png',
        'items/magmahammer1.png','items/stormhammer1.png','items/poisonoushammer1.png',
        

        'items/ironboots1.png','items/bluntboots1.png','items/guardboots1.png',
        'items/leatherboots1.png','items/studdedboots1.png','items/furboots1.png',
        'items/noviceshoes1.png','items/renegadeshoes1.png','items/guildshoes1.png',
        'items/forestboots1.png','items/ebonyboots1.png','items/spectralboots1.png',
        'items/hellboots1.png','items/stormboots1.png','items/shadowshoes1.png',
        'items/holyboots1.png','items/flamingboots1.png','items/fracturedboots1.png',

        'items/potion1.png','items/potion2.png','items/potion3.png',

        'items/noItem.png',

        'bars/exp0.png','bars/exp10.png','bars/exp100.png','bars/exp12.5.png','bars/exp25.png','bars/exp37.5.png','bars/exp5.png','bars/exp50.png','bars/exp62.5.png','bars/exp75.png','bars/exp87.5.png','bars/exp90.png',
        'bars/life0.png','bars/life10.png','bars/life100.png','bars/life12.5.png','bars/life25.png','bars/life37.5.png','bars/life5.png','bars/life50.png','bars/life62.5.png','bars/life75.png','bars/life87.5.png','bars/life90.png'
      ]);
      this.imageUrls['LOGO'] = this.imageService.getCachedImage('iconos/logo3.png')!;
      this.imageUrls['LOGO_jugador1'] = this.imageService.getCachedImage('iconos/logo_jugador1.png')!;
      this.spriteButton = this.imageService.getCachedImage('iconos/botones_madera.png')!;
      this.spriteHeros = this.imageService.getCachedImage('iconos/heros.png')!;
      crafterStyles[CrafterType.Alchemist].icon = this.imageService.getCachedImage('crafters/alchemist.png')!;
      crafterStyles[CrafterType.Armorsmith].icon = this.imageService.getCachedImage('crafters/armorsmith.png')!;
      crafterStyles[CrafterType.Carpenter].icon = this.imageService.getCachedImage('crafters/carpenter.png')!;
      crafterStyles[CrafterType.Enchanter].icon = this.imageService.getCachedImage('crafters/enchanter.png')!;
      crafterStyles[CrafterType.Tailor].icon = this.imageService.getCachedImage('crafters/tailor.png')!;
      crafterStyles[CrafterType.WeaponSmith].icon = this.imageService.getCachedImage('crafters/weaponsmith.png')!;

      turnActionStyles[TurnActionType.STANDARD_ATTACK].icon = this.imageService.getCachedImage('skills/STANDARD_ATTACK.png')!;
      turnActionStyles[TurnActionType.HARD_STRIKE].icon = this.imageService.getCachedImage('skills/HARD_STRIKE.png')!;
      turnActionStyles[TurnActionType.HARD_SPELL].icon = this.imageService.getCachedImage('skills/HARD_SPELL.png')!;
      turnActionStyles[TurnActionType.HARD_SHOT].icon = this.imageService.getCachedImage('skills/HARD_SHOT.png')!;
      turnActionStyles[TurnActionType.BUFF_ARMOR].icon = this.imageService.getCachedImage('skills/BUFF_ARMOR.png')!;
      turnActionStyles[TurnActionType.DEBUFF_ARMOR].icon = this.imageService.getCachedImage('skills/DEBUFF_ARMOR.png')!;
      turnActionStyles[TurnActionType.NOACTION].icon = this.imageService.getCachedImage('skills/STANDARD_ATTACK.png')!;

      enemyStyles[EnemyType.FOREST1].icon = this.imageService.getCachedImage('characters/A_forest1.jpg')!;enemyStyles[EnemyType.FOREST1].missionIcon = this.imageService.getCachedImage('missions/C_forest1.png')!;
      enemyStyles[EnemyType.FOREST1_UP1].icon = this.imageService.getCachedImage('characters/A_forest1_up1.jpg')!;enemyStyles[EnemyType.FOREST1_UP1].missionIcon = this.imageService.getCachedImage('missions/C_forest1_up1.png')!;
      enemyStyles[EnemyType.FOREST1_UP2].icon = this.imageService.getCachedImage('characters/A_forest1_up2.jpg')!;enemyStyles[EnemyType.FOREST1_UP2].missionIcon = this.imageService.getCachedImage('missions/C_forest1_up2.png')!;
      enemyStyles[EnemyType.GOLEM1].icon = this.imageService.getCachedImage('characters/A_golem1.jpg')!;enemyStyles[EnemyType.GOLEM1].missionIcon = this.imageService.getCachedImage('missions/C_golem1.png')!;
      enemyStyles[EnemyType.GOLEM1_UP1].icon = this.imageService.getCachedImage('characters/A_golem1_up1.jpg')!;enemyStyles[EnemyType.GOLEM1_UP1].missionIcon = this.imageService.getCachedImage('missions/C_golem1_up1.png')!;
      enemyStyles[EnemyType.GOLEM1_UP2].icon = this.imageService.getCachedImage('characters/A_golem1_up2.jpg')!;enemyStyles[EnemyType.GOLEM1_UP2].missionIcon = this.imageService.getCachedImage('missions/C_golem1_up2.png')!;
      enemyStyles[EnemyType.ENT1].icon = this.imageService.getCachedImage('characters/A_ent1.jpg')!;enemyStyles[EnemyType.ENT1].missionIcon = this.imageService.getCachedImage('missions/C_ent1.png')!;
      enemyStyles[EnemyType.ENT1_UP1].icon = this.imageService.getCachedImage('characters/A_ent1_up1.jpg')!;enemyStyles[EnemyType.ENT1_UP1].missionIcon = this.imageService.getCachedImage('missions/C_ent1_up1.png')!;
      enemyStyles[EnemyType.ENT1_UP2].icon = this.imageService.getCachedImage('characters/A_ent1_up2.jpg')!;enemyStyles[EnemyType.ENT1_UP2].missionIcon = this.imageService.getCachedImage('missions/C_ent1_up2.png')!;
      enemyStyles[EnemyType.JABALI1].icon = this.imageService.getCachedImage('characters/A_jabali1.jpg')!;enemyStyles[EnemyType.JABALI1].missionIcon = this.imageService.getCachedImage('missions/C_jabali1.png')!;
      enemyStyles[EnemyType.JABALI1_UP1].icon = this.imageService.getCachedImage('characters/A_jabali1_up1.jpg')!;enemyStyles[EnemyType.JABALI1_UP1].missionIcon = this.imageService.getCachedImage('missions/C_jabali1_up1.png')!;
      enemyStyles[EnemyType.JABALI1_UP2].icon = this.imageService.getCachedImage('characters/A_jabali1_up2.jpg')!;enemyStyles[EnemyType.JABALI1_UP2].missionIcon = this.imageService.getCachedImage('missions/C_jabali1_up2.png')!;
      enemyStyles[EnemyType.JABALI2].icon = this.imageService.getCachedImage('characters/A_jabali2.jpg')!;enemyStyles[EnemyType.JABALI2].missionIcon = this.imageService.getCachedImage('missions/C_jabali2.png')!;
      enemyStyles[EnemyType.JABALI2_UP1].icon = this.imageService.getCachedImage('characters/A_jabali2_up1.jpg')!;enemyStyles[EnemyType.JABALI2_UP1].missionIcon = this.imageService.getCachedImage('missions/C_jabali2_up1.png')!;
      enemyStyles[EnemyType.JABALI2_UP2].icon = this.imageService.getCachedImage('characters/A_jabali2_up2.jpg')!;enemyStyles[EnemyType.JABALI2_UP2].missionIcon = this.imageService.getCachedImage('missions/C_jabali2_up2.png')!;
      enemyStyles[EnemyType.JABALI3].icon = this.imageService.getCachedImage('characters/A_jabali3.jpg')!;enemyStyles[EnemyType.JABALI3].missionIcon = this.imageService.getCachedImage('missions/C_jabali3.png')!;
      enemyStyles[EnemyType.JABALI3_UP1].icon = this.imageService.getCachedImage('characters/A_jabali3_up1.jpg')!;enemyStyles[EnemyType.JABALI3_UP1].missionIcon = this.imageService.getCachedImage('missions/C_jabali3_up1.png')!;
      enemyStyles[EnemyType.JABALI3_UP2].icon = this.imageService.getCachedImage('characters/A_jabali3_up2.jpg')!;enemyStyles[EnemyType.JABALI3_UP2].missionIcon = this.imageService.getCachedImage('missions/C_jabali3_up2.png')!;
      enemyStyles[EnemyType.JABALI4].icon = this.imageService.getCachedImage('characters/A_jabali4.jpg')!;enemyStyles[EnemyType.JABALI4].missionIcon = this.imageService.getCachedImage('missions/C_jabali4.png')!;
      enemyStyles[EnemyType.JABALI4_UP1].icon = this.imageService.getCachedImage('characters/A_jabali4_up1.jpg')!;enemyStyles[EnemyType.JABALI4_UP1].missionIcon = this.imageService.getCachedImage('missions/C_jabali4_up1.png')!;
      enemyStyles[EnemyType.JABALI4_UP2].icon = this.imageService.getCachedImage('characters/A_jabali4_up2.jpg')!;enemyStyles[EnemyType.JABALI4_UP2].missionIcon = this.imageService.getCachedImage('missions/C_jabali4_up2.png')!;
      enemyStyles[EnemyType.JABALI5].icon = this.imageService.getCachedImage('characters/A_jabali5.jpg')!;enemyStyles[EnemyType.JABALI5].missionIcon = this.imageService.getCachedImage('missions/C_jabali5.png')!;
      enemyStyles[EnemyType.JABALI5_UP1].icon = this.imageService.getCachedImage('characters/A_jabali5_up1.jpg')!;enemyStyles[EnemyType.JABALI5_UP1].missionIcon = this.imageService.getCachedImage('missions/C_jabali5_up1.png')!;
      enemyStyles[EnemyType.JABALI5_UP2].icon = this.imageService.getCachedImage('characters/A_jabali5_up2.jpg')!;enemyStyles[EnemyType.JABALI5_UP2].missionIcon = this.imageService.getCachedImage('missions/C_jabali5_up2.png')!;
      enemyStyles[EnemyType.JABALI6].icon = this.imageService.getCachedImage('characters/A_jabali6.jpg')!;enemyStyles[EnemyType.JABALI6].missionIcon = this.imageService.getCachedImage('missions/C_jabali6.png')!;
      enemyStyles[EnemyType.JABALI6_UP1].icon = this.imageService.getCachedImage('characters/A_jabali6_up1.jpg')!;enemyStyles[EnemyType.JABALI6_UP1].missionIcon = this.imageService.getCachedImage('missions/C_jabali6_up1.png')!;
      enemyStyles[EnemyType.JABALI6_UP2].icon = this.imageService.getCachedImage('characters/A_jabali6_up2.jpg')!;enemyStyles[EnemyType.JABALI6_UP2].missionIcon = this.imageService.getCachedImage('missions/C_jabali6_up2.png')!;
      enemyStyles[EnemyType.JABALI7].icon = this.imageService.getCachedImage('characters/A_jabali7.jpg')!;enemyStyles[EnemyType.JABALI7].missionIcon = this.imageService.getCachedImage('missions/C_jabali7.png')!;
      enemyStyles[EnemyType.JABALI7_UP1].icon = this.imageService.getCachedImage('characters/A_jabali7_up1.jpg')!;enemyStyles[EnemyType.JABALI7_UP1].missionIcon = this.imageService.getCachedImage('missions/C_jabali7_up1.png')!;
      enemyStyles[EnemyType.JABALI7_UP2].icon = this.imageService.getCachedImage('characters/A_jabali7_up2.jpg')!;enemyStyles[EnemyType.JABALI7_UP2].missionIcon = this.imageService.getCachedImage('missions/C_jabali7_up2.png')!;
      
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
      itemStyles[ItemType.ITEM_00241].icon = itemStyles[ItemType.ITEM_00242].icon = itemStyles[ItemType.ITEM_00243].icon = itemStyles[ItemType.ITEM_00244].icon = itemStyles[ItemType.ITEM_00245].icon = this.imageService.getCachedImage('items/moonmushroom1.png')!;
      itemStyles[ItemType.ITEM_00251].icon = itemStyles[ItemType.ITEM_00252].icon = itemStyles[ItemType.ITEM_00253].icon = itemStyles[ItemType.ITEM_00254].icon = itemStyles[ItemType.ITEM_00255].icon = this.imageService.getCachedImage('items/sunsetmushroom1.png')!;
      itemStyles[ItemType.ITEM_00261].icon = itemStyles[ItemType.ITEM_00262].icon = itemStyles[ItemType.ITEM_00263].icon = itemStyles[ItemType.ITEM_00264].icon = itemStyles[ItemType.ITEM_00265].icon = this.imageService.getCachedImage('items/stormleather1.png')!;
      itemStyles[ItemType.ITEM_00271].icon = itemStyles[ItemType.ITEM_00272].icon = itemStyles[ItemType.ITEM_00273].icon = itemStyles[ItemType.ITEM_00274].icon = itemStyles[ItemType.ITEM_00275].icon = this.imageService.getCachedImage('items/hugeleather1.png')!;
      itemStyles[ItemType.ITEM_00281].icon = itemStyles[ItemType.ITEM_00282].icon = itemStyles[ItemType.ITEM_00283].icon = itemStyles[ItemType.ITEM_00284].icon = itemStyles[ItemType.ITEM_00285].icon = this.imageService.getCachedImage('items/ebonyplates1.png')!;
      itemStyles[ItemType.ITEM_00291].icon = itemStyles[ItemType.ITEM_00292].icon = itemStyles[ItemType.ITEM_00293].icon = itemStyles[ItemType.ITEM_00294].icon = itemStyles[ItemType.ITEM_00295].icon = this.imageService.getCachedImage('items/magmaplates.png')!;
      itemStyles[ItemType.ITEM_00301].icon = itemStyles[ItemType.ITEM_00302].icon = itemStyles[ItemType.ITEM_00303].icon = itemStyles[ItemType.ITEM_00304].icon = itemStyles[ItemType.ITEM_00305].icon = this.imageService.getCachedImage('items/stormsplinter1.png')!;
      itemStyles[ItemType.ITEM_00311].icon = itemStyles[ItemType.ITEM_00312].icon = itemStyles[ItemType.ITEM_00313].icon = itemStyles[ItemType.ITEM_00314].icon = itemStyles[ItemType.ITEM_00315].icon = this.imageService.getCachedImage('items/stormsplinter3.png')!;
      itemStyles[ItemType.ITEM_00321].icon = itemStyles[ItemType.ITEM_00322].icon = itemStyles[ItemType.ITEM_00323].icon = itemStyles[ItemType.ITEM_00324].icon = itemStyles[ItemType.ITEM_00325].icon = this.imageService.getCachedImage('items/spectralscrap1.png')!;
      itemStyles[ItemType.ITEM_00331].icon = itemStyles[ItemType.ITEM_00332].icon = itemStyles[ItemType.ITEM_00333].icon = itemStyles[ItemType.ITEM_00334].icon = itemStyles[ItemType.ITEM_00335].icon = this.imageService.getCachedImage('items/spectralscrap2.png')!;
      itemStyles[ItemType.ITEM_00341].icon = itemStyles[ItemType.ITEM_00342].icon = itemStyles[ItemType.ITEM_00343].icon = itemStyles[ItemType.ITEM_00344].icon = itemStyles[ItemType.ITEM_00345].icon = this.imageService.getCachedImage('items/sylvanscrap1.png')!;
      itemStyles[ItemType.ITEM_00351].icon = itemStyles[ItemType.ITEM_00352].icon = itemStyles[ItemType.ITEM_00353].icon = itemStyles[ItemType.ITEM_00354].icon = itemStyles[ItemType.ITEM_00355].icon = this.imageService.getCachedImage('items/shadowscrap1.png')!;
      itemStyles[ItemType.ITEM_00361].icon = itemStyles[ItemType.ITEM_00362].icon = itemStyles[ItemType.ITEM_00363].icon = itemStyles[ItemType.ITEM_00364].icon = itemStyles[ItemType.ITEM_00365].icon = this.imageService.getCachedImage('items/stormsplinter2.png')!;
      itemStyles[ItemType.ITEM_00371].icon = itemStyles[ItemType.ITEM_00372].icon = itemStyles[ItemType.ITEM_00373].icon = itemStyles[ItemType.ITEM_00374].icon = itemStyles[ItemType.ITEM_00375].icon = this.imageService.getCachedImage('items/stormsplinter4.png')!;
      itemStyles[ItemType.ITEM_00381].icon = itemStyles[ItemType.ITEM_00382].icon = itemStyles[ItemType.ITEM_00383].icon = itemStyles[ItemType.ITEM_00384].icon = itemStyles[ItemType.ITEM_00385].icon = this.imageService.getCachedImage('items/frozenbasalt1.png')!;
      itemStyles[ItemType.ITEM_00391].icon = itemStyles[ItemType.ITEM_00392].icon = itemStyles[ItemType.ITEM_00393].icon = itemStyles[ItemType.ITEM_00394].icon = itemStyles[ItemType.ITEM_00395].icon = this.imageService.getCachedImage('items/burningbasalt1.png')!;
            
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
      itemStyles[ItemType.ITEM_01111].icon = itemStyles[ItemType.ITEM_01112].icon = itemStyles[ItemType.ITEM_01113].icon = itemStyles[ItemType.ITEM_01114].icon = itemStyles[ItemType.ITEM_01115].icon = this.imageService.getCachedImage('items/ebonyhelmet1.png')!;
      itemStyles[ItemType.ITEM_01121].icon = itemStyles[ItemType.ITEM_01122].icon = itemStyles[ItemType.ITEM_01123].icon = itemStyles[ItemType.ITEM_01124].icon = itemStyles[ItemType.ITEM_01125].icon = this.imageService.getCachedImage('items/spectralhood1.png')!;
      itemStyles[ItemType.ITEM_01131].icon = itemStyles[ItemType.ITEM_01132].icon = itemStyles[ItemType.ITEM_01133].icon = itemStyles[ItemType.ITEM_01134].icon = itemStyles[ItemType.ITEM_01135].icon = this.imageService.getCachedImage('items/hellhelmet1.png')!;
      itemStyles[ItemType.ITEM_01141].icon = itemStyles[ItemType.ITEM_01142].icon = itemStyles[ItemType.ITEM_01143].icon = itemStyles[ItemType.ITEM_01144].icon = itemStyles[ItemType.ITEM_01145].icon = this.imageService.getCachedImage('items/stormhood1.png')!;
      itemStyles[ItemType.ITEM_01151].icon = itemStyles[ItemType.ITEM_01152].icon = itemStyles[ItemType.ITEM_01153].icon = itemStyles[ItemType.ITEM_01154].icon = itemStyles[ItemType.ITEM_01155].icon = this.imageService.getCachedImage('items/shadowhat1.png')!;
      itemStyles[ItemType.ITEM_01161].icon = itemStyles[ItemType.ITEM_01162].icon = itemStyles[ItemType.ITEM_01163].icon = itemStyles[ItemType.ITEM_01164].icon = itemStyles[ItemType.ITEM_01165].icon = this.imageService.getCachedImage('items/holyhelmet1.jpg')!;
      itemStyles[ItemType.ITEM_01171].icon = itemStyles[ItemType.ITEM_01172].icon = itemStyles[ItemType.ITEM_01173].icon = itemStyles[ItemType.ITEM_01174].icon = itemStyles[ItemType.ITEM_01175].icon = this.imageService.getCachedImage('items/flamingmask1.png')!;
      itemStyles[ItemType.ITEM_01181].icon = itemStyles[ItemType.ITEM_01182].icon = itemStyles[ItemType.ITEM_01183].icon = itemStyles[ItemType.ITEM_01184].icon = itemStyles[ItemType.ITEM_01185].icon = this.imageService.getCachedImage('items/fracturedhat1.png')!;

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
      itemStyles[ItemType.ITEM_02111].icon = itemStyles[ItemType.ITEM_02112].icon = itemStyles[ItemType.ITEM_02113].icon = itemStyles[ItemType.ITEM_02114].icon = itemStyles[ItemType.ITEM_02115].icon = this.imageService.getCachedImage('items/ebonygloves1.png')!;
      itemStyles[ItemType.ITEM_02121].icon = itemStyles[ItemType.ITEM_02122].icon = itemStyles[ItemType.ITEM_02123].icon = itemStyles[ItemType.ITEM_02124].icon = itemStyles[ItemType.ITEM_02125].icon = this.imageService.getCachedImage('items/spectralgloves1.png')!;
      itemStyles[ItemType.ITEM_02131].icon = itemStyles[ItemType.ITEM_02132].icon = itemStyles[ItemType.ITEM_02133].icon = itemStyles[ItemType.ITEM_02134].icon = itemStyles[ItemType.ITEM_02135].icon = this.imageService.getCachedImage('items/hellgloves1.png')!;
      itemStyles[ItemType.ITEM_02141].icon = itemStyles[ItemType.ITEM_02142].icon = itemStyles[ItemType.ITEM_02143].icon = itemStyles[ItemType.ITEM_02144].icon = itemStyles[ItemType.ITEM_02145].icon = this.imageService.getCachedImage('items/stormgloves1.png')!;
      itemStyles[ItemType.ITEM_02151].icon = itemStyles[ItemType.ITEM_02152].icon = itemStyles[ItemType.ITEM_02153].icon = itemStyles[ItemType.ITEM_02154].icon = itemStyles[ItemType.ITEM_02155].icon = this.imageService.getCachedImage('items/shadowgloves1.png')!;
      itemStyles[ItemType.ITEM_02161].icon = itemStyles[ItemType.ITEM_02162].icon = itemStyles[ItemType.ITEM_02163].icon = itemStyles[ItemType.ITEM_02164].icon = itemStyles[ItemType.ITEM_02165].icon = this.imageService.getCachedImage('items/holygloves1.png')!;
      itemStyles[ItemType.ITEM_02171].icon = itemStyles[ItemType.ITEM_02172].icon = itemStyles[ItemType.ITEM_02173].icon = itemStyles[ItemType.ITEM_02174].icon = itemStyles[ItemType.ITEM_02175].icon = this.imageService.getCachedImage('items/flaminggloves1.png')!;
      itemStyles[ItemType.ITEM_02181].icon = itemStyles[ItemType.ITEM_02182].icon = itemStyles[ItemType.ITEM_02183].icon = itemStyles[ItemType.ITEM_02184].icon = itemStyles[ItemType.ITEM_02185].icon = this.imageService.getCachedImage('items/fracturedgloves1.png')!;

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
      itemStyles[ItemType.ITEM_03111].icon = itemStyles[ItemType.ITEM_03112].icon = itemStyles[ItemType.ITEM_03113].icon = itemStyles[ItemType.ITEM_03114].icon = itemStyles[ItemType.ITEM_03115].icon = this.imageService.getCachedImage('items/ebonychest1.png')!;
      itemStyles[ItemType.ITEM_03121].icon = itemStyles[ItemType.ITEM_03122].icon = itemStyles[ItemType.ITEM_03123].icon = itemStyles[ItemType.ITEM_03124].icon = itemStyles[ItemType.ITEM_03125].icon = this.imageService.getCachedImage('items/spectralrobe1.png')!;
      itemStyles[ItemType.ITEM_03131].icon = itemStyles[ItemType.ITEM_03132].icon = itemStyles[ItemType.ITEM_03133].icon = itemStyles[ItemType.ITEM_03134].icon = itemStyles[ItemType.ITEM_03135].icon = this.imageService.getCachedImage('items/hellchest1.png')!;
      itemStyles[ItemType.ITEM_03141].icon = itemStyles[ItemType.ITEM_03142].icon = itemStyles[ItemType.ITEM_03143].icon = itemStyles[ItemType.ITEM_03144].icon = itemStyles[ItemType.ITEM_03145].icon = this.imageService.getCachedImage('items/stormjacket1.png')!;
      itemStyles[ItemType.ITEM_03151].icon = itemStyles[ItemType.ITEM_03152].icon = itemStyles[ItemType.ITEM_03153].icon = itemStyles[ItemType.ITEM_03154].icon = itemStyles[ItemType.ITEM_03155].icon = this.imageService.getCachedImage('items/shadowrobe1.png')!;
      itemStyles[ItemType.ITEM_03161].icon = itemStyles[ItemType.ITEM_03162].icon = itemStyles[ItemType.ITEM_03163].icon = itemStyles[ItemType.ITEM_03164].icon = itemStyles[ItemType.ITEM_03165].icon = this.imageService.getCachedImage('items/holychest1.png')!;
      itemStyles[ItemType.ITEM_03171].icon = itemStyles[ItemType.ITEM_03172].icon = itemStyles[ItemType.ITEM_03173].icon = itemStyles[ItemType.ITEM_03174].icon = itemStyles[ItemType.ITEM_03175].icon = this.imageService.getCachedImage('items/flamingchest1.png')!;
      itemStyles[ItemType.ITEM_03181].icon = itemStyles[ItemType.ITEM_03182].icon = itemStyles[ItemType.ITEM_03183].icon = itemStyles[ItemType.ITEM_03184].icon = itemStyles[ItemType.ITEM_03185].icon = this.imageService.getCachedImage('items/fracturedrobe1.png')!;

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

      itemStyles[ItemType.ITEM_04191].icon = itemStyles[ItemType.ITEM_04192].icon = itemStyles[ItemType.ITEM_04193].icon = itemStyles[ItemType.ITEM_04194].icon = itemStyles[ItemType.ITEM_04195].icon =this.imageService.getCachedImage('items/shadowdage1.png')!;
      itemStyles[ItemType.ITEM_04201].icon = itemStyles[ItemType.ITEM_04202].icon = itemStyles[ItemType.ITEM_04203].icon = itemStyles[ItemType.ITEM_04204].icon = itemStyles[ItemType.ITEM_04205].icon =this.imageService.getCachedImage('items/shadowaxe1.png')!;
      itemStyles[ItemType.ITEM_04211].icon = itemStyles[ItemType.ITEM_04212].icon = itemStyles[ItemType.ITEM_04213].icon = itemStyles[ItemType.ITEM_04214].icon = itemStyles[ItemType.ITEM_04215].icon =this.imageService.getCachedImage('items/shadowbow1.png')!;
      itemStyles[ItemType.ITEM_04221].icon = itemStyles[ItemType.ITEM_04222].icon = itemStyles[ItemType.ITEM_04223].icon = itemStyles[ItemType.ITEM_04224].icon = itemStyles[ItemType.ITEM_04225].icon =this.imageService.getCachedImage('items/shadowwand1.png')!;
      itemStyles[ItemType.ITEM_04231].icon = itemStyles[ItemType.ITEM_04232].icon = itemStyles[ItemType.ITEM_04233].icon = itemStyles[ItemType.ITEM_04234].icon = itemStyles[ItemType.ITEM_04235].icon =this.imageService.getCachedImage('items/magmasword1.png')!;
      itemStyles[ItemType.ITEM_04241].icon = itemStyles[ItemType.ITEM_04242].icon = itemStyles[ItemType.ITEM_04243].icon = itemStyles[ItemType.ITEM_04244].icon = itemStyles[ItemType.ITEM_04245].icon =this.imageService.getCachedImage('items/magmaaxe1.png')!;
      itemStyles[ItemType.ITEM_04251].icon = itemStyles[ItemType.ITEM_04252].icon = itemStyles[ItemType.ITEM_04253].icon = itemStyles[ItemType.ITEM_04254].icon = itemStyles[ItemType.ITEM_04255].icon =this.imageService.getCachedImage('items/magmahammer1.png')!;
      itemStyles[ItemType.ITEM_04261].icon = itemStyles[ItemType.ITEM_04262].icon = itemStyles[ItemType.ITEM_04263].icon = itemStyles[ItemType.ITEM_04264].icon = itemStyles[ItemType.ITEM_04265].icon =this.imageService.getCachedImage('items/magmacrosier1.png')!;
      itemStyles[ItemType.ITEM_04271].icon = itemStyles[ItemType.ITEM_04272].icon = itemStyles[ItemType.ITEM_04273].icon = itemStyles[ItemType.ITEM_04274].icon = itemStyles[ItemType.ITEM_04275].icon =this.imageService.getCachedImage('items/stormdage1.png')!;
      itemStyles[ItemType.ITEM_04281].icon = itemStyles[ItemType.ITEM_04282].icon = itemStyles[ItemType.ITEM_04283].icon = itemStyles[ItemType.ITEM_04284].icon = itemStyles[ItemType.ITEM_04285].icon =this.imageService.getCachedImage('items/stormhammer1.png')!;
      itemStyles[ItemType.ITEM_04291].icon = itemStyles[ItemType.ITEM_04292].icon = itemStyles[ItemType.ITEM_04293].icon = itemStyles[ItemType.ITEM_04294].icon = itemStyles[ItemType.ITEM_04295].icon =this.imageService.getCachedImage('items/stormwand1.png')!;
      itemStyles[ItemType.ITEM_04301].icon = itemStyles[ItemType.ITEM_04302].icon = itemStyles[ItemType.ITEM_04303].icon = itemStyles[ItemType.ITEM_04304].icon = itemStyles[ItemType.ITEM_04305].icon =this.imageService.getCachedImage('items/holysword1.jpg')!;
      itemStyles[ItemType.ITEM_04311].icon = itemStyles[ItemType.ITEM_04312].icon = itemStyles[ItemType.ITEM_04313].icon = itemStyles[ItemType.ITEM_04314].icon = itemStyles[ItemType.ITEM_04315].icon =this.imageService.getCachedImage('items/holybow1.png')!;
      itemStyles[ItemType.ITEM_04321].icon = itemStyles[ItemType.ITEM_04322].icon = itemStyles[ItemType.ITEM_04323].icon = itemStyles[ItemType.ITEM_04324].icon = itemStyles[ItemType.ITEM_04325].icon =this.imageService.getCachedImage('items/holycrosier1.png')!;
      itemStyles[ItemType.ITEM_04331].icon = itemStyles[ItemType.ITEM_04332].icon = itemStyles[ItemType.ITEM_04333].icon = itemStyles[ItemType.ITEM_04334].icon = itemStyles[ItemType.ITEM_04335].icon =this.imageService.getCachedImage('items/poisonoussword1.png')!;
      itemStyles[ItemType.ITEM_04341].icon = itemStyles[ItemType.ITEM_04342].icon = itemStyles[ItemType.ITEM_04343].icon = itemStyles[ItemType.ITEM_04344].icon = itemStyles[ItemType.ITEM_04345].icon =this.imageService.getCachedImage('items/poisonousdage1.png')!;
      itemStyles[ItemType.ITEM_04351].icon = itemStyles[ItemType.ITEM_04352].icon = itemStyles[ItemType.ITEM_04353].icon = itemStyles[ItemType.ITEM_04354].icon = itemStyles[ItemType.ITEM_04355].icon =this.imageService.getCachedImage('items/poisonoushammer1.png')!;
      itemStyles[ItemType.ITEM_04361].icon = itemStyles[ItemType.ITEM_04362].icon = itemStyles[ItemType.ITEM_04363].icon = itemStyles[ItemType.ITEM_04364].icon = itemStyles[ItemType.ITEM_04365].icon =this.imageService.getCachedImage('items/poisonouswand1.png')!;
      itemStyles[ItemType.ITEM_04371].icon = itemStyles[ItemType.ITEM_04372].icon = itemStyles[ItemType.ITEM_04373].icon = itemStyles[ItemType.ITEM_04374].icon = itemStyles[ItemType.ITEM_04375].icon =this.imageService.getCachedImage('items/frozenaxe1.png')!;
      itemStyles[ItemType.ITEM_04381].icon = itemStyles[ItemType.ITEM_04382].icon = itemStyles[ItemType.ITEM_04383].icon = itemStyles[ItemType.ITEM_04384].icon = itemStyles[ItemType.ITEM_04385].icon =this.imageService.getCachedImage('items/frozenbow1.png')!;
      itemStyles[ItemType.ITEM_04391].icon = itemStyles[ItemType.ITEM_04392].icon = itemStyles[ItemType.ITEM_04393].icon = itemStyles[ItemType.ITEM_04394].icon = itemStyles[ItemType.ITEM_04395].icon =this.imageService.getCachedImage('items/frozencrosier1.png')!;

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
      itemStyles[ItemType.ITEM_05111].icon = itemStyles[ItemType.ITEM_05112].icon = itemStyles[ItemType.ITEM_05113].icon = itemStyles[ItemType.ITEM_05114].icon = itemStyles[ItemType.ITEM_05115].icon = this.imageService.getCachedImage('items/ebonyboots1.png')!;
      itemStyles[ItemType.ITEM_05121].icon = itemStyles[ItemType.ITEM_05122].icon = itemStyles[ItemType.ITEM_05123].icon = itemStyles[ItemType.ITEM_05124].icon = itemStyles[ItemType.ITEM_05125].icon = this.imageService.getCachedImage('items/spectralboots1.png')!;
      itemStyles[ItemType.ITEM_05131].icon = itemStyles[ItemType.ITEM_05132].icon = itemStyles[ItemType.ITEM_05133].icon = itemStyles[ItemType.ITEM_05134].icon = itemStyles[ItemType.ITEM_05135].icon = this.imageService.getCachedImage('items/hellboots1.png')!;
      itemStyles[ItemType.ITEM_05141].icon = itemStyles[ItemType.ITEM_05142].icon = itemStyles[ItemType.ITEM_05143].icon = itemStyles[ItemType.ITEM_05144].icon = itemStyles[ItemType.ITEM_05145].icon = this.imageService.getCachedImage('items/stormboots1.png')!;
      itemStyles[ItemType.ITEM_05151].icon = itemStyles[ItemType.ITEM_05152].icon = itemStyles[ItemType.ITEM_05153].icon = itemStyles[ItemType.ITEM_05154].icon = itemStyles[ItemType.ITEM_05155].icon = this.imageService.getCachedImage('items/shadowshoes1.png')!;
      itemStyles[ItemType.ITEM_05161].icon = itemStyles[ItemType.ITEM_05162].icon = itemStyles[ItemType.ITEM_05163].icon = itemStyles[ItemType.ITEM_05164].icon = itemStyles[ItemType.ITEM_05165].icon = this.imageService.getCachedImage('items/holyboots1.png')!;
      itemStyles[ItemType.ITEM_05171].icon = itemStyles[ItemType.ITEM_05172].icon = itemStyles[ItemType.ITEM_05173].icon = itemStyles[ItemType.ITEM_05174].icon = itemStyles[ItemType.ITEM_05175].icon = this.imageService.getCachedImage('items/flamingboots1.png')!;
      itemStyles[ItemType.ITEM_05181].icon = itemStyles[ItemType.ITEM_05182].icon = itemStyles[ItemType.ITEM_05183].icon = itemStyles[ItemType.ITEM_05184].icon = itemStyles[ItemType.ITEM_05185].icon = this.imageService.getCachedImage('items/fracturedboots1.png')!;

      
      itemStyles[ItemType.ITEM_07011].icon = itemStyles[ItemType.ITEM_07012].icon = itemStyles[ItemType.ITEM_07013].icon = itemStyles[ItemType.ITEM_07014].icon = itemStyles[ItemType.ITEM_07015].icon = this.imageService.getCachedImage('items/potion1.png')!;
      itemStyles[ItemType.ITEM_07021].icon = itemStyles[ItemType.ITEM_07022].icon = itemStyles[ItemType.ITEM_07023].icon = itemStyles[ItemType.ITEM_07024].icon = itemStyles[ItemType.ITEM_07025].icon = this.imageService.getCachedImage('items/potion2.png')!;
      itemStyles[ItemType.ITEM_07031].icon = itemStyles[ItemType.ITEM_07032].icon = itemStyles[ItemType.ITEM_07033].icon = itemStyles[ItemType.ITEM_07034].icon = itemStyles[ItemType.ITEM_07035].icon = this.imageService.getCachedImage('items/potion3.png')!;
      
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
      this.soundUrl='';
      this.backgroundMusic.pause();
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
changeVolume() {
  if (this.backgroundMusic) {
    this.backgroundMusic.volume = this.volume;
  }
}
getSprite(name: string, spriteType: string): { [key: string]: string } | undefined {
  if(spriteType== "hero"){
    return this.spritesService.getStyleByName(name, this.spriteHeros, spriteType);
  }
  else{
    return this.spritesService.getStyleByName(name, this.spriteButton, spriteType);
  }
}
}
