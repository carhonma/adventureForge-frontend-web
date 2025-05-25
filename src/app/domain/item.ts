  // Ajusta la importación según donde esté el archivo

import { GradeType } from "../enum/gradeType";
import {itemStyles, ItemType } from "../enum/ItemType";


export class Item {
  ID: string;
  amount: number;
  grade: GradeType;
  name: string;
  price: number;
  subtype: string;
  type: string;
  icon: string;
  

    constructor(ID: string, amount: number, grade:GradeType, name: string, price: number, subtype: string, type: string, icon: string) {
      this.ID = ID;
      this.grade = grade;
      this.amount = amount;
      this.name = name;
      this.price = price;
      this.subtype= subtype;
      this.type = type;
      this.icon = itemStyles[ID as ItemType]?.icon || '❓'
      
    }
}

