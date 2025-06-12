  // Ajusta la importación según donde esté el archivo

import { GradeType } from "../enum/gradeType";
import {crafterStyles, CrafterType } from "../enum/crafterType";


export class Crafter {
  ID: string;
  name: string;
  type: CrafterType;
  ableToCraft: string[];
  icon: string;
  

    constructor(ID: string, name: string, type: CrafterType,ableToCraft: string[]) {
      this.ID = ID;
      this.name = name;
      this.type = type;
      this.ableToCraft = ableToCraft;
      this.icon = crafterStyles[name as CrafterType]?.icon || '❓'
    }
}

