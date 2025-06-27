  // Ajusta la importación según donde esté el archivo

import { GradeType } from "../enum/gradeType";
import {itemStyles, ItemType } from "../enum/itemType";


export class Item {
  ID: string;
  amount: number;
  grade: GradeType;
  name: string;
  price: number;
  subtype: string;
  type: string;
  icon: string;
  attributes: number[];
  bonusBenefits :number[];
  bonusCollateral :number[];
  ItemsNeeds: ItemType[];
  ItemsAmountsNeeds: number[];
  

    constructor(ID: string, amount: number, name: string, price: number, subtype: string, type: string, attributes: number[], bonusBenefits :number[], bonusCollateral :number[], ItemsNeeds: ItemType[],ItemsAmountsNeeds: number[]) {
      this.ID = ID;
      this.grade = itemStyles[ID as ItemType]?.grade || GradeType.F;
      this.amount = amount;
      this.name = name;
      this.price = price;
      this.subtype= subtype;
      this.type = type;
      this.icon = itemStyles[ID as ItemType]?.icon || '❓'
      this.attributes = attributes;
      this.bonusBenefits = bonusBenefits;
      this.bonusCollateral = bonusCollateral;
      this.ItemsNeeds = ItemsNeeds;
      this.ItemsAmountsNeeds = ItemsAmountsNeeds;
    }
}

