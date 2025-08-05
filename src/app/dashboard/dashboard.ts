import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore,doc,setDoc, collection, addDoc, getDoc, getDocs} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Hero} from '../domain/hero';
import { Enemy} from '../domain/enemy';
import { Item} from '../domain/item';
import { Crafter} from '../domain/crafter';
import { HeroType,heroStyles } from '../enum/heroType';
import { EnemyType,enemyStyles } from '../enum/enemyType';
import { ItemType,itemStyles } from '../enum/itemType';
import { GradeType, gradeStyles } from '../enum/gradeType';
import { TurnActionType, turnActionStyles } from '../enum/turnActionType';
import { ImageService } from '../services/image.service';
import { FirebaseService } from '../services/firebase.service';
import { SpritesService } from '../services/sprites.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { CrafterType,crafterStyles } from '../enum/crafterType';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import {SpriteData} from '../services/spritesDataModel';

interface User {
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  firestore = getFirestore(inject(FirebaseApp));
  admin: Boolean = false; //esto hay que quitarlo para jugar normal
  user: any = {};
  title ='sin título';
  logDetail ='sin detalles del log';
  sanitizedLogDetail!: SafeHtml;
  heroes: Hero[] = [];
  pociones: Item[] = [];
  pocion = ItemType.NULL;
  turnActions: TurnActionType[] = [TurnActionType.STANDARD_ATTACK,TurnActionType.HARD_STRIKE,TurnActionType.HARD_SPELL,TurnActionType.HARD_SHOT,TurnActionType.BUFF_ARMOR,TurnActionType.DEBUFF_ARMOR];
  items: Item[] = [];
  crafters: Crafter[] = [];
  grades: GradeType[] = [GradeType.D,GradeType.C,GradeType.B,GradeType.A,GradeType.S];
  itemsToEquip: Item[] = [];
  itemsToCraft: Item[] = [];
  heroTypes = Object.values(HeroType) as HeroType[];
  userData: any | null = null;//anteriormente no era any era User, pero gold no era propiedad
  enemyData: any | null = null;
  loot: ItemType[] =[];
  lootProb: string[] =[];
  imageUrls: { [key: string]: string } = {};
  state: string = '';
  mainClip: string = 'clipHo';
  clip: string = 'clipBa';
  showNameShine = false;
  showSkillShine:boolean[] = [false,false,false,false,false];

  preference_storage = false;
  potionIndex = 0;
  isLoadingPociones = false;
  hero: Hero | null = null;
  item: any;
  crafter: any;
  grade: any;
  heroType =  HeroType.GUERRERO;
  //boots: ItemType = ItemType.ITEM_01000;
  //chest: Item = new Item("ITEM_02000", 1,"chest",0,"SUBTYPE","TYPE",[0,0,0,0,0,0,0,0]);
  //gloves: ItemType = ItemType.ITEM_01000;
  //helmet: ItemType = ItemType.ITEM_01000;
  //jewel: ItemType = ItemType.ITEM_01000;
  //weapon: ItemType = ItemType.ITEM_01000;
  enemyType: EnemyType | null = null;
  EnemyType = EnemyType; //necesario para usarlo en el html
  HeroType = HeroType;
  GradeType = GradeType;
  ItemType = ItemType;
  TurnActionType = TurnActionType;
  heroDescription: string = '';
  heroBackground: string = '#f9f9f9';
  heroLongBackground: string = '#f9f9f9';
  enemyBackground: string = '#f9f9f9';
  enemyLongBackground: string = '#f9f9f9';
  heroStyles = heroStyles;
  enemyStyles = enemyStyles;
  itemStyles = itemStyles;
  gradeStyles = gradeStyles;
  turnActionStyles = turnActionStyles;
  heroSkills:  TurnActionType[] = [];
  enemySkills:  TurnActionType[] = [];
  heroNewname:string = '';
  gold: number = 0;
  userMap1: number[]=[0,0,0,0,0,0,0,0,0,0]
  userMap2: number[]=[0,0,0,0,0,0,0,0,0,0]
  selectedAmount = 1;
  selectedTotal = 0;
  
  item1 = ItemType.NULL;
  item2 = ItemType.NULL;
  item3 = ItemType.NULL;
  
  item1Amount = 0; item1Have = false;
  item2Amount = 0; item2Have = false;
  item3Amount = 0; item3Have = false;

  gifHeroUrl: string | null = null;
  gifBattleUrl: string | null = null;
  gifState: string | null = null;
  mostrarHeroGif= false;
  mostrarBattleGif= false;
  desapareciendo = false;
  soldEffect: boolean = false;
  isFocused1 = false;
  isFocused2 = false;
  isHoveringTooltipImage: number[] = [];
  itemBonusBenefits: number[] = [];
  itemBonusCollateral: number[] = [];
  bonus: boolean= false;
  collateral: boolean= false;
  isBusy :boolean = false;
  disabledEnemies = new Set<EnemyType>();
  
  isVisible: boolean[] = [false,false,false,false,false];
  hoveredAction: string | null = null;
  hoveredLogAction: string | null = null;

  remainingSeconds:number[] = [];
  timerDisplay: string[] = ["00:00","00:00","00:00"];
  timerFinished: boolean = false;
  timerInterval: any;
  map = 1;
  craftedItems: string[] = [];
  craftedItemsType: ItemType[] = [];
  TurnActionLog:string | null = null;
  TurnActionLogDescription:string | null = null;
  tooltipX: number = 0;
  tooltipY: number = 0;
  soundbutton: string = '';
  spriteButton : string = '';
  spriteHeros : string = '';
  spriteMissions_map1 : string = '';
  private countdownInterval: any;
  
  
  constructor(private authService: AuthService,
     private router: Router,
     private storageService: StorageService,
     private imageService: ImageService,
     private firebaseService: FirebaseService,
     private spritesService: SpritesService,
     private activatedRoute: ActivatedRoute,
     private sanitizer: DomSanitizer,
     private cdr: ChangeDetectorRef,
    
    ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getCurrentUser();
    this.soundbutton = await this.storageService.getSoundUrl('sonidos', 'zipclick.mp3');
    //funcion apra que funcione el moussehover en el log
(window as any).setHoveredAction = (value: string | null, event?: MouseEvent) => {
  if (value && turnActionStyles[value as TurnActionType]) {
    this.TurnActionLog = value;
    this.TurnActionLogDescription = turnActionStyles[value as TurnActionType].description;
    
    this.tooltipX = event?.clientX || 0;
    this.tooltipY = event?.clientY || 0;
  } else {
    this.TurnActionLog = null;
  }

  this.cdr.detectChanges();
};


   
    if (this.user) {
     
      await this.preloadUserData();
      this.reportUserLog();
      await this.imageService.preloadImages([
              'iconos/google.png',
              'fondos/desierto4.jpg',
              'iconos/add.png',
              'iconos/marco_pocion.png',
              'iconos/gold.png',
              'iconos/diamonds.png',
              'iconos/orb.png',
              'iconos/editCheck.png',
              'iconos/map_1.jpg',
              'iconos/map_2.jpg',
              'iconos/marco_description.png',
              'iconos/marco_item.png',
              'items/potion1.png',
              'items/potion2.png',
    
            ]);

} else {
      console.error("❌ No hay usuario cargado");
      //await this.preloadUserData();
    }
  }

  preloadUserData(){ 
      this.spriteButton = this.imageService.getCachedImage('iconos/botones_madera.png')!;
      this.spriteHeros = this.imageService.getCachedImage('iconos/heros.png')!;
      this.spriteMissions_map1 = this.imageService.getCachedImage('missions/missions_map1.png')!;
      this.imageUrls['FONDO'] = this.imageService.getCachedImage('fondos/desierto4.jpg')!;
      this.imageUrls['ADD'] = this.imageService.getCachedImage('iconos/add.png')!;
      this.imageUrls['MARCO_POCION'] = this.imageService.getCachedImage('iconos/marco_pocion.png')!;
      this.imageUrls['POCION1'] = this.imageService.getCachedImage('items/potion1.png')!;
      this.imageUrls['POCION2'] = this.imageService.getCachedImage('items/potion2.png')!;
      this.imageUrls['GOLD'] = this.imageService.getCachedImage('iconos/gold.png')!;
      this.imageUrls['DIAMONDS'] = this.imageService.getCachedImage('iconos/diamonds.png')!;
      this.imageUrls['ORB'] = this.imageService.getCachedImage('iconos/orb.png')!;
      this.imageUrls['EDIT'] = this.imageService.getCachedImage('iconos/editCheck.png')!;
      this.imageUrls['MAP1'] = this.imageService.getCachedImage('iconos/map_1.jpg')!;
      this.imageUrls['MAP2'] = this.imageService.getCachedImage('iconos/map_2.jpg')!;
      this.imageUrls['MARCO'] = this.imageService.getCachedImage('iconos/marco_description.png')!;
      this.imageUrls['MARCOITEM'] = this.imageService.getCachedImage('iconos/marco_item.png')!;
      this.imageUrls['BARRA_life_0'] = this.imageService.getCachedImage('bars/life0.png')!;this.imageUrls['BARRA_life_10'] = this.imageService.getCachedImage('bars/life10.png')!;this.imageUrls['BARRA_life_100'] = this.imageService.getCachedImage('bars/life100.png')!;this.imageUrls['BARRA_life_12.5'] = this.imageService.getCachedImage('bars/life12.5.png')!;this.imageUrls['BARRA_life_25'] = this.imageService.getCachedImage('bars/life25.png')!;this.imageUrls['BARRA_life_37.5'] = this.imageService.getCachedImage('bars/life37.5.png')!;this.imageUrls['BARRA_life_5'] = this.imageService.getCachedImage('bars/life5.png')!;this.imageUrls['BARRA_life_50'] = this.imageService.getCachedImage('bars/life50.png')!;this.imageUrls['BARRA_life_62.5'] = this.imageService.getCachedImage('bars/life62.5.png')!;this.imageUrls['BARRA_life_75'] = this.imageService.getCachedImage('bars/life75.png')!;this.imageUrls['BARRA_life_87.5'] = this.imageService.getCachedImage('bars/life87.5.png')!;this.imageUrls['BARRA_life_90'] = this.imageService.getCachedImage('bars/life90.png')!;
      this.imageUrls['BARRA_exp_0'] = this.imageService.getCachedImage('bars/exp0.png')!;this.imageUrls['BARRA_exp_10'] = this.imageService.getCachedImage('bars/exp10.png')!;this.imageUrls['BARRA_exp_100'] = this.imageService.getCachedImage('bars/exp100.png')!;this.imageUrls['BARRA_exp_12.5'] = this.imageService.getCachedImage('bars/exp12.5.png')!;this.imageUrls['BARRA_exp_25'] = this.imageService.getCachedImage('bars/exp25.png')!;this.imageUrls['BARRA_exp_37.5'] = this.imageService.getCachedImage('bars/exp37.5.png')!;this.imageUrls['BARRA_exp_5'] = this.imageService.getCachedImage('bars/exp5.png')!;this.imageUrls['BARRA_exp_50'] = this.imageService.getCachedImage('bars/exp50.png')!;this.imageUrls['BARRA_exp_62.5'] = this.imageService.getCachedImage('bars/exp62.5.png')!;this.imageUrls['BARRA_exp_75'] = this.imageService.getCachedImage('bars/exp75.png')!;this.imageUrls['BARRA_exp_87.5'] = this.imageService.getCachedImage('bars/exp87.5.png')!;this.imageUrls['BARRA_exp_90'] = this.imageService.getCachedImage('bars/exp90.png')!;
    

    this.getUserData(this.user.email);//sin esto no se ven los datos del usuario al recargar pero al quitar lo de arriba puede que existan problemas al crear usuarios
    this.getHerosData(true);this.getItemsData(false);this.getCraftersData();}
    
    
 
