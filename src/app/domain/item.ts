  // Ajusta la importación según donde esté el archivo

import {itemStyles, ItemType } from "../enum/ItemType";


export class Item {
  id: string;
  amount: number;
  grade: string;
  name: string;
  price: number;
  subtype: string;
  type: string;
  icon: string;
  

    constructor(id: string, amount: number, grade:string, name: string, price: number, subtype: string, type: string, icon: string) {
      this.id = id;
      this.grade = grade;
      this.amount = amount;
      this.name = name;
      this.price = price;
      this.subtype= subtype;
      this.type = type;
      this.icon = itemStyles[id as ItemType]?.icon || '❓'
      
    }
}

