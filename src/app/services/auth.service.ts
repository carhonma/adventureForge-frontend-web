import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private auth: Auth, private firestore: Firestore) {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

// Iniciar sesión solo para usuarios verificados
async login(email: string, password: string): Promise<any> {
  
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Comprobar si el correo está verificado
    if (user.emailVerified) {
      return user; // Usuario autenticado con éxito
    } else {
      // Si el correo no está verificado, cerrar sesión y mostrar un error
      this.auth.signOut();
      alert('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
      throw new Error('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
    }
  
}

  // Registrar usuario
  async register(email: string, password: string, additionalData: { name?: string; gold?: number; heroSize?: number } = {}) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) { 
        // Guardar información adicional del usuario en Firestore
        const userData = {
          email: user.email,
          name: additionalData.name || 'noNamed',
          heroSize: additionalData.heroSize || 0,
          gold: additionalData.gold || 100,
          //createdAt: new Date().toISOString(),// fecha de creación
        };
        await this.auth.signOut();//quitar cuando solo se sinicie bajo verificación
        await setDoc(doc(this.firestore, 'users', email), userData);
        // Enviar correo de verificación
        await sendEmailVerification(user);
        return userData;
      }
      else{
        return null;
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }
// Inicia sesión con Google y registra al usuario en Firestore
async loginWithGoogle(additionalData: { name?: string; gold?: number; heroSize?: number } = {}) {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(this.auth, provider);
    const user = userCredential.user;

    if (user) {
      // Verificar si el usuario ya existe en Firestore
      const userDocRef = doc(this.firestore, 'users', user.email as string);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Registrar al usuario en Firestore si no existe
        const userData = {
          email: user.email,
          name: additionalData.name || 'noNamed',
          heroSize: additionalData.heroSize || 0,
          gold: additionalData.gold || 100,
        };
        
        // Guardar los datos en Firestore
        await setDoc(userDocRef, userData);
        alert('Registro con google completado con exito');
        // Enviar correo de verificación
        /*await sendEmailVerification(user);
        alert('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
        return { message: 'Usuario registrado y correo de verificación enviado.' };*/
      } else { 
        // El usuario ya existe, no se realiza un nuevo registro, se loguea
        alert('inicio de sesion con google exitoso');
        return { message: 'Usuario ya registrado iniciando sesión' };
      }
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión con Google:', error);
    throw error;
  }

  // Añadir un return para manejar rutas que no devuelvan nada
  return { message: 'No se pudo completar la operación.' };
}

  // Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.auth.currentUser;
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