  getHerosData(showInfo: Boolean, heroId?: string): Promise<Hero[]> {
    return new Promise((resolve, reject) => {
      this.firebaseService.getHerosData(this.user.email, heroId).subscribe(
        (heroes) => {
          this.heroes= heroes.map(heroData => ({
            id: heroData.id,
            ID: heroData.ID as number,
            name: heroData.Name || 'Nombre Desconocido',
            type: heroData.Type || 'Tipo Desconocido',
            lifeBarIcon:this.getLifeBarImage(heroData.o0_life,heroData.maxHealth+heroData.Items_maxHealth),
            expBarIcon: this.getExpBarImage(heroData.o1_exp,heroData.maxExp),
            level: heroData.Level,
            actualLife: heroData.o0_life || 0,
            actualExp: heroData.o1_exp || 0,
            skill1: heroData["s1_skill1"] || 'no skill',
            skill2: heroData["s2_skill2"] || 'no skill',
            skill3: heroData["s3_skill3"] || 'no skill',
            skill4: heroData["s4_skill4"] || 'no skill',
            skill5: heroData["s5_skill5"] || 'no skill',
            Dbrutal: heroData.Dbrutal+heroData.Items_Dbrutal,
            Dletal: heroData.Dletal+heroData.Items_Dletal,
            Dmistic: heroData.Dmistic+heroData.Items_Dmistic,
            armor: heroData.armor+heroData.Items_armor,
            resistance: heroData.resistance+heroData.Items_resistance,
            accuracy: heroData.accuracy+heroData.Items_accuracy,
            evasion: heroData.evasion+heroData.Items_evasion,
            critic: heroData.critic+heroData.Items_critic,
            maxHealth: heroData.maxHealth+heroData.Items_maxHealth,
            maxExp: heroData.maxExp,
            bonus: heroData.Bonus,
            collateral: heroData.Collateral,
            state: heroData.State,
            x_boots: new Item (heroData.Boots[0]||"null", 1,"boots",0,heroData.BootsSubtype||"NULL","TYPE",[heroData.Boots[1],heroData.Boots[2],heroData.Boots[3],heroData.Boots[4],heroData.Boots[5],heroData.Boots[6],heroData.Boots[7],heroData.Boots[8],heroData.Boots[9]],heroData.BootsBonus||[0,0,0,0,0,0,0,0],heroData.BootsCollateral||[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]),
            x_chest: new Item (heroData.Chest[0]||"null", 1,"chest",0,heroData.ChestSubtype||"NULL","TYPE",[heroData.Chest[1],heroData.Chest[2],heroData.Chest[3],heroData.Chest[4],heroData.Chest[5],heroData.Chest[6],heroData.Chest[7],heroData.Chest[8],heroData.Chest[9]],heroData.ChestBonus||[0,0,0,0,0,0,0,0],heroData.ChestCollateral||[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]),
            x_gloves: new Item (heroData.Gloves[0]||"null", 1,"gloves",0,heroData.GlovesSubtype||"NULL","TYPE",[heroData.Gloves[1],heroData.Gloves[2],heroData.Gloves[3],heroData.Gloves[4],heroData.Gloves[5],heroData.Gloves[6],heroData.Gloves[7],heroData.Gloves[8],heroData.Gloves[9]],heroData.GlovesBonus||[0,0,0,0,0,0,0,0],heroData.GlovesCollateral||[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]),
            x_helmet: new Item (heroData.Helmet[0]||"null", 1,"helmet",0,heroData.HelmetSubtype||"NULL","TYPE",[heroData.Helmet[1],heroData.Helmet[2],heroData.Helmet[3],heroData.Helmet[4],heroData.Helmet[5],heroData.Helmet[6],heroData.Helmet[7],heroData.Helmet[8],heroData.Helmet[9]],heroData.HelmetBonus||[0,0,0,0,0,0,0,0],heroData.HelmetCollateral||[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]),
            x_jewel: new Item (heroData.Jewel[0]||"null", 1,"jewel",0,heroData.JewelSubtype||"NULL","TYPE",[heroData.Jewel[1],heroData.Jewel[2],heroData.Jewel[3],heroData.Jewel[4],heroData.Jewel[5],heroData.Jewel[6],heroData.Jewel[7],heroData.Jewel[8],heroData.Jewel[9]],heroData.JewelBonus||[0,0,0,0,0,0,0,0],heroData.JewelCollateral||[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]),
            x_weapon: new Item (heroData.Weapon[0]||"null", 1,"weapon",0,heroData.WeaponSubtype||"NULL","TYPE",[heroData.Weapon[1],heroData.Weapon[2],heroData.Weapon[3],heroData.Weapon[4],heroData.Boots[5],heroData.Weapon[6],heroData.Weapon[7],heroData.Weapon[8],heroData.Weapon[9]],heroData.WeaponBonus||[0,0,0,0,0,0,0,0],heroData.WeaponCollateral||[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]),
          }));

          if (showInfo) console.table(this.heroes);
          resolve(this.heroes);
          this.reviseTimer();
        },
        (error) => {
          console.error('❌ Error al obtener datos de los héroes:', error);
          reject(this.heroes);
        }
      );
    });
  }

    getItemsData(showInfo: Boolean, callback?: () => void): void {
  this.firebaseService.getItemsData(this.user.email, "").subscribe(
    (items) => {
      this.items = items.map(itemData => ({
        id: itemData.id,
        ID: itemData.ID,
        amount: itemData.amount || 0,
        grade: itemData.grade || 'F',
        name: itemData.name || 'item',
        price: itemData.price || 1,
        subtype: itemData.subtype || 'NOSUBTYPE',
        type: itemData.type || 1,
        icon: itemStyles[itemData.ID as ItemType]?.icon || '❓',
        attributes: [
          itemData.Dbrutal || 0, itemData.Dletal || 0, itemData.Dmistic || 0,
          itemData.armor || 0, itemData.resistance || 0, itemData.accuracy || 0,
          itemData.evasion || 0, itemData.critic || 0, itemData.maxHealth || 0
        ],
        bonusBenefits: itemData.itemBonus || [0, 0, 0, 0, 0, 0, 0, 0],
        bonusCollateral: itemData.itemCollateral || [0, 0, 0, 0, 0, 0, 0, 0],
        ItemsNeeds: [ItemType.NULL, ItemType.NULL, ItemType.NULL],
        ItemsAmountsNeeds: [0, 0, 0]
      }));

      this.pociones = this.items.filter(item => item.type === "POTION");

      if (showInfo) console.table(this.items);

      if (callback) callback(); // ← ✅ Se ejecuta si fue pasada
    },
    (error) => {
      console.error('❌ Error al obtener datos de los items:', error);
      if (callback) callback(); // ← ✅ También en caso de error
    }
  );
}

