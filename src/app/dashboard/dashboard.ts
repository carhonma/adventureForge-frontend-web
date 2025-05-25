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
import { ItemType,itemStyles } from '../enum/ItemType';
import { GradeType, gradeStyles } from '../enum/gradeType';
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
  heroTypes = Object.values(HeroType) as HeroType[];
  userData: any | null = null;//anteriormente no era any era User, pero gold no era propiedad
  imageUrls: { [key: string]: string } = {};
  state: string = '';
  mainClip: string = 'clipHo';
  clip: string = 'clipBa';
  showShine = false;

  hero: any;
  item: any;
  grade: any;
  heroType =  HeroType.GUERRERO;
  enemyType: EnemyType | null = null;
  EnemyType = EnemyType; //necesario para usarlo en el html
  HeroType = HeroType;
  GradeType = GradeType;
  heroDescription: string = '';
  heroBackground: string = '#f9f9f9';
  heroLongBackground: string = '#f9f9f9';
  enemyBackground: string = '#f9f9f9';
  enemyLongBackground: string = '#f9f9f9';
  heroStyles = heroStyles;
  enemyStyles = enemyStyles;
  itemStyles = itemStyles;
  gradeStyles = gradeStyles;
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
    this.getHerosData();this.getItemsData();}
    
    getHerosData() { 
      this.firebaseService.getHerosData(this.user.email).subscribe(
        (heroes) => {
          this.heroes = heroes.map(heroData => ({
            id: heroData.id,
            name: heroData.Name || 'Nombre Desconocido',
            type: heroData.Type || 'Tipo Desconocido',
            icon: heroStyles[heroData.Type as HeroType]?.icon || '❓',
            level: heroData.Level || 0,
            actualLife: heroData["o0_life"] || '0',
            actualExp: heroData["o1_exp"] || '0',
            skill1: heroData["s1_skill1"] || 'no skill',
            skill2: heroData["s2_skill2"] || 'no skill',
            skill3: heroData["s3_skill3"] || 'no skill',
            skill4: heroData["s4_skill4"] || 'no skill',
            skill5: heroData["s5_skill5"] || 'no skill',
            Dbrutal: heroData.Dbrutal || 0,
            Dletal: heroData.Dletal || 0,
            Dmistic: heroData.Dmistic || 0,
            armor: heroData.armor || 0,
            resistance: heroData.resistance || 0,
            accuracy: heroData.accuracy || 0,
            evasion: heroData.evasion || 0,
            critic: heroData.critic || 0,
            maxHealth: heroData.maxHealth || 0,
            maxExp: heroData.maxExp || 0,
          }));
          console.table(this.heroes);
        },
        
        (error) => {
          console.error('❌ Error al obtener datos de los héroes:', error);
        }
      );
  }
    getItemsData() { 
    this.firebaseService.getItemsData(this.user.email).subscribe(
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
          icon: itemStyles[itemData.ID as ItemType]?.icon || '❓'
        }));
        console.table(this.items);
      },
      
      (error) => {
        console.error('❌ Error al obtener datos de los items:', error);
      }
    );
  
}

  async onHeroClick(hero: Hero) {
    this.state = "heroDetails";
    this.hero = hero;
    this.heroNewname = hero.name;
    this.enemyType = null;
    this.heroBackground = heroStyles[hero.type as HeroType]?.backgroundColor || '#f9f9f9';
    this.heroLongBackground = heroStyles[hero.type as HeroType]?.longBackground || '#f9f9f9';
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
  }
  async onBattleClick(hero: Hero) {
    this.mostrarBattleGif = false;
    this.state = "map";
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
      (response) => { console.log('Response:', response.message);this.getItemsData();this.onMainClipClick("clipSto")},
      (error) => {
        console.error('Error al modificar items:', error);
      }
    ); 
    
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
        console.log('✅ ', response.message),this.hero.name=this.heroNewname,this.getHerosData();
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
      this.getItemsData();
    }
  }
  async onClipClick(clip: string){
    this.clip = clip;
  }
  async onStartBattleClick() {
    console.log( "ENEMY: "+this.enemyType);
   this.firebaseService.battle(this.hero,this.enemyType!,this.user.email).subscribe(
      async (response) => { 
        console.log('✅ BATTLE',response.message);
        console.log('REWARD',response.reward);
        let gifName : string = "";
        if (response.result==true){
          gifName = enemyStyles[this.enemyType as EnemyType]?.gifVictory;
          this.item1 = response.reward[0];
          this.item2 = response.reward[1];
          this.item3 = response.reward[2];
          this.getItemsData();
        }
        else{
          gifName = enemyStyles[this.enemyType as EnemyType]?.gifDefeat;
          this.item1 = ItemType.NULL;
          this.item2 = ItemType.NULL;
          this.item3 = ItemType.NULL;
        }
        this.showBattleGif(gifName);
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
  this.getHerosData();
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
}
