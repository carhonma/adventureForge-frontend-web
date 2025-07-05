  // Ajusta la importación según donde esté el archivo

import { GradeType } from "../enum/gradeType";
import {crafterStyles, CrafterType } from "../enum/crafterType";


export class Crafter {
  ID: string;
  name: string;
  type: CrafterType;
  level: number;
  ableToCraft: string[];
  icon: string;
  actualExp: number;
  maxExp: number;
  expBarIcon: string;

    constructor(ID: string, name: string, type: CrafterType, level: number, ableToCraft: string[], actualExp: number, maxExp: number, expBarIcon: string) {
      this.ID = ID;
      this.name = name;
      this.type = type;
      this.level = level;
      this.ableToCraft = ableToCraft;
      this.icon = crafterStyles[name as CrafterType]?.icon || '❓';
      this.actualExp = actualExp;
      this.maxExp = maxExp;
      this.expBarIcon = expBarIcon;
    }
}