    getItemsEqip(showInfo: Boolean, type : string) { 
      this.itemsToEquip=[];
      this.firebaseService.getItemsData(this.user.email,type).subscribe(
        (items) => {
        
          this.itemsToEquip = items.map(itemData => ({
          id: itemData.id,
          ID: itemData.ID,
          amount: itemData.amount || 0,
          grade: itemData.grade || 'F',
          name: itemData.name || 'item',
          price: itemData.price || 1,
          subtype: itemData.subtype || 1,
          type: itemData.type || 1,
          icon: itemStyles[itemData.ID as ItemType]?.icon || '❓',
          attributes: [itemData.Dbrutal|| 0,itemData.Dletal|| 0,itemData.Dmistic|| 0,itemData.armor|| 0,itemData.resistance|| 0,itemData.accuracy|| 0,itemData.evasion|| 0,itemData.critic|| 0,itemData.maxHealth|| 0],
          bonusBenefits: itemData.itemBonus||[0,0,0,0,0,0,0,0],
          bonusCollateral: itemData.itemCollateral||[0,0,0,0,0,0,0,0],
          ItemsNeeds:[ItemType.NULL,ItemType.NULL,ItemType.NULL],
          ItemsAmountsNeeds:[0,0,0]
        }));
        if(showInfo){console.table(this.itemsToEquip);}
        }, 
        (error) => {
        console.error('❌ Error al obtener datos de los items:', error);
        }
      ); 
    }
    /*getPotions(showInfo: Boolean) { 
      this.pociones=[];
      this.firebaseService.getItemsData(this.user.email,"POTION").subscribe(
        (items) => {
        
          this.pociones = items.map(itemData => ({
          id: itemData.id,
          ID: itemData.ID,
          amount: itemData.amount || 0,
          grade: itemData.grade || 'F',
          name: itemData.name || 'item',
          price: itemData.price || 1,
          subtype: itemData.subtype || 1,
          type: itemData.type || 1,
          icon: itemStyles[itemData.ID as ItemType]?.icon || '❓',
          attributes: [itemData.Dbrutal|| 0,itemData.Dletal|| 0,itemData.Dmistic|| 0,itemData.armor|| 0,itemData.resistance|| 0,itemData.accuracy|| 0,itemData.evasion|| 0,itemData.critic|| 0,itemData.maxHealth|| 0],
          bonusBenefits: itemData.itemBonus||[0,0,0,0,0,0,0,0],
          bonusCollateral: itemData.itemCollateral||[0,0,0,0,0,0,0,0],
          ItemsNeeds:[ItemType.NULL,ItemType.NULL,ItemType.NULL],
          ItemsAmountsNeeds:[0,0,0]
        }));
        if(showInfo){console.table(this.itemsToEquip);}
        if(this.pociones[0]==null){
          this.pociones[0] == items[0];
          this.pociones[1] == items[1];
        }
        this.pocion = this.pociones[0].ID as ItemType;
        console.log("pociones: "+this.pociones[0].ID);
        }, 
        (error) => {
        console.error('❌ Error al obtener datos de los items:', error);
        }
      ); 
    }*/
    getItemsCraftData(showInfo: Boolean, subtype : string[], crafterLevel: number) { 
      this.itemsToCraft=[];
      this.firebaseService.getItemsCraftData(this.user.email,subtype,crafterLevel).subscribe(
        (items) => {
          this.itemsToCraft = items.map(itemData => ({
          ID: itemData.ID,
          amount: itemData.amount || 0,
          grade: itemData.grade || 'F',
          name: itemData.Name || 'item',
          price: itemData.price || 1,
          subtype: itemData.subtype || 1,
          type: itemData.type || 1,
          icon: itemStyles[itemData.ID as ItemType]?.icon || '❓',
          attributes: [itemData.Dbrutal|| 0,itemData.Dletal|| 0,itemData.Dmistic|| 0,itemData.armor|| 0,itemData.resistance|| 0,itemData.accuracy|| 0,itemData.evasion|| 0,itemData.critic|| 0,itemData.maxHealth|| 0],
          bonusBenefits: itemData.bonusBenefits||[0,0,0,0,0,0,0,0],
          bonusCollateral: itemData.bonusCollateral||[0,0,0,0,0,0,0,0],
          ItemsNeeds: [itemData.itemNeeds[0] as ItemType,itemData.itemNeeds[1] as ItemType,itemData.itemNeeds[2] as ItemType],
          ItemsAmountsNeeds: [itemData.itemAmountsNeeds[0],itemData.itemAmountsNeeds[1],itemData.itemAmountsNeeds[2]]
        }));
        if(showInfo){console.table(this.itemsToCraft);}
        }, 
        (error) => {
        console.error('❌ Error al obtener datos de los items:', error);
        }
      ); 
    }

    getCraftersData() { 
        this.firebaseService.getCraftersData(this.user.email).subscribe(
    (crafters) => {
      this.crafters = crafters.map(crafterData => ({
        ID: crafterData.ID|| "crafter",
        name: crafterData.type|| "crafter",
        type: crafterData.type as CrafterType,
        level: crafterData.level|| 0,
        icon: crafterStyles[crafterData.type as CrafterType]?.icon || '❓',
        expBarIcon: this.getExpBarImage(crafterData.exp,crafterData.maxExp),
        ableToCraft: crafterStyles[crafterData.type as CrafterType]?.ableToCraft || [""],
        actualExp:crafterData.exp|| 0,
        maxExp:crafterData.maxExp|| 0,          
      })); 
    },
    (error) => {
      console.error('❌ Error al obtener datos del crafter:', error);
    }
  );
    }

