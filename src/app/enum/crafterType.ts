
export enum CrafterType {

  Alchemist = 'ALCHEMIST',
  Armorsmith = 'ARMORSMITH',
  Carpenter = 'CARPENTER',
  Enchanter = 'ENCHANTER',
  Tailor = 'TAILOR',
  WeaponSmith = 'WEAPONSMITH',
  }
 
  export const crafterStyles: Record<CrafterType, { icon: string}> = {

    
    [CrafterType.Alchemist]: { icon: 'crafter/alchemist.png'},
    [CrafterType.Armorsmith]: { icon: 'crafter/armorsmith.png'},
    [CrafterType.Carpenter]: { icon: 'crafter/carpenter.png'},
    [CrafterType.Enchanter]: { icon: 'crafter/enchanter.png'},
    [CrafterType.Tailor]: { icon: 'crafter/tailor.png'},
    [CrafterType.WeaponSmith]: { icon: 'crafter/weaponsmith.png'},

  };