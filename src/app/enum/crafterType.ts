
export enum CrafterType {

  Alchemist = 'ALCHEMIST',
  Armorsmith = 'ARMORSMITH',
  Carpenter = 'CARPENTER',
  Enchanter = 'ENCHANTER',
  Tailor = 'TAILOR',
  WeaponSmith = 'WEAPONSMITH',
  }
 
  export const crafterStyles: Record<CrafterType, { icon: string , ableToCraft: string[]}> = {

    
    [CrafterType.Alchemist]: { icon: 'crafter/alchemist.png',ableToCraft:[""]},
    [CrafterType.Armorsmith]: { icon: 'crafter/armorsmith.png',ableToCraft:["HEAVYARMOR"]},
    [CrafterType.Carpenter]: { icon: 'crafter/carpenter.png',ableToCraft:["BOW","CROSIER","WAND"]},
    [CrafterType.Enchanter]: { icon: 'crafter/enchanter.png',ableToCraft:[""]},
    [CrafterType.Tailor]: { icon: 'crafter/tailor.png',ableToCraft:["MEDIUMARMOR","LIGHTARMOR"]},
    [CrafterType.WeaponSmith]: { icon: 'crafter/weaponsmith.png',ableToCraft:["SWORD","AXE","DAGE"]},

  };