    getEnemyData() { 
        this.firebaseService.getEnemyData(this.enemyType!).subscribe(
    (response) => {
      this.enemyData = response.enemy;
      this.loot = [response.Item1||"null" as ItemType ,response.Item2||"null" as ItemType,response.Item3 as ItemType||"null"];
      this.lootProb = [response.probItem1||"0%" ,response.probItem2||"0%",response.probItem3||"0%"];
      this.enemySkills = [response.enemy.skill1 as TurnActionType,response.enemy.skill2 as TurnActionType, response.enemy.skill3 as TurnActionType,response.enemy.skill4 as TurnActionType,response.enemy.skill5 as TurnActionType,];
      //console.log('✅ Datos del enemigo obtenidos:', response.enemy);
    },
    (error) => {
      console.error('❌ Error al obtener datos del enemigo:', error);
    }
  );
  
  }

  async onHeroClick(hero: Hero) {
    this.state = "heroDetails";
    this.hero = hero;
    this.heroType = hero.type;
    this.heroNewname = hero.name;
    //this.pociones = this.items.filter(item => item.type === "POTION");

/*       this.pociones = [
  { ID: "ItemType.NULL",amount:1, grade:GradeType.F, name: "No named",price:0, type: "POTION",[0,0,0,0,0,0,0,0,0],  }, // o el objeto adecuado según tu modelo
  ...this.items.filter(item => item.type === "POTION")
];*/



if (this.pociones.length > 0) {
 this.pocion = ItemType.NULL;
  this.potionIndex = -1;
} else {
  //mostramos asi al principio un item nulo y cuando le de a siguiente sale la primera pocion.(se cargan las pociones)
  this.pocion = ItemType.NULL;
  this.potionIndex = -1;
}
    //this.getPotions(false);
    //console.log("pociones: "+this.pociones[0].ID);
    
    //this.enemyType = null;
    this.heroBackground = heroStyles[hero.type as HeroType]?.backgroundColor || '#f9f9f9';
    this.heroLongBackground = heroStyles[hero.type as HeroType]?.longBackground || '#f9f9f9';
    this.heroSkills = [hero.skill1 as TurnActionType,hero.skill2 as TurnActionType, hero.skill3 as TurnActionType,hero.skill4 as TurnActionType,hero.skill5 as TurnActionType,];
    this.isVisible = [false,false,false,false,false];  
  }
  async onItemClick(item: Item) {
    this.selectedAmount = 1;
    this.item = item;
    this.isVisible=[false,false,false,false,false];  
    this.checkItemRequirements(item);
    
  }

  checkItemRequirements(item: Item) {
  if (!this.item) return;
  const needs = item.ItemsNeeds.map(id => id.toString());
  const amounts = this.item.ItemsAmountsNeeds;
  const found = [false, false, false];
  for (const userItem of this.items) {
    const idx = needs.indexOf(userItem.ID);
    if (idx !== -1 && userItem.amount >= amounts[idx] * this.selectedAmount) {
      found[idx] = true;
    }
    if (found.every(Boolean)) break;
  }
  this.item1Have = found[0];
  this.item2Have = found[1];
  this.item3Have = found[2];

    this.item1 = item.ItemsNeeds[0];this.item1Amount = item.ItemsAmountsNeeds[0];
    this.item2 = item.ItemsNeeds[1];this.item2Amount = item.ItemsAmountsNeeds[1];
    this.item3 = item.ItemsNeeds[2];this.item3Amount = item.ItemsAmountsNeeds[2];
    console.log(this.item1Have,this.item2Have,this.item3Have);
  
}
  async onCrafterClick(crafter: Crafter) {
    this.state = "crafterDetails";
    this.crafter = crafter;
    this.item = null;
    this.getItemsCraftData(false,crafter.ableToCraft,crafter.level);
  }
  async onEnemyClick(type: EnemyType) {
    this.state = 'map';
    this.enemyType = type;
    this.mostrarBattleGif = false;
    this.enemyBackground = enemyStyles[type]?.backgroundColor || '#f9f9f9';
    this.enemyLongBackground = enemyStyles[type]?.longBackground || '#f9f9f9';
    this.getEnemyData();
  }
  async onBattleClick(hero: Hero) {
    this.mostrarBattleGif = false;
    this.state = "map";
    this.clip = 'clipBa'
  }
  async onSellItemClick(item: Item) {
    this.selectedTotal = this.selectedAmount*item.price;
    console.log ("se han vendido: ", this.selectedAmount + " del item: ",item.ID);
    console.log ("ganancia de dinero: ",this.selectedTotal);
    const data = {
      email:this.user.email,
      itemID:item.ID,
      amountSell: this.selectedAmount,
    }
   
    this.firebaseService.sellItem(data).subscribe(
      (response) => { console.log('Response:', response.message);this.soldEffect = true;this.getItemsData(false);this.onMainClipClick("clipSto"),this.getUserData(this.user.email);},
      (error) => {
        console.error('Error al modificar items:', error);
      }
    ); 
    

  // Elimina el efecto después de 1 segundo
  setTimeout(() => {
    this.soldEffect = false;
  }, 1000);
    
  }
  
