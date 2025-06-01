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
import { HeroType,heroStyles } from '../enum/heroType';
import { EnemyType,enemyStyles } from '../enum/enemyType';
import { ItemType,itemStyles } from '../enum/itemType';
import { GradeType, gradeStyles } from '../enum/gradeType';
import { TurnActionType, turnActionStyles } from '../enum/turnActionType';
import { ImageService } from '../services/image.service';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';


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
  user: any = {};
  title ='sin título';
  heroes: Hero[] = [];
  items: Item[] = [];
  itemsToEquip: Item[] = [];
  heroTypes = Object.values(HeroType) as HeroType[];
  userData: any | null = null;//anteriormente no era any era User, pero gold no era propiedad
  enemyData: any | null = null;
  imageUrls: { [key: string]: string } = {};
  state: string = '';
  mainClip: string = 'clipHo';
  clip: string = 'clipBa';
  showShine = false;

  hero: any;
  item: any;
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
  enemySkills:  TurnActionType[] = [];
  heroNewname:string = '';
  gold: number = 0;
  selectedAmount = 1;
  selectedTotal = 0;
  
  item1 = ItemType.NULL;
  item2 = ItemType.NULL;
  item3 = ItemType.NULL;
  

  gifHeroUrl: string | null = null;
  gifBattleUrl: string | null = null;
  mostrarHeroGif= false;
  mostrarBattleGif= false;
  desapareciendo = false;
  soldEffect: boolean = false;
  isFocused1 = false;
  isFocused2 = false;
  isHoveringTooltipImage: number[] = [];
  isBusy :boolean = false;
  


//timerDisplay: string[] = [];
timerDisplay: string = '02:00';
timerFinished: boolean = false;
private countdownInterval: any;
  
  
  constructor(private authService: AuthService,
     private router: Router,
     private storageService: StorageService,
     private imageService: ImageService,
     private firebaseService: FirebaseService,
     private activatedRoute: ActivatedRoute,
    
    ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getCurrentUser();
    
   
    if (this.user) {
     
      await this.preloadUserData();
      this.reportUserLog();
      this.imageUrls['FONDO'] = this.imageService.getCachedImage('fondos/desierto4.jpg')!;
      this.imageUrls['ADD'] = this.imageService.getCachedImage('iconos/add.png')!;
      this.imageUrls['GOLD'] = this.imageService.getCachedImage('iconos/gold.png')!;
      this.imageUrls['EDIT'] = this.imageService.getCachedImage('iconos/editCheck.png')!;
      this.imageUrls['MAP1'] = this.imageService.getCachedImage('iconos/map_1.jpg')!;
      this.imageUrls['MARCO'] = this.imageService.getCachedImage('iconos/marco_description.png')!;
      this.imageUrls['MARCO2'] = this.imageService.getCachedImage('iconos/marco_descripcion2.png')!;
      this.imageUrls['BOTON_madera_1'] = this.imageService.getCachedImage('iconos/boton_madera_1.png')!;
      this.imageUrls['BOTON_madera_4'] = this.imageService.getCachedImage('iconos/boton_madera_4.png')!;
      this.imageUrls['BOTON_madera_5'] = this.imageService.getCachedImage('iconos/boton_madera_5.png')!;
      this.imageUrls['BOTON_madera_8'] = this.imageService.getCachedImage('iconos/boton_madera_8.png')!;
      this.imageUrls['BOTON_madera_9'] = this.imageService.getCachedImage('iconos/boton_madera_9.png')!;
    } else {
      console.error("❌ No hay usuario cargado");
      await this.preloadUserData();
    }
  }

  preloadUserData(){ 

    //NO BORRAR sin antes probar a crear usuario
    /*this.activatedRoute.queryParams
    .pipe(first(params => params['email'] !== undefined && params['email'].trim() !== ''))
    .subscribe(params => {
      const email = params['email'];
      this.getUserData(email);
      
    });*/
    this.getUserData(this.user.email);//sin esto no se ven los datos del usuario al recargar pero al quitar lo de arriba puede que existan problemas al crear usuarios
    this.getHerosData(true);this.getItemsData(false, "");}
    
