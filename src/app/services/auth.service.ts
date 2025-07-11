import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider,getRedirectResult,signInWithRedirect,fetchSignInMethodsForEmail, EmailAuthProvider, linkWithCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeroType } from '../enum/heroType';
import { Hero } from '../domain/hero';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
  

})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  private apiUrl = 'http://localhost:8080/api';
  //private apiUrl = 'https://adventureforge-backend-web.onrender.com/api';
  
  constructor(private auth: Auth, private firestore: Firestore,private http: HttpClient,private firebaseService: FirebaseService,) {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

// Iniciar sesión solo para usuarios verificados
async login(email: string, password: string): Promise<boolean> {
  try {
    // Iniciar sesión en Firebase
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    // Hacer la petición al backend
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Esperar la respuesta del backend
    const response: any = await this.http.post(this.apiUrl+'/verifyToken', { idToken }, { headers }).toPromise();
    
    // Verificar la respuesta del backend
    if (response && response.message === "Token válido") {
      console.log("✅ Usario accede con Password: ", email);
      return true; // Autenticación exitosa
    } else {
      throw new Error("El backend rechazó la autenticación.");
    }

  } catch (error) {
    console.error('Error en la autenticación del backend:', error);
    throw new Error("Credenciales incorrectas"); // Lanzar error para capturarlo en el .catch()
  }
}

  // Registrar usuario
  async register(email: string, password: string): Promise<string> {
    try {
      // Registrar el usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  
      // Obtener el ID Token del usuario recién registrado
      const idToken = await userCredential.user.getIdToken();
  
      // Enviar el token al backend para verificar y registrar el usuario
      await this.http.post(this.apiUrl+'/register', { idToken }).toPromise();
  
      return email;
    } catch (error) {
      console.error("❌ Error en el registro de usuario:", error);
      throw error;
    }
  }
// Inicia sesión con Google y registra al usuario en Firestore
async loginWithGoogle(): Promise<string> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this.auth, provider);

    // Obtener el ID Token y el email del usuario
    const idToken = await userCredential.user.getIdToken();
    const email = userCredential.user.email;

    if (!email) {
      throw new Error("No se pudo obtener el email del usuario de Google.");
    }

    // Enviar el token al backend para verificar y registrar el usuario
    await this.http.post(this.apiUrl+'/google-login', { idToken }).toPromise();
    console.log("✅ Usario accede con Google: ", email);
    return email;
  } catch (error) {
    console.error("❌ Error en el inicio de sesión con Google:", error);
    throw error;
  }

}

ensureUserExists(email: string, name: string): Observable<any> {
  const userData = { email, name, heroSize: 0, gold: 100 };
  return this.http.post(`${this.apiUrl}/createUserIfNotExists`, userData);
}

  // Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Método para obtener los datos del usuario desde el backend
  getUserData(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserData/${email}`);
  }

  // Obtener el estado de autenticación (usuario)
  getAuthState() {
    return this.userSubject.asObservable();
  }

  // Cerrar sesión
  logout() {
    return this.auth.signOut();
  }
}