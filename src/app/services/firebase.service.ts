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
  //private apiUrl = 'http://localhost:8080/api'; // Ajusta la URL si tu backend está en otro puerto o servidor
  private apiUrl = 'https://adventureforge-backend-web.onrender.com/api'


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

getHerosData(email: string, heroId?: string): Observable<any[]> {
  let url = `${this.apiUrl}/getHerosData/${email}`;
  if (heroId) {
    url += `?heroId=${heroId}`;
  }
  return this.http.get<any[]>(url);
}
getCraftersData(email: string): Observable<any[]> {
  let url = `${this.apiUrl}/getCraftersData/${email}`;
  return this.http.get<any[]>(url);
}

 getItemsData(email: string, type: string): Observable<any[]> {
  let url = `${this.apiUrl}/getItemsData/${email}`;
  if (type) {
    url += `?type=${encodeURIComponent(type)}`;
  }
  return this.http.get<any[]>(url);
}
getItemsCraftData(email: string, subtypes: string[], crafterLevel: number): Observable<any[]> {
  let url = `${this.apiUrl}/getItemsCraftData/${email}`;
  const params: string[] = [];

  if (subtypes && subtypes.length > 0) {
    params.push(...subtypes.map(s => `subtype=${encodeURIComponent(s)}`));
  }

  if (crafterLevel !== undefined && crafterLevel !== null) {
    params.push(`crafterLevel=${crafterLevel}`);
  }

  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }

  return this.http.get<any[]>(url);
}


  getUserData(email: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getUserData/${email}`);
  }

  getEnemyData(enemyType: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getEnemyData/${enemyType}`);
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
  sellItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sellItem`, data);
  }
  craftItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/craftItem`, data);
  }
  equipHero(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/equipHero`, data);
  }
  changeHeroName(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/changeHeroName`, data);
  }
  changeHeroSkill(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/changeHeroSkill`, data);
  }
  battle(hero: Hero, enemy: EnemyType, email: string,heroReference:string): Observable<any> {
    const data = { hero, enemy, email,heroReference };
    return this.http.post<any>(`${this.apiUrl}/battle`, data);
  }
  updateHeroState(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateHeroState`, data);
  }
}
