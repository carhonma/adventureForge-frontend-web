import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { Hero } from '../domain/hero';
import { EnemyType } from '../enum/enemyType';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private apiUrl = 'http://localhost:8080/api'; // Ajusta la URL si tu backend está en otro puerto o servidor

  constructor(private http: HttpClient) {}

  testConnection(): Observable<string> {
    return this.http.get(`${this.apiUrl}/firestore`, { responseType: 'text' });
  }

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addUser`, data);
  }

  addUserLog(data:Data): Observable<any> { 
    return this.http.post(`${this.apiUrl}/addUserLog`, data);
}

  getHerosData(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getHerosData/${email}`);
  }

  getItemsData(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getItemsData/${email}`);
  }

  getUserData(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getUserData/${email}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password});
  }
  addHero(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addHero`, data);
  }
  changeHeroName(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/changeHeroName`, data);
  }
  battle(hero: Hero, enemy: EnemyType): Observable<any> {
    const data = { hero, enemy };
    return this.http.post<any>(`${this.apiUrl}/battle`, data);
  }
}
