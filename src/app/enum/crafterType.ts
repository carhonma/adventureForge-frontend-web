
export enum CrafterType {

  Alchemist = 'ALCHEMIST',
  Armorsmith = 'ARMORSMITH',
  Carpenter = 'CARPENTER',
  Enchanter = 'ENCHANTER',
  Tailor = 'TAILOR',
  WeaponSmith = 'WEAPONSMITH',
  }
 
  export const crafterStyles: Record<CrafterType, { icon: string , ableToCraft: string[]}> = {

    
    [CrafterType.Alchemist]: { icon: 'crafters/alchemist.png',ableToCraft:[""]},
    [CrafterType.Armorsmith]: { icon: 'crafters/armorsmith.png',ableToCraft:["HEAVYARMOR"]},
    [CrafterType.Carpenter]: { icon: 'crafters/carpenter.png',ableToCraft:["BOW","CROSIER","WAND"]},
    [CrafterType.Enchanter]: { icon: 'crafters/enchanter.png',ableToCraft:[""]},
    [CrafterType.Tailor]: { icon: 'crafters/tailor.png',ableToCraft:["MEDIUMARMOR","LIGHTARMOR"]},
    [CrafterType.WeaponSmith]: { icon: 'crafters/weaponsmith.png',ableToCraft:["SWORD","AXE","DAGE"]},

  };