  changeHero(direction: 'next' | 'prev') {
    if (!this.hero || this.heroes.length === 0) return;
    const currentIndex = this.heroes.findIndex(h => h.id === this.hero!.id);
    if (currentIndex === -1) return;
    let newIndex: number;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % this.heroes.length;
    } else {
      newIndex = (currentIndex - 1 + this.heroes.length) % this.heroes.length;
    }
    const newHero = this.heroes[newIndex];
    this.onHeroClick(newHero);
  }
    changeMap(direction: 'next' | 'prev') {
    if (direction === 'next') {
      this.map++;
    }
    else{
      this.map--;
    }
    console.log("MAP: "+this.map)
  }
  changeHeroName(){
    const heroReference = `${this.hero!.id.toString().padStart(2, '0')}`;
    const data = {
      reference:heroReference,
      newName:this.heroNewname,
      email:this.user.email
    }
    this.firebaseService.changeHeroName(data).subscribe(
      (response) => {
        console.log('✅ ', response.message),this.hero!.name=this.heroNewname,this.getHerosData(false);
      },
      (error) => {
        console.error('❌ error al cambiar el nombre:', error);
      }
    );
  }

  async onShopClick() {
    this.state = "heroShop";
    this.heroDescription = heroStyles[HeroType.GUERRERO]?.description;
    this.hero = null;
  }

  async onHeroShopHover( heroType: HeroType) {
    this.heroType= heroType;
    this.heroDescription = heroStyles[heroType as HeroType]?.description || 'No description';
  }
  async onHeroShopClick( heroType: HeroType) {
    this.heroType= heroType;
    this.heroDescription = heroStyles[heroType as HeroType]?.description || 'No description';
    this.addHero();
  }
  async onMainClipClick(clip: string){
    this.state = "";
    this.mainClip = clip;
    if(clip=="clipSto"){
      this.state = "itemDetails";
      this.item = null;
      this.getItemsData(true);
    }
  }
  async onClipClick(clip: string){
    this.clip = clip;
    }
  async onStartBattleClick(battleHero:Hero , index:number) {
    const heroReference = `${battleHero.id.toString().padStart(2, '0')}`;
   this.firebaseService.battle(battleHero,battleHero.state[0] as EnemyType,this.user.email,heroReference).subscribe(
      async (response) => { 
        const enumValues = Object.values(TurnActionType) as string[];
        const regex = new RegExp(`\\b(${enumValues.join('|')})\\b`, 'g');

        this.sanitizedLogDetail = this.sanitizer.bypassSecurityTrustHtml(
          response.message
            .replace(/\n/g, '<br>')
            .replace(/Critico!!/g, '<span style="color:rgb(255, 76, 76);font-weight: bold;">Critico!!</span>')
            .replace(/Evade!!/g, '<span style="color:rgb(132, 99, 253);font-weight: bold;">Evadido!!</span>')
            .replace(regex, (_match: string, action: string) => {
              return `<span style="color: #3b1e0f;cursor: pointer;background: #edb48b;border-radius: 8px;padding: 1px;font-size: 13px;padding-inline: 10px;" onmouseenter="setHoveredAction('${action}', event)"onmouseleave="setHoveredAction(null)">${action}</span>`;
            })
            .replace(/Turno (\d+):/g, (_match: string, turno: string) => {
              const key = `TURNO ${turno}`;
              return `<br><div style="text-align: center;"><span alt="Turno ${turno}" style="display: inline-block;position: relative;padding: 5px 100px;font-size: 18px; font-family: 'MedievalSharp', serif;color: #3b1e0f;background: linear-gradient(170deg, #874016, #f5cc98);border: 2px solid #3b1e0f;font-weight: bold;box-shadow: 0 4px 10px rgba(0,0,0,0.4);clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);z-index: 1;">${key}</span></div>`;
            })  
              //esto para incluir imagenes segun el turno.
            /*.replace(/Turno (\d+):/g, (_match: string, turno: string) => {
              const key = `POCION${turno}`;
              const imgSrc = this.imageUrls[key] || '';
              return `<br><img src="${imgSrc}" alt="Turno ${turno}" style="height: 30px;"><br>`;
            })*/
        );

        console.log('✅ BATTLE',response.message);
        console.log('REWARD',response.reward);
        
        let gifName : string = "";
        
        if (response.result==true){
          gifName = enemyStyles[battleHero.state[0] as EnemyType]?.gifVictory;
          this.item1 = response.reward[0];
          this.item2 = response.reward[1];
          this.item3 = response.reward[2];
          this.getItemsData(false);
        }
        else{
          gifName = enemyStyles[battleHero.state[0] as EnemyType]?.gifDefeat;
          this.item1 = ItemType.NULL;
          this.item2 = ItemType.NULL;
          this.item3 = ItemType.NULL;
        }
        this.enemyType = battleHero.state[0] as EnemyType;
        this.showBattleGif(gifName);
        battleHero.state[0] = "";
        this.getUserData(this.user.email);
        await this.getHerosData(false);
        this.onHeroClick(this.heroes[index]);
        },
      (error) => {console.error('Error', error);} 
    )}

  addHero() {
    const heroesSize = this.heroes.length+1;
    const heroName = `hero${heroesSize.toString().padStart(2, '0')}`;
    const data = {
      email:this.user.email,
      ID:heroesSize,
      Name: heroName,
      Type:this.heroType,
    }
    this.firebaseService.addHero(data).subscribe(
      async (response) => { console.log('✅ AddHero:',this.heroType+" adquirido por "+this.user.email),this.getUserData(this.user.email),this.showAddHeroGif();},
      (error) => {
        console.error('Error al crear heroe:', error);
      }
    );  
    
  }

  reportUserLog() {
    let logDate = new Date();
    const data = {
      email: this.user.email,
      LogDate: logDate,
    };
    this.firebaseService.addUserLog(data).subscribe(
      (response) => { console.log('✅ Log:',this.user.email)},
      (error) => {
        console.error('Error conectando al backend', error);
        console.error('Error al crear Log:', error);
      }
    );  
  }

  async getUserData(email: string) {
  this.authService.getUserData(email).subscribe(
    (data) => {
      this.userData = data.data;
      this.gold =this.userData.gold;
      this.userMap1=[data.dataMap1.M_FOREST1|| 0,data.dataMap1.M_GOLEM1|| 0,data.dataMap1.M_ENT1|| 0,data.dataMap1.M_JABALI1|| 0,data.dataMap1.M_JABALI2|| 0,data.dataMap1.M_JABALI3|| 0,data.dataMap1.M_JABALI4|| 0,data.dataMap1.M_JABALI5|| 0,data.dataMap1.M_JABALI6|| 0,data.dataMap1.M_JABALI7|| 0];
      this.userMap2=[data.dataMap2.M_PEZ2|| 0];
      
      console.log('✅ Datos del usuario obtenidos:', this.userData);
      console.log('✅ Datos del mapa1:', this.userMap1);console.log('✅ Datos del mapa2:', this.userMap2);
    },
    (error) => {
      console.error('❌ Error al obtener datos del usuario:', error);
    }
  );
}
triggerShineEffect(where:any) {
  if(where==6){this.showNameShine = false;
    setTimeout(() => this.showNameShine = true, 10);
    setTimeout(() => this.showNameShine = false, 1100);
  }
  else{this.showSkillShine[where] = false;
    setTimeout(() => this.showSkillShine[where] = true, 10);
    setTimeout(() => this.showSkillShine[where] = false, 1100);
  }
}

