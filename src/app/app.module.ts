import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { AppRoutingModule } from './app-routing.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhSsqGVw9Lt0WEUSsRw4X2OAiAX1vKE2g",
  authDomain: "adventureforge-fabulasdesapo.firebaseapp.com",
  projectId: "adventureforge-fabulasdesapo",
  storageBucket: "adventureforge-fabulasdesapo.firebasestorage.app",
  messagingSenderId: "35104120341",
  appId: "1:35104120341:web:4a534960ead69c6482f81c",
  measurementId: "G-7MEZM0BC26"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Mover aquí
    provideAuth(() => getAuth()), // Mover aquí
    provideFirestore(() => getFirestore()), // Proporciona Firestore
    provideStorage(() => getStorage()) // Proporciona Storage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }