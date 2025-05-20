export enum ItemType {

  ITEM_00010 = 'ITEM_00010', ITEM_00020 = 'ITEM_00020', ITEM_00030 = 'ITEM_00030', ITEM_00040 = 'ITEM_00040', ITEM_00050 = 'ITEM_00050', ITEM_00060 = 'ITEM_00060',ITEM_00070 = 'ITEM_00070',

  ITEM_01000 = 'ITEM_01000', ITEM_02000 = 'ITEM_02000', ITEM_03000 = 'ITEM_03000',
  ITEM_01001 = 'ITEM_01001', ITEM_02001 = 'ITEM_02001', ITEM_03001 = 'ITEM_03001',
  ITEM_01002 = 'ITEM_01002', ITEM_02002 = 'ITEM_02002', ITEM_03002 = 'ITEM_03002',
  ITEM_01003 = 'ITEM_01003', ITEM_02003 = 'ITEM_02003', ITEM_03003 = 'ITEM_03003',

  NULL = 'NULL'

  }
 
  export const itemStyles: Record<ItemType, { price: number, icon: string; description: string }> = {

    //raw
    [ItemType.ITEM_00010]: { price: 10, icon: 'items/tinder1.png', description: 'tinder1 D' },
    [ItemType.ITEM_00020]: { price: 10, icon: 'items/mushroom1.png', description: 'mushroom1 D' },
    [ItemType.ITEM_00030]: { price: 10, icon: 'items/log1.png', description: 'log1 D' },
    [ItemType.ITEM_00040]: { price: 10, icon: 'items/cloth1.png', description: 'cloth1 D' },
    [ItemType.ITEM_00050]: { price: 10, icon: 'items/stone1.png', description: 'stone1 D' },
    [ItemType.ITEM_00060]: { price: 10, icon: 'items/metal1.png', description: 'metal1 D' },
    [ItemType.ITEM_00070]: { price: 10, icon: 'items/tooth1.png', description: 'tooth1 D' },

    //equipement
    [ItemType.ITEM_01000]: { price: 10, icon: 'items/A_hold_helmet.png', description: 'Item' },
    [ItemType.ITEM_01001]: { price: 10, icon: 'items/helmet1.png', description: 'Item' },
    [ItemType.ITEM_01002]: { price: 10, icon: 'items/helmet2.png', description: 'Item' },
    [ItemType.ITEM_01003]: { price: 10, icon: 'items/helmet2.png', description: 'Item' },
    [ItemType.ITEM_02000]: { price: 10, icon: 'items/A_hold_gloves.png', description: 'Item' },
    [ItemType.ITEM_02001]: { price: 10, icon: 'items/gloves1.png', description: 'Item' },
    [ItemType.ITEM_02002]: { price: 10, icon: 'items/gloves2.png', description: 'Item' },
    [ItemType.ITEM_02003]: { price: 10, icon: 'items/gloves3.png', description: 'Item' },
    [ItemType.ITEM_03000]: { price: 10, icon: 'items/A_hold_chest.png', description: 'Item' },
    [ItemType.ITEM_03001]: { price: 10, icon: 'items/chest1.png', description: 'Item' },
    [ItemType.ITEM_03002]: { price: 10, icon: 'items/chest2.png', description: 'Item' },
    [ItemType.ITEM_03003]: { price: 10, icon: 'items/chest3.png', description: 'Item' },



    [ItemType.NULL]: { price: 0, icon: 'items/noItem.png', description: 'Item' },
  };