async showAddHeroGif() {
  if (this.mostrarHeroGif) return;

  this.mostrarHeroGif = true;
  this.desapareciendo = false;

  setTimeout(() => {
    this.desapareciendo = true;
    setTimeout(() => {
      this.mostrarHeroGif = false;
    }, 500);
  }, 2500);
}
async showBattleGif(gifName: string) {
  this.gifBattleUrl = await this.imageService.getImageUrl(gifName);
  this.gifState = this.gifBattleUrl;
  this.mostrarBattleGif = true;
  this.desapareciendo = false;
  if(this.enemyType!=null){this.disabledEnemies.delete(this.enemyType);this.enemyType = null;}
  setTimeout(() => {
    this.desapareciendo = true;
    setTimeout(() => {
    },  1000);
  }, 2500);
}

async exitBattleGif() { 
  this.mostrarBattleGif = false;
  this.gifBattleUrl = null;
  this.getHerosData(false);
}
async logBattleGif() { 
  this.gifBattleUrl = null;
  this.getHerosData(false);
}
async rewardsBattleGif() { 
  this.gifBattleUrl = this.gifState;
  this.getHerosData(false);
}

equipHero(ranure: string, itemOld: string, itemNew: Item) {
  const data = {
    email: this.user.email,
    hero: this.hero!.id,
    ranure: ranure,
    itemOld: itemOld,
    itemNew: itemNew.ID,
  };

  this.isBusy = true; // Bloquea interacción

  this.firebaseService.equipHero(data).subscribe(
    async (response) => {
      console.log('✅', response.equip);
      const updatedHeroes = await this.getHerosData(false);
      const updatedHero = updatedHeroes.find(h => h.id === this.hero!.id);
      if (updatedHero) {
        this.hero = updatedHero;

        this.getItemsEqip(false, ranure.toUpperCase());
        this.onHeroClick(this.hero);

        // Esperar 2 segundos antes de permitir interacción
        setTimeout(() => {
          this.isBusy = false;
        }, 1000);
      }
    },
    (error) => {
      console.error('Error al equipar héroe:', error);
      this.isBusy = false;
    }
  );
}

craftItem(itemAmount:number){
  //console.log("gold : ",this.gold);
  //console.log("price : ",this.item.price);
    const data = {
    email: this.user.email,
    crafterID: this.crafter.ID,
    itemAmount: itemAmount,
    itemID: this.item.ID,
    item1GradeRef:this.item.ItemsNeeds[0].slice(-1),
    item2GradeRef:this.item.ItemsNeeds[1].slice(-1),
    item3GradeRef:this.item.ItemsNeeds[2].slice(-1),
  };
  this.firebaseService.craftItem(data).subscribe(
    async (response) => {
      console.log("crafted: ",response.message);
      console.log("crafted: ",response.itemsCrafted);
      this.showCraftedItems(response.itemsCrafted);
      this.soldEffect = true;this.getUserData(this.user.email);this.item=null;this.getItemsData(false);this.getCraftersData();
    },
    (error) => {
      console.error('Error al craftear item:', error);
    }
  );
  
  setTimeout(() => {
    this.soldEffect = false;
  }, 1000);
  setTimeout(() => {
    this.onMainClipClick("clipSto");
  }, 2000);
}










startBattleTimer(enemy:EnemyType) {
  this.disabledEnemies.add(enemy);
this.heroes[this.hero!.ID as number-1].state[1]=100;
this.enemyType = null;
 const heroReference = `${this.hero!.id.toString().padStart(2, '0')}`;
 const data = {
      email: this.user.email,
      heroReference: heroReference,
      enemy: enemy.toString(),
      admin: this.admin
    };
this.firebaseService.updateHeroState(data).subscribe(
  async (response) => {
    setTimeout(async () => {
      await this.getHerosData(false);
      console.log("state cambiado: "+response);
      this.reviseTimer();
    }, 100);
  },
  (error) => {
    console.error('Error', error);
  }
);
}




reviseTimer() {
  const now = new Date();
  this.remainingSeconds = [];

  for (let i = 0; i < this.heroes.length; i++) {
    const firestoreTimestamp = this.heroes[i].state[1];
    const firestoreEnemytamp = this.heroes[i].state[0];

    if(firestoreEnemytamp!=""){this.disabledEnemies.add(firestoreEnemytamp as EnemyType);}

    if (firestoreTimestamp && firestoreTimestamp.seconds) {
      const futureDate = new Date(firestoreTimestamp.seconds * 1000);
      if (futureDate > now) {
        const diffMs = futureDate.getTime() - now.getTime();
        const restTimeTotalSec = Math.floor(diffMs / 1000);

        this.remainingSeconds[i] = restTimeTotalSec;
        const min = Math.floor(restTimeTotalSec / 60);
        const sec = restTimeTotalSec % 60;
        this.timerDisplay[this.heroes[i].ID] = `${min}:${sec.toString().padStart(2, '0')}`;
      }
      else{
        this.heroes[i].state[1]="";
        this.timerDisplay[i+1] = "";
      }
    }
  }

  this.startTimers(); // <<<<< Añade esto
}
startTimers() {
  if (this.timerInterval) {
    clearInterval(this.timerInterval); // para evitar múltiples intervalos
  }

  this.timerInterval = setInterval(() => {
    for (let i = 0; i < this.remainingSeconds.length; i++) {
      if (this.remainingSeconds[i] > 0) {
        this.remainingSeconds[i]--;

        const min = Math.floor(this.remainingSeconds[i] / 60);
        const sec = this.remainingSeconds[i] % 60;

        const heroId = this.heroes[i].ID;
        this.timerDisplay[heroId] = `${min}:${sec.toString().padStart(2, '0')}`;
      } else {
        // Si ya llegó a 0, que diga 0:00 o lo que quieras mostrar
        const heroId = this.heroes[i]?.ID;
        this.heroes[i].state[1]=""
        this.timerDisplay[heroId] = "";
      }
    }
  }, 1000);
}
getCraftTotal(price: number, selectedAmount: number): number {
  const unitPrice = Math.round(price / 10);
  return unitPrice * selectedAmount;
}
changeHeroSkill(skillKey: 's1_skill1' | 's2_skill2' | 's3_skill3' | 's4_skill4' | 's5_skill5', newSkill: string): void {
    const heroReference = `${this.hero!.id.toString().padStart(2, '0')}`;
    const data = {
    reference:heroReference,
    email: this.user.email,
    skillCollection: skillKey,
    newSkill: newSkill
  };
    this.firebaseService.changeHeroSkill(data).subscribe(
    async (response) => {
      console.log("crafted: "+response);
      this.soldEffect = true;this.getUserData(this.user.email);this.item=null;this.getItemsData(false);
    },
    (error) => {
      console.error('Error al craftear item:', error);
    }
  );
}
showCraftedItems(items: string[]) {
  for(let i=0;i<items.length;i++){
    this.craftedItemsType[i] = items[i] as ItemType;
  }
  

  // Ocultarlos después de 3s
  setTimeout(() => {
    this.craftedItemsType = [];
  }, 3000);
}

