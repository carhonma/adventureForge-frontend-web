import { GradeType } from "./gradeType";

export enum ItemType {

  ITEM_00011 = 'ITEM_00011', ITEM_00012 = 'ITEM_00012', ITEM_00013 = 'ITEM_00013', ITEM_00014 = 'ITEM_00014', ITEM_00015 = 'ITEM_00015',
  ITEM_00021 = 'ITEM_00021', ITEM_00022 = 'ITEM_00022', ITEM_00023 = 'ITEM_00023', ITEM_00024 = 'ITEM_00024', ITEM_00025 = 'ITEM_00025',
  ITEM_00031 = 'ITEM_00031', ITEM_00032 = 'ITEM_00032', ITEM_00033 = 'ITEM_00033', ITEM_00034 = 'ITEM_00034', ITEM_00035 = 'ITEM_00035', 
  ITEM_00041 = 'ITEM_00041', ITEM_00042 = 'ITEM_00042', ITEM_00043 = 'ITEM_00043', ITEM_00044 = 'ITEM_00044', ITEM_00045 = 'ITEM_00045',
  ITEM_00051 = 'ITEM_00051', ITEM_00052 = 'ITEM_00052', ITEM_00053 = 'ITEM_00053', ITEM_00054 = 'ITEM_00054', ITEM_00055 = 'ITEM_00055',
  ITEM_00061 = 'ITEM_00061', ITEM_00062 = 'ITEM_00062', ITEM_00063 = 'ITEM_00063', ITEM_00064 = 'ITEM_00064', ITEM_00065 = 'ITEM_00065',
  ITEM_00071 = 'ITEM_00071', ITEM_00072 = 'ITEM_00072', ITEM_00073 = 'ITEM_00073', ITEM_00074 = 'ITEM_00074', ITEM_00075 = 'ITEM_00075',

  ITEM_01000 = 'ITEM_01000', ITEM_02000 = 'ITEM_02000', ITEM_03000 = 'ITEM_03000',ITEM_04000 = 'ITEM_04000',ITEM_05000 = 'ITEM_05000',ITEM_06000 = 'ITEM_06000',
  
  
  ITEM_01011 = 'ITEM_01011', ITEM_01012 = 'ITEM_01012', ITEM_01013 = 'ITEM_01013', ITEM_01014 = 'ITEM_01014', ITEM_01015 = 'ITEM_01015',
  ITEM_01021 = 'ITEM_01021', ITEM_01022 = 'ITEM_01022', ITEM_01023 = 'ITEM_01023', ITEM_01024 = 'ITEM_01024', ITEM_01025 = 'ITEM_01025',

  ITEM_02011 = 'ITEM_02011', ITEM_02012 = 'ITEM_02012', ITEM_02013 = 'ITEM_02013', ITEM_02014 = 'ITEM_02014', ITEM_02015 = 'ITEM_02015',
  ITEM_02021 = 'ITEM_02021', ITEM_02022 = 'ITEM_02022', ITEM_02023 = 'ITEM_02023', ITEM_02024 = 'ITEM_02024', ITEM_02025 = 'ITEM_02025',
  ITEM_02031 = 'ITEM_02031', ITEM_02032 = 'ITEM_02032', ITEM_02033 = 'ITEM_02033', ITEM_02034 = 'ITEM_02034', ITEM_02035 = 'ITEM_02035',
  ITEM_02041 = 'ITEM_02041', ITEM_02042 = 'ITEM_02042', ITEM_02043 = 'ITEM_02043', ITEM_02044 = 'ITEM_02044', ITEM_02045 = 'ITEM_02045',
  ITEM_02051 = 'ITEM_02051', ITEM_02052 = 'ITEM_02052', ITEM_02053 = 'ITEM_02053', ITEM_02054 = 'ITEM_02054', ITEM_02055 = 'ITEM_02055',
  ITEM_02061 = 'ITEM_02061', ITEM_02062 = 'ITEM_02062', ITEM_02063 = 'ITEM_02063', ITEM_02064 = 'ITEM_02064', ITEM_02065 = 'ITEM_02065',

  ITEM_03011 = 'ITEM_03011', ITEM_03012 = 'ITEM_03012', ITEM_03013 = 'ITEM_03013', ITEM_03014 = 'ITEM_03014', ITEM_03015 = 'ITEM_03015',
  ITEM_03021 = 'ITEM_03021', ITEM_03022 = 'ITEM_03022', ITEM_03023 = 'ITEM_03023', ITEM_03024 = 'ITEM_03024', ITEM_03025 = 'ITEM_03025',
  ITEM_03031 = 'ITEM_03031', ITEM_03032 = 'ITEM_03032', ITEM_03033 = 'ITEM_03033', ITEM_03034 = 'ITEM_03034', ITEM_03035 = 'ITEM_03035',
  ITEM_03041 = 'ITEM_03041', ITEM_03042 = 'ITEM_03042', ITEM_03043 = 'ITEM_03043', ITEM_03044 = 'ITEM_03044', ITEM_03045 = 'ITEM_03045',
  ITEM_03051 = 'ITEM_03051', ITEM_03052 = 'ITEM_03052', ITEM_03053 = 'ITEM_03053', ITEM_03054 = 'ITEM_03054', ITEM_03055 = 'ITEM_03055',

  ITEM_04011 = 'ITEM_04011', ITEM_04012 = 'ITEM_04012', ITEM_04013 = 'ITEM_04013', ITEM_04014 = 'ITEM_04014', ITEM_04015 = 'ITEM_04015',
  ITEM_04021 = 'ITEM_04021', ITEM_04022 = 'ITEM_04022', ITEM_04023 = 'ITEM_04023', ITEM_04024 = 'ITEM_04024', ITEM_04025 = 'ITEM_04025',
  ITEM_04031 = 'ITEM_04031', ITEM_04032 = 'ITEM_04032', ITEM_04033 = 'ITEM_04033', ITEM_04034 = 'ITEM_04034', ITEM_04035 = 'ITEM_04035',
  ITEM_04041 = 'ITEM_04041', ITEM_04042 = 'ITEM_04042', ITEM_04043 = 'ITEM_04043', ITEM_04044 = 'ITEM_04044', ITEM_04045 = 'ITEM_04045',
  ITEM_04051 = 'ITEM_04051', ITEM_04052 = 'ITEM_04052', ITEM_04053 = 'ITEM_04053', ITEM_04054 = 'ITEM_04054', ITEM_04055 = 'ITEM_04055',
  ITEM_04061 = 'ITEM_04061', ITEM_04062 = 'ITEM_04062', ITEM_04063 = 'ITEM_04063', ITEM_04064 = 'ITEM_04064', ITEM_04065 = 'ITEM_04065',
  ITEM_04071 = 'ITEM_04071', ITEM_04072 = 'ITEM_04072', ITEM_04073 = 'ITEM_04073', ITEM_04074 = 'ITEM_04074', ITEM_04075 = 'ITEM_04075',

                              
                             
                              
                                                        
  NULL = 'NULL',                                                                  

  }
 
  export const itemStyles: Record<ItemType, { icon: string; description: string; grade: GradeType }> = {

    //raw
    [ItemType.ITEM_00011]: { icon: 'items/tinder1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_00012]: { icon: 'items/tinder1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_00013]: { icon: 'items/tinder1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_00014]: { icon: 'items/tinder1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_00015]: { icon: 'items/tinder1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_00021]: { icon: 'items/mushroom1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_00022]: { icon: 'items/mushroom1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_00023]: { icon: 'items/mushroom1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_00024]: { icon: 'items/mushroom1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_00025]: { icon: 'items/mushroom1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_00031]: { icon: 'items/log1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_00032]: { icon: 'items/log1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_00033]: { icon: 'items/log1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_00034]: { icon: 'items/log1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_00035]: { icon: 'items/log1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_00041]: { icon: 'items/cloth1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_00042]: { icon: 'items/cloth1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_00043]: { icon: 'items/cloth1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_00044]: { icon: 'items/cloth1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_00045]: { icon: 'items/cloth1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_00051]: { icon: 'items/stone1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_00052]: { icon: 'items/stone1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_00053]: { icon: 'items/stone1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_00054]: { icon: 'items/stone1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_00055]: { icon: 'items/stone1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_00061]: { icon: 'items/metal1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_00062]: { icon: 'items/metal1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_00063]: { icon: 'items/metal1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_00064]: { icon: 'items/metal1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_00065]: { icon: 'items/metal1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_00071]: { icon: 'items/tooth1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_00072]: { icon: 'items/tooth1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_00073]: { icon: 'items/tooth1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_00074]: { icon: 'items/tooth1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_00075]: { icon: 'items/tooth1.png', grade: GradeType.S, description: 'Item' },
    
    //equipement
    [ItemType.ITEM_01000]: { icon: 'items/A_hold_helmet.png', grade: GradeType.F, description: 'Item' },
    [ItemType.ITEM_01011]: { icon: 'items/helmet1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_01012]: { icon: 'items/helmet1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_01013]: { icon: 'items/helmet1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_01014]: { icon: 'items/helmet1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_01015]: { icon: 'items/helmet1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_01021]: { icon: 'items/helmet2.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_01022]: { icon: 'items/helmet2.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_01023]: { icon: 'items/helmet2.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_01024]: { icon: 'items/helmet2.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_01025]: { icon: 'items/helmet2.png', grade: GradeType.S, description: 'Item' },

    [ItemType.ITEM_02000]: { icon: 'items/A_hold_gloves.png', grade: GradeType.F, description: 'Item' },
    [ItemType.ITEM_02011]: { icon: 'items/gloves1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_02012]: { icon: 'items/gloves1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_02013]: { icon: 'items/gloves1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_02014]: { icon: 'items/gloves1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_02015]: { icon: 'items/gloves1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_02021]: { icon: 'items/gloves2.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_02022]: { icon: 'items/gloves2.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_02023]: { icon: 'items/gloves2.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_02024]: { icon: 'items/gloves2.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_02025]: { icon: 'items/gloves2.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_02031]: { icon: 'items/gloves3.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_02032]: { icon: 'items/gloves3.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_02033]: { icon: 'items/gloves3.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_02034]: { icon: 'items/gloves3.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_02035]: { icon: 'items/gloves3.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_02041]: { icon: 'items/gloves4.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_02042]: { icon: 'items/gloves4.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_02043]: { icon: 'items/gloves4.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_02044]: { icon: 'items/gloves4.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_02045]: { icon: 'items/gloves4.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_02051]: { icon: 'items/gloves5.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_02052]: { icon: 'items/gloves5.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_02053]: { icon: 'items/gloves5.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_02054]: { icon: 'items/gloves5.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_02055]: { icon: 'items/gloves5.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_02061]: { icon: 'items/gloves6.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_02062]: { icon: 'items/gloves6.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_02063]: { icon: 'items/gloves6.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_02064]: { icon: 'items/gloves6.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_02065]: { icon: 'items/gloves6.png', grade: GradeType.S, description: 'Item' },
  
    [ItemType.ITEM_03000]: { icon: 'items/A_hold_chest.png', grade: GradeType.F, description: 'Item' },
    [ItemType.ITEM_03011]: { icon: 'items/chest1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_03012]: { icon: 'items/chest1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_03013]: { icon: 'items/chest1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_03014]: { icon: 'items/chest1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_03015]: { icon: 'items/chest1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_03021]: { icon: 'items/chest2.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_03022]: { icon: 'items/chest2.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_03023]: { icon: 'items/chest2.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_03024]: { icon: 'items/chest2.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_03025]: { icon: 'items/chest2.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_03031]: { icon: 'items/chest3.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_03032]: { icon: 'items/chest3.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_03033]: { icon: 'items/chest3.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_03034]: { icon: 'items/chest3.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_03035]: { icon: 'items/chest3.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_03041]: { icon: 'items/chest4.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_03042]: { icon: 'items/chest4.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_03043]: { icon: 'items/chest4.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_03044]: { icon: 'items/chest4.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_03045]: { icon: 'items/chest4.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_03051]: { icon: 'items/chest5.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_03052]: { icon: 'items/chest5.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_03053]: { icon: 'items/chest5.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_03054]: { icon: 'items/chest5.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_03055]: { icon: 'items/chest5.png', grade: GradeType.S, description: 'Item' },

    [ItemType.ITEM_04000]: { icon: 'items/A_hold_weapon.png', grade: GradeType.F, description: 'Item' },
    [ItemType.ITEM_04011]: { icon: 'items/weapon1.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_04012]: { icon: 'items/weapon1.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_04013]: { icon: 'items/weapon1.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_04014]: { icon: 'items/weapon1.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_04015]: { icon: 'items/weapon1.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_04021]: { icon: 'items/weapon2.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_04022]: { icon: 'items/weapon2.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_04023]: { icon: 'items/weapon2.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_04024]: { icon: 'items/weapon2.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_04025]: { icon: 'items/weapon2.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_04031]: { icon: 'items/weapon3.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_04032]: { icon: 'items/weapon3.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_04033]: { icon: 'items/weapon3.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_04034]: { icon: 'items/weapon3.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_04035]: { icon: 'items/weapon3.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_04041]: { icon: 'items/weapon4.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_04042]: { icon: 'items/weapon4.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_04043]: { icon: 'items/weapon4.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_04044]: { icon: 'items/weapon4.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_04045]: { icon: 'items/weapon4.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_04051]: { icon: 'items/weapon5.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_04052]: { icon: 'items/weapon5.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_04053]: { icon: 'items/weapon5.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_04054]: { icon: 'items/weapon5.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_04055]: { icon: 'items/weapon5.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_04061]: { icon: 'items/weapon5.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_04062]: { icon: 'items/weapon5.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_04063]: { icon: 'items/weapon5.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_04064]: { icon: 'items/weapon5.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_04065]: { icon: 'items/weapon5.png', grade: GradeType.S, description: 'Item' },
    [ItemType.ITEM_04071]: { icon: 'items/weapon7.png', grade: GradeType.D, description: 'Item' },[ItemType.ITEM_04072]: { icon: 'items/weapon7.png', grade: GradeType.C, description: 'Item' },[ItemType.ITEM_04073]: { icon: 'items/weapon7.png', grade: GradeType.B, description: 'Item' },[ItemType.ITEM_04074]: { icon: 'items/weapon7.png', grade: GradeType.A, description: 'Item' },[ItemType.ITEM_04075]: { icon: 'items/weapon7.png', grade: GradeType.S, description: 'Item' },

    [ItemType.ITEM_05000]: { icon: 'items/A_hold_boots.png', grade: GradeType.F, description: 'Item' },

    [ItemType.ITEM_06000]: { icon: 'items/A_hold_jewel.png', grade: GradeType.F, description: 'Item' },

    [ItemType.NULL]: { icon: 'items/noItem.png', grade: GradeType.F, description: 'Item' },
  };