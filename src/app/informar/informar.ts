import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HeroType } from '../enum/heroType';
import { StorageService } from '../services/storage.service';
import { ImageService } from '../services/image.service';
import e from 'express';
import { FirebaseService } from '../services/firebase.service';

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private imageService: ImageService,
     private firebaseService: FirebaseService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getCurrentUser();
    this.imageUrls['BOTON_madera_8'] = this.imageService.getCachedImage('iconos/boton_madera_8.png')!;
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
}