getStyle(index: number, total: number): { [key: string]: string } {
  const angle = (index / total) * 2 * Math.PI;
  const radius = 120; // más distancia entre los items
  const x = Math.round(Math.cos(angle) * radius);
  const y = Math.round(Math.sin(angle) * radius);

  return {
    '--tx': `${x}px`,
    '--ty': `${y}px`
  };
}
getLifeBarImage(actualLife:number, maxLife:number): string {
  const percent = (actualLife / maxLife) * 100;
  if (percent <= 0) return this.imageUrls['BARRA_life_0'];
  else if (percent <= 5) return this.imageUrls['BARRA_life_5'];
  else if (percent <= 10) return this.imageUrls['BARRA_life_10'];
  else if (percent <= 12.5) return this.imageUrls['BARRA_life_12.5'];
  else if (percent <= 25) return this.imageUrls['BARRA_life_25'];
  else if (percent <= 37.5) return this.imageUrls['BARRA_life_37.5'];
  else if (percent <= 50) return this.imageUrls['BARRA_life_50'];
  else if (percent <= 62.5) return this.imageUrls['BARRA_life_62.5'];
  else if (percent <= 75) return this.imageUrls['BARRA_life_75'];
  else if (percent <= 87.5) return this.imageUrls['BARRA_life_87.5'];
  else if (percent <= 90) return this.imageUrls['BARRA_life_90'];
  else {return this.imageUrls['BARRA_life_100'];}
}
getExpBarImage(actualExp:number, maxExp:number): string {
  const percent=(actualExp/maxExp) * 100;
  if (percent <= 0) return this.imageUrls['BARRA_exp_0'];
  else if (percent <= 5) return this.imageUrls['BARRA_exp_5'];
  else if (percent <= 10) return this.imageUrls['BARRA_exp_12.5'];//la de 10 es muy parecida a la de 5 por eso pongo esa
  else if (percent <= 12.5) return this.imageUrls['BARRA_exp_12.5'];
  else if (percent <= 25) return this.imageUrls['BARRA_exp_25'];
  else if (percent <= 37.5) return this.imageUrls['BARRA_exp_37.5'];
  else if (percent <= 50) return this.imageUrls['BARRA_exp_50'];
  else if (percent <= 62.5) return this.imageUrls['BARRA_exp_62.5'];
  else if (percent <= 75) return this.imageUrls['BARRA_exp_75'];
  else if (percent <= 87.5) return this.imageUrls['BARRA_exp_87.5'];
  else if (percent <= 90) return this.imageUrls['BARRA_exp_90'];
  else {return this.imageUrls['BARRA_exp_100'];}
}
checkBonus(item: Item){
  console.log("se ha seleccionado un "+ item.subtype +" con un "+this.hero!.type);
  if (this.hero!.bonus.includes(item.subtype)) {
    this.bonus = true;
    //console.log("SI debe aparecer el bonus");
  }
  else {
    this.bonus = false;
    //console.log("NO debe aparecer el bonus");
  }
  if (this.hero!.collateral.includes(item.subtype)) {
    this.collateral = true;
    //console.log("SI debe aparecer el collateral");
  }
  else {
    this.collateral = false;
    //console.log("NO debe aparecer el collateral");
  }

}
nextpotion(index: number, increment: number) {
  if((index + increment) < this.pociones.length && (index + increment) >= 0){
  const item = this.pociones[index + increment];
  this.potionIndex = this.potionIndex + increment
  if (item) {
    this.pocion = item.ID as ItemType;
  }}
}
usePotion(){
    if(this.pocion!=ItemType.NULL){
      console.log ("pocion usada: ", this.pocion);
      this.isLoadingPociones = true;
    const heroReference = `${this.hero!.id.toString().padStart(2, '0')}`;
    const data = {
      email:this.user.email,
      heroReference:heroReference,
      itemID:this.pocion,
    }
   
    this.firebaseService.usePotion(data).subscribe(
      async (response) => { console.log('Response:', response.message);
        const updatedHeroes = await this.getHerosData(false);
      const updatedHero = updatedHeroes.find(h => h.id === this.hero!.id);
      if (updatedHero) {
        this.hero = updatedHero;
        this.onHeroClick(this.hero);
      }
        this.getHerosData(true);
        this.getItemsData(false, () => {
  this.pocion = ItemType.NULL;
  this.potionIndex = -1;
  this.isLoadingPociones = false;
  
});this.isLoadingPociones = false;
},
      (error) => {
        console.error('Error al modificar items:', error);
      },
    ); 
    
  }
}

  playButtonSound() {
  const clickSound = new Audio(this.soundbutton); // URL de tu sonido en Firebase
  clickSound.volume = 0.7; // Volumen del efecto
  clickSound.play();
  }

getSprite(name: string, spriteType: string): { [key: string]: string } | undefined {
  if(spriteType== "hero"){
    return this.spritesService.getStyleByName(name, this.spriteHeros, spriteType);
  }
  if(spriteType== "mission"){
    return this.spritesService.getStyleByName(name, this.spriteMissions_map1, spriteType);
  }
  else{
    return this.spritesService.getStyleByName(name, this.spriteButton, spriteType);
  }
  
}









}