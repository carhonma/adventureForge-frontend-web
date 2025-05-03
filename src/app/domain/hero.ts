  // Ajusta la importación según donde esté el archivo

import {heroStyles, HeroType } from "../enum/heroType";


export class Hero {
  id: string;
  name: string;
  type: HeroType;
  icon: string;
  level: number;
  actualLife: string;
  actualExp: string;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  skill5: string;
  Dbrutal: number;
  Dletal: number;
  Dmistic: number;
  armor: number;
  resistance: number;
  accuracy: number;
  evasion: number;
  critic: number;
  maxHealth: number;
  maxExp: number;
  

  constructor(id: string, name: string, type: HeroType, level: number, actualLife: string, actualExp: string, skill1: string, skill2: string, skill3: string, skill4: string, skill5: string, 
    Dbrutal: number, Dletal: number, Dmistic: number, armor: number, resistance: number, accuracy: number, evasion: number, critic: number, maxHealth: number, maxExp: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.icon = heroStyles[type as HeroType]?.icon || '❓'
    this.level = level;
    this.actualLife = actualLife;
    this.actualExp = actualExp;
    this.skill1 = skill1;
    this.skill2 = skill2;
    this.skill3 = skill3;
    this.skill4 = skill4;
    this.skill5 = skill5;
    this.Dbrutal = Dbrutal;
    this.Dletal = Dletal;
    this.Dmistic = Dmistic;
    this.armor = armor;
    this.resistance = resistance;
    this.accuracy = accuracy;
    this.evasion = evasion;
    this.critic = critic;
    this.maxHealth = maxHealth;
    this.maxExp = maxExp;
  }
}
export interface BaseStats {
  Dbrutal: number;
  Dletal: number;
  Dmistic: number;
  armor: number;
  resistance: number;
  accuracy: number;
  evasion: number;
  critic: number;
  maxHealth: number;
  maxExp: number;
}
