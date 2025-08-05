import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HeroType } from '../enum/heroType';
import { StorageService } from '../services/storage.service';
import { ImageService } from '../services/image.service';
import e from 'express';
import { FirebaseService } from '../services/firebase.service';
import { SpritesService } from '../services/sprites.service';
import spriteDataButtons from '../../assets/sprites_buttons.json';

@Component({
  selector: 'app-informar',
  templateUrl: './informar.html',
  styleUrls: ['./informar.css'],
})
export class InformarComponent implements OnInit {
  user: any = {};
  title = 'Informar';
  state: string = 'loginState';
  tipoIncidencia: string = 'error';
  descripcionIncidencia: string = '';
  imageUrls: { [key: string]: string } = {};
  spriteButton : string = '';
  spriteHeros : string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private imageService: ImageService,
    private firebaseService: FirebaseService,
    private spritesService: SpritesService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getCurrentUser();
    this.spriteButton = this.imageService.getCachedImage('iconos/botones_madera.png')!;
    this.spriteHeros = this.imageService.getCachedImage('iconos/heros.png')!;
  }
  returnToLogin() {
    this.state = 'loginState';
    this.title = 'Login';
    alert('Volvemos al login');
    
  }
  reportar(){
    const data = {
      Email:this.user.email,
      Incidencia:this.tipoIncidencia,
      Text: this.descripcionIncidencia,
    }
    this.firebaseService.addTesterReport(data).subscribe(
      (response) => { console.log('Response:', response.message);
        this.tipoIncidencia="";
        this.descripcionIncidencia="";
      },
      (error) => {
         console.error('Error al reportar incidencia:', error);
          }
        ); 
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