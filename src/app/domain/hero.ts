  // Ajusta la importación según donde esté el archivo

import {heroStyles, HeroType } from "../enum/heroType";
import { Item } from "./item";
import { ItemType } from "../enum/itemType";
import { EnemyType } from "../enum/enemyType";


export class Hero {
  id: string;
  ID: number;
  name: string;
  type: HeroType;
  icon: string;
  lifeBarIcon: string;
  expBarIcon: string;
  level: number;
  actualLife: number;
  actualExp: number;
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
  bonus: string[];
  collateral: string[];
  state: any[];
  x_boots: Item;
  x_chest: Item;
  x_gloves: Item;
  x_helmet: Item;
  x_jewel: Item;
  x_weapon: Item;
  
  

  constructor(ID: number,id: string, name: string, type: HeroType, level: number, actualLife: number, actualExp: number, skill1: string, skill2: string, skill3: string, skill4: string, skill5: string, lifeBarIcon: string, expBarIcon: string,
    Dbrutal: number, Dletal: number, Dmistic: number, armor: number, resistance: number, accuracy: number, evasion: number, critic: number, maxHealth: number, maxExp: number, bonus: string[], collateral: string[], state: any[], x_boots: Item, x_chest: Item, x_gloves: Item, x_helmet: Item, x_jewel: Item, x_weapon: Item) {
    this.ID = ID;
    this.id = id;
    this.name = name;
    this.type = type;
    this.icon = heroStyles[type as HeroType]?.icon || '❓';
    this.lifeBarIcon = lifeBarIcon;
    this.expBarIcon = expBarIcon;
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
    this.state = state;
    this.bonus = bonus;
    this.collateral = collateral;
    
  
    this.x_boots = new Item("ITEM_05000", 1,"chest",0,"SUBTYPE","TYPE",[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]);
    this.x_chest = new Item("ITEM_03000", 1,"chest",0,"SUBTYPE","TYPE",[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]);
    this.x_gloves = new Item("ITEM_02000", 1,"chest",0,"SUBTYPE","TYPE",[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]);
    this.x_helmet = new Item("ITEM_01000", 1,"chest",0,"SUBTYPE","TYPE",[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]);
    this.x_jewel = new Item("ITEM_06000", 1,"chest",0,"SUBTYPE","TYPE",[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]);
    this.x_weapon = new Item("ITEM_04000", 1,"chest",0,"SUBTYPE","TYPE",[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[ItemType.NULL,ItemType.NULL,ItemType.NULL],[0,0,0]);
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