getHerosData(showInfo: Boolean, heroId?: string): Promise<Hero[]> {
  return new Promise((resolve, reject) => {
    this.firebaseService.getHerosData(this.user.email, heroId).subscribe(
      (heroes) => {
        this.heroes= heroes.map(heroData => ({
          id: heroData.id,
          name: heroData.Name || 'Nombre Desconocido',
          type: heroData.Type || 'Tipo Desconocido',
          icon: heroStyles[heroData.Type as HeroType]?.icon || '❓',
          level: heroData.Level,
          actualLife: heroData["o0_life"] || '0',
          actualExp: heroData["o1_exp"] || '0',
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
          state: heroData.State,
          x_boots: new Item (heroData.Boots[0]||"NULL", 1,"boots",0,"SUBTYPE","TYPE",[heroData.Boots[1],heroData.Boots[2],heroData.Boots[3],heroData.Boots[4],heroData.Boots[5],heroData.Boots[6],heroData.Boots[7],heroData.Boots[8]]),
          x_chest: new Item (heroData.Chest[0]||"NULL", 1,"chest",0,"SUBTYPE","TYPE",[heroData.Chest[1],heroData.Chest[2],heroData.Chest[3],heroData.Chest[4],heroData.Chest[5],heroData.Chest[6],heroData.Chest[7],heroData.Chest[8]]),
          x_gloves: new Item (heroData.Gloves[0]||"NULL", 1,"gloves",0,"SUBTYPE","TYPE",[heroData.Gloves[1],heroData.Gloves[2],heroData.Gloves[3],heroData.Gloves[4],heroData.Gloves[5],heroData.Gloves[6],heroData.Gloves[7],heroData.Gloves[8]]),
          x_helmet: new Item (heroData.Helmet[0]||"NULL", 1,"helmet",0,"SUBTYPE","TYPE",[heroData.Helmet[1],heroData.Helmet[2],heroData.Helmet[3],heroData.Helmet[4],heroData.Helmet[5],heroData.Helmet[6],heroData.Helmet[7],heroData.Helmet[8]]),
          x_jewel: new Item (heroData.Jewel[0]||"NULL", 1,"jewel",0,"SUBTYPE","TYPE",[heroData.Jewel[1],heroData.Jewel[2],heroData.Jewel[3],heroData.Jewel[4],heroData.Jewel[5],heroData.Jewel[6],heroData.Jewel[7],heroData.Jewel[8]]),
          x_weapon: new Item (heroData.Weapon[0]||"NULL", 1,"weapon",0,"SUBTYPE","TYPE",[heroData.Weapon[1],heroData.Weapon[2],heroData.Weapon[3],heroData.Weapon[4],heroData.Boots[5],heroData.Weapon[6],heroData.Weapon[7],heroData.Weapon[8]]),
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


    getItemsData(showInfo: Boolean, type : string) { 
      this.itemsToEquip=[];
    this.firebaseService.getItemsData(this.user.email,type).subscribe(
      (items) => {
        
        this.items = items.map(itemData => ({
          id: itemData.id,
          ID: itemData.ID,
          amount: itemData.amount || 0,
          grade: itemData.grade || 'F',
          name: itemData.name || 'item',
          price: itemData.price || 1,
          subtype: itemData.subtype || 1,
          type: itemData.type || 1,
          icon: itemStyles[itemData.ID as ItemType]?.icon || '❓',
          attributes: [itemData.Dbrutal|| 0,itemData.Dletal|| 0,itemData.Dmistic|| 0,itemData.armor|| 0,itemData.resistance|| 0,itemData.accuracy|| 0,itemData.evasion|| 0,itemData.critic|| 0,itemData.maxHealth|| 0]
        }));
        if(showInfo){console.table(this.items);}
        if(type!=""){this.itemsToEquip = this.items;}
        
  
      },
      
      (error) => {
        console.error('❌ Error al obtener datos de los items:', error);
      }
    );
    
  
}
    getEnemyData() { 
        this.firebaseService.getEnemyData(this.enemyType!).subscribe(
    (response) => {
      this.enemyData = response.enemy;
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
    //this.chest.ID = hero.x_chest;
    /*this.boots = hero.x_boots;
    this.chest = hero.x_chest;
    this.gloves = hero.x_gloves;
    this.helmet = hero.x_helmet;
    this.jewel = hero.x_jewel;
    this.weapon = hero.x_weapon;*/
    /*this.boots.ID = hero.x_boots as string ;
    this.boots.icono = itemStyles[ItemType.ITEM_00010].icon;
    this.chest.ID = hero.x_chest as string ;
    this.chest.icon = itemStyles[ItemType.ITEM_00010].icon;
    this.gloves.ID = hero.x_gloves as string ;
    this.gloves.icon = itemStyles[ItemType.ITEM_00010].icon;
    this.helmet.ID = hero.x_helmet as string ;
    this.helmet.icon = itemStyles[ItemType.ITEM_00010].icon;
    this.jewel.ID = hero.x_jewel as string ;
    this.jewel.icon = itemStyles[ItemType.ITEM_00010].icon;
    this.weapon.ID = hero.x_weapon as string ;
    this.weapon.icono = itemStyles[ItemType.ITEM_00010].icon;*/
    this.heroNewname = hero.name;
    this.enemyType = null;
    this.heroBackground = heroStyles[hero.type as HeroType]?.backgroundColor || '#f9f9f9';
    this.heroLongBackground = heroStyles[hero.type as HeroType]?.longBackground || '#f9f9f9';



    const firestoreTimestamp = this.heroes[1].state[1];

        if (firestoreTimestamp && firestoreTimestamp.seconds) {
          const futureDate = new Date(firestoreTimestamp.seconds * 1000);
          console.log("✅ Fecha convertida:", futureDate);
        } else {
          console.log("❌ Formato de fecha no válido:", firestoreTimestamp);
        }
  }
  async onItemClick(item: Item) {
    this.selectedAmount = 1;
    this.item = item; 
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
      (response) => { console.log('Response:', response.message);this.soldEffect = true;this.getItemsData(false,"");this.onMainClipClick("clipSto"),this.getUserData(this.user.email);},
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
    const currentIndex = this.heroes.findIndex(h => h.id === this.hero.id);
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
  changeHeroName(){
    const heroReference = `${this.hero.id.toString().padStart(2, '0')}`;
    const data = {
      reference:heroReference,
      newName:this.heroNewname,
      email:this.user.email
    }
    this.firebaseService.changeHeroName(data).subscribe(
      (response) => {
        console.log('✅ ', response.message),this.hero.name=this.heroNewname,this.getHerosData(false);
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
      this.getItemsData(true,"");
    }
  }
  async onClipClick(clip: string){
    this.clip = clip;
    }
  async onStartBattleClick(battleHero:Hero) {
    const heroReference = `${battleHero.id.toString().padStart(2, '0')}`;
   this.firebaseService.battle(battleHero,battleHero.state[0] as EnemyType,this.user.email,heroReference).subscribe(
      async (response) => { 
        console.log('✅ BATTLE',response.message);
        console.log('REWARD',response.reward);
        let gifName : string = "";
        if (response.result==true){
          gifName = enemyStyles[battleHero.state[0] as EnemyType]?.gifVictory;
          this.item1 = response.reward[0];
          this.item2 = response.reward[1];
          this.item3 = response.reward[2];
          this.getItemsData(false, "");
        }
        else{
          gifName = enemyStyles[battleHero.state[0] as EnemyType]?.gifDefeat;
          this.item1 = ItemType.NULL;
          this.item2 = ItemType.NULL;
          this.item3 = ItemType.NULL;
        }
        this.showBattleGif(gifName);
        battleHero.state[0] = "";
        },
      (error) => {console.error('Error', error);} 
    )}

  addHero() {
    const heroesSize = this.heroes.length+1;
    const heroName = `hero${heroesSize.toString().padStart(2, '0')}`;
    const gif = heroStyles[this.heroType as HeroType].gif;
    const data = {
      email:this.user.email,
      ID:heroesSize,
      Name: heroName,
      Type:this.heroType,
    }
    this.firebaseService.addHero(data).subscribe(
      async (response) => { console.log('✅ AddHero:',this.heroType+" adquirido por "+this.user.email),this.getUserData(this.user.email),this.showAddHeroGif(gif)},
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
      console.log('✅ Datos del usuario obtenidos:', this.userData);
    },
    (error) => {
      console.error('❌ Error al obtener datos del usuario:', error);
    }
  );
}
triggerShineEffect() {
  this.showShine = false;
  setTimeout(() => this.showShine = true, 10);  // fuerza re-aplicación
  setTimeout(() => this.showShine = false, 1100);  // dura más que la animación
}

async showAddHeroGif(gifName: string) {
  if (this.mostrarHeroGif) return; // evitar clics múltiples mientras se muestra

  this.gifHeroUrl = await this.imageService.getImageUrl(gifName);
  this.mostrarHeroGif = true;
  this.desapareciendo = false;

  setTimeout(() => {
    this.desapareciendo = true;
    setTimeout(() => {
      this.mostrarHeroGif = false;
      this.gifHeroUrl = null;
    }, 500);
  }, 2500);
  this.getHerosData(false);
}
async showBattleGif(gifName: string) {
  this.gifBattleUrl = await this.imageService.getImageUrl(gifName);
  this.mostrarBattleGif = true;
  this.desapareciendo = false;

  setTimeout(() => {
    this.desapareciendo = true;
    setTimeout(() => {
    },  1000);
  }, 2500);
}

async exitBattleGif() { 
  this.mostrarBattleGif = false;
  this.gifBattleUrl = null;
}
equipHero(ranure: string, itemOld: string, itemNew: Item) {
  const data = {
    email: this.user.email,
    hero: this.hero.id,
    ranure: ranure,
    itemOld: itemOld,
    itemNew: itemNew.ID,
  };

  this.isBusy = true; // Bloquea interacción

  this.firebaseService.equipHero(data).subscribe(
    async (response) => {
      console.log('✅', response.equip);
      const updatedHeroes = await this.getHerosData(false);
      const updatedHero = updatedHeroes.find(h => h.id === this.hero.id);
      if (updatedHero) {
        this.hero = updatedHero;

        this.getItemsData(false, ranure.toUpperCase());
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











startBattleTimer(enemy:EnemyType, duration:number) {

 const heroReference = `${this.hero.id.toString().padStart(2, '0')}`;
 const data = {
      email: this.user.email,
      heroReference: heroReference,
      enemy: enemy.toString(),
    };
   this.firebaseService.updateHeroState(data).subscribe(
      async (response) => { 
       console.log("state cambiado");
        },
      (error) => {console.error('Error', error);} 
    );
  //SABADO aqui tengo que hacer un endpoint para guardar el nuevo estate y el enemy
  this.hero.state[0] = enemy.toString();
  console.log(""+ this.hero.state[0]);
  //let duration = 10;//duracion
  this.updateTimerDisplay(duration);

  this.timerFinished = false;
  this.countdownInterval = setInterval(() => {
    duration--;
    this.updateTimerDisplay(duration);

    if (duration <= 0) {
      clearInterval(this.countdownInterval);
      this.timerFinished = true;
    }
  }, 1000);
}

updateTimerDisplay(secondsLeft: number) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  this.timerDisplay = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
}

padZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}


reviseTimer(){
        let restTime = 0;
        const now = new Date();

        const futureDate = new Date(this.heroes[1].state[1].seconds * 1000);
        if (futureDate > now) {
          const diffMs = futureDate.getTime() - now.getTime();
          restTime = Math.floor(diffMs / 1000);
          console.log("✅ tiempo faltante:", restTime);
          this.updateTimerDisplay(restTime);
          this.timerFinished = false;
          this.countdownInterval = setInterval(() => {
            restTime--;
            this.updateTimerDisplay(restTime);

            if (restTime <= 0) {
            clearInterval(this.countdownInterval);
            this.timerFinished = true;
            }
          }, 1000);
        }
}
}