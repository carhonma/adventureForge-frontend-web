import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore,doc,setDoc, collection, addDoc, getDoc, getDocs} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Hero,BaseStats} from '../domain/hero';
import { HeroType,heroStyles } from '../enum/heroType';
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
  user: any = {};  // Puedes guardar datos del usuario aquí si es necesario
  title ='sin título';
  heroes: Hero[] = [];
  heroTypes = Object.values(HeroType) as HeroType[];
  userData: User | null = null;
  heroType = 'sin tipo';
  hero: any;
  heroDescription: string = '';
  heroBackground: string = '#f9f9f9';
  heroLongBackground: string = '#f9f9f9';
  imageUrls: { [key: string]: string } = {};
  state: string = ''; 
  heroStyles = heroStyles;
  
  
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
      this.imageUrls['BOTON_alargado'] = this.imageService.getCachedImage('iconos/boton_alargado.png')!;
      this.imageUrls['BOTON_alargado_izq'] = this.imageService.getCachedImage('iconos/boton_alargado_izq.png')!;
      this.imageUrls['BOTON_alargado_der'] = this.imageService.getCachedImage('iconos/boton_alargado_der.png')!;
    } else {
      console.error("❌ No hay usuario cargado");
      await this.preloadUserData();
    }
  }

  preloadUserData(){ 
    
    /*this.activatedRoute.queryParams
    .pipe(first(params => params['email'] !== undefined && params['email'].trim() !== ''))
    .subscribe(params => {
      const email = params['email'];
      this.getUserData(email);
      
    });*/
    this.getUserData(this.user.email);//sin esto no se ven los datos del usuario al recargar pero al quitar lo de arriba puede que existan problemas al crear usuarios
    this.getHerosData();}
    
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
          console.log("✅ Heroes encontrados:", this.heroes);
        },
        
        (error) => {
          console.error('❌ Error al obtener datos de los héroes:', error);
        }
      );
  }

  async onHeroClick(hero: Hero) {
    this.state = "heroDetails";
    this.hero = hero;
    this.heroBackground = heroStyles[hero.type as HeroType]?.backgroundColor || '#f9f9f9';
    this.heroLongBackground = heroStyles[hero.type as HeroType]?.longBackground || '#f9f9f9';

  }
  async onBattleClick(hero: Hero) {
    console.log(hero);
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

  async onShopClick() {
    this.state = "heroShop";
    this.hero = null;
  }
  async onHeroShopClick( heroType: HeroType) {
    this.heroType= heroType;
    this.heroDescription = heroStyles[heroType as HeroType]?.description || 'No description';
    this.addHero();
    }
  async onHeroShopHover( heroType: HeroType) {
    this.heroType= heroType;
    this.heroDescription = heroStyles[heroType as HeroType]?.description || 'No description';
    }
  

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
      (response) => { console.log('✅ AddHero:',this.heroType+" adquirido por "+this.user.email),this.getHerosData();},
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
      console.log('✅ Datos del usuario obtenidos:', this.userData);
    },
    (error) => {
      console.error('❌ Error al obtener datos del usuario:', error);
    }
  );
}
}
