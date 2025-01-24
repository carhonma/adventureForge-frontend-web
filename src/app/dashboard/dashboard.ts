import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore,doc,setDoc, collection, addDoc, getDoc, getDocs} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Hero,BaseStats} from '../domain/hero';
import { HeroBackground, HeroIcono, HeroLongBackground, HeroType } from '../enum/heroType';
import { ImageService } from '../services/image.service';

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
  heroes: Hero[] = []; // Array para almacenar héroes
  userData: User | null = null;
  heroName = 'sin nombre';
  heroType = 'sin tipo';
  imageUrl: string = '';
  heroLevel = 0;
  heroIcono: string = '';
  heroActualLife: string = '';
  heroActualExp: string = ''; 
  heroSkill1: string = ''; 
  heroSkill2: string = ''; 
  heroSkill3: string = ''; 
  heroSkill4: string = ''; 
  heroSkill5: string = '';
  heroDbrutal: number = 0; 
  heroDletal: number = 0;
  heroDmistic: number = 0;
  heroArmor: number = 0;
  heroResistance: number = 0;
  heroAccuracy: number = 0;
  heroEvasion: number = 0;
  heroCritic: number = 0;
  heroMaxHealth: number = 0;
  heroMaxExp: number = 0;  
  heroBackground: string = '#f9f9f9';
  heroLongBackground: string = '#f9f9f9';
  heroImageUrls: { [key: string]: string } = {};
  constructor(private authService: AuthService, private router: Router,private storageService: StorageService,private imageService: ImageService) {}

  async ngOnInit(): Promise<void> {

    
    this.createFirestoreDocument();
    this.getHerosData();
    this.loadUserData();
    try {
      // Precargar las imágenes necesarias
      await this.imageService.preloadImages([
        'fondos/desierto4.jpg',
        'iconos/add.png',
        'iconos/guerrero.png',
        'iconos/picaro.png',
        'iconos/mago.png',
        'iconos/paladin.png',
        'iconos/cazador.png',
        'iconos/clerigo.png',
      ]);
    // Obtener las URLs de las imágenes precargadas desde el servicio
    this.heroImageUrls['FONDO'] = this.imageService.getCachedImage('fondos/desierto4.jpg')!;
    this.heroImageUrls['ADD'] = this.imageService.getCachedImage('iconos/add.png')!;
    this.heroImageUrls['GUERRERO'] = this.imageService.getCachedImage('iconos/guerrero.png')!;
    this.heroImageUrls['PICARO'] = this.imageService.getCachedImage('iconos/picaro.png')!;
    this.heroImageUrls['MAGO'] = this.imageService.getCachedImage('iconos/mago.png')!;
    this.heroImageUrls['PALADIN'] = this.imageService.getCachedImage('iconos/paladin.png')!;
    this.heroImageUrls['CAZADOR'] = this.imageService.getCachedImage('iconos/cazador.png')!;
    this.heroImageUrls['CLERIGO'] = this.imageService.getCachedImage('iconos/clerigo.png')!;
  } catch (error) {
    //console.error('Error al precargar las imágenes:', error);
  }
  }
 
async getHerosData() { 
  const currentUser = this.authService.getCurrentUser(); // Obtener usuario autenticado
  
  if (currentUser) {
    try {
      let userEmail = currentUser.email || 'null';
      const userHerosRef = collection(this.firestore, 'heros', userEmail, 'userheros');
      const querySnapshot = await getDocs(userHerosRef);

      if (!querySnapshot.empty) {
        this.heroes = await Promise.all(querySnapshot.docs.map(async (docSnapshot) => {
          const heroData = docSnapshot.data();
          const type = heroData['Type'] || 'Tipo Desconocido';
          // Referencia al subdocumento BaseStats
          const baseStatsRef = doc(this.firestore, 'heros', userEmail, 'userheros', docSnapshot.id,'Details','BaseStats');
          let baseStats: BaseStats = { Dbrutal: 0, Dletal: 0, Dmistic: 0, armor: 0, resistance: 0, accuracy: 0, evasion: 0, critic: 0, maxHealth: 0, maxExp: 0}; // Valores por defecto
          
          try {
            const baseStatsSnapshot = await getDoc(baseStatsRef);
            if (baseStatsSnapshot.exists()) {
              const baseStatsData = baseStatsSnapshot.data();
              baseStats = {
                Dbrutal: baseStatsData['s0: Dbrutal'] || 0,
                Dletal: baseStatsData['s1: Dletal'] || 0,
                Dmistic: baseStatsData['s2: Dmistic'] || 0,
                armor: baseStatsData['s3: armor'] || 0,
                resistance: baseStatsData['s4: resistance'] || 0,
                accuracy: baseStatsData['s5: accuracy'] || 0,
                evasion: baseStatsData['s6: evasion'] || 0,
                critic: baseStatsData['s7: critic'] || 0,
                maxHealth: baseStatsData['s8: maxHealth'] || 0,
                maxExp: baseStatsData['s9: maxExp'] || 0,
              };
            }
            else {
              console.warn('El documento BaseStats no existe.');
            }
          } catch (error) {
            console.error('Error al obtener BaseStats:', error);
          }

          return {
            id: docSnapshot.id,
            name: heroData['Name'] || 'Nombre Desconocido',
            type,
            imageUrl: HeroIcono[type as HeroType] || 'ruta_por_defecto.png',
            level:heroData['Level'] || 0,
            actualLife: heroData['o0: life'] || '0',
            actualExp: heroData['o1: exp'] || '0',
            skill1: heroData['s1: skill1'] || 'no skill',
            skill2: heroData['s2: skill2'] || 'no skill',
            skill3: heroData['s3: skill3'] || 'no skill',
            skill4: heroData['s4: skill4'] || 'no skill',
            skill5: heroData['s5: skill5'] || 'no skill',
            Dbrutal: baseStats?.Dbrutal || 0,
            Dletal: baseStats?.Dletal || 0,
            Dmistic: baseStats?.Dmistic || 0,
            armor: baseStats?.armor || 0,
            resistance: baseStats?.resistance || 0,
            accuracy: baseStats?.accuracy || 0,
            evasion: baseStats?.evasion || 0,
            critic: baseStats?.critic || 0,
            maxHealth: baseStats?.maxHealth || 0,
            maxExp: baseStats?.maxExp || 0,
           
          };
        }));
      } else {
        console.log('No se encontraron documentos en la subcolección userheros.');
      }
    } catch (error) {
      console.error('Error al obtener datos de los héroes:', error);
    }
  } else {
    console.log('Usuario no autenticado.');
  }
}

  // Acción al hacer clic en un héroe
  async onHeroClick(hero: Hero) {
    this.heroName= hero.name;
    this.heroType= hero.type;
    this.heroIcono=hero.imageUrl;
    this.heroLevel=hero.level;
    this.heroActualLife=hero.actualLife;
    this.heroActualExp=hero.actualExp;
    this.heroSkill1=hero.skill1;
    this.heroSkill2=hero.skill2;
    this.heroSkill3=hero.skill3;
    this.heroSkill4=hero.skill4;
    this.heroSkill5=hero.skill5;
    this.heroDbrutal=hero.Dbrutal;
    this.heroDletal=hero.Dletal;
    this.heroDmistic=hero.Dmistic;
    this.heroArmor=hero.armor;
    this.heroResistance=hero.resistance;
    this.heroAccuracy=hero.accuracy;
    this.heroEvasion=hero.evasion;
    this.heroCritic=hero.critic;
    this.heroMaxHealth=hero.maxHealth;
    this.heroMaxExp=hero.maxExp;
    this.heroBackground = HeroBackground[hero.type as HeroType] || '#f9f9f9';
    this.heroLongBackground = HeroLongBackground[hero.type as HeroType] || '#f9f9f9';
    //console.log(`Héroe seleccionado: ${hero.name}, Tipo: ${hero.type}`);
    //alert(`Héroe seleccionado: ${hero.name}, Tipo: ${hero.type}`);
    try {
      this.imageUrl = await this.storageService.getImageUrl('iconos', this.heroIcono);
      console.log('Tipo', hero.type);
      console.log('URL de la imagen:', this.imageUrl);
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
    }
  }

  // Lógica para crear un documento en Firestore
  async createFirestoreDocument() {
    const userCollection = collection(this.firestore, 'nuevo documento'); 
    const currentUser = this.authService.getCurrentUser();  // Método para obtener el usuario actual (si ya estás autenticado)
    
    if (currentUser) {
      try {
        let userEmail = "null";
        if(currentUser.email!=null){ userEmail = currentUser.email}
        const userRef = doc(this.firestore, 'lastLogs', userEmail);
        /*const docRef = await addDoc(userCollection, {
          email: currentUser.email,
          createdAt: new Date(),
        });*/
        const data = {
          email: currentUser.email,
          createdAt: new Date(),
        };
        await setDoc(userRef, data);
      } catch (error) {
        console.error('Error al agregar el documento:', error);
      }
    } else {
    /*if (typeof window !== 'undefined') {
      alert('No estás autenticado. Redirigiendo al login...');
      this.router.navigate(['/login']);
      }*/
    }
  }

  async loadUserData() {
    try {
      const currentUser = this.authService.getCurrentUser(); // Asegúrate de que el usuario está autenticado

      if (currentUser && currentUser.email) {
        const userRef = doc(this.firestore, 'users', currentUser.email);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          this.userData = userDoc.data() as User;
          this.title = this.userData.name;
          console.log('Datos del usuario:', this.userData);
        } else {
          console.log('El documento de usuario no existe.');
        }
      } else {
        console.log('No se pudo obtener el usuario actual.');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }
}