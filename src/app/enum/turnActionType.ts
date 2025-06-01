export enum TurnActionType {
    STANDARD_ATTACK = 'STANDARD_ATTACK',
    HARD_STRIKE= 'HARD_STRIKE',
    HARD_SPELL= 'HARD_SPELL',
    BUFF_ARMOR= 'BUFF_ARMOR',
    DEBUFF_ARMOR= 'DEBUFF_ARMOR',
    NOACTION= 'NOACTION' 
  }
 
  export const turnActionStyles: Record<TurnActionType, { description: string; }> = {
    [TurnActionType.STANDARD_ATTACK]: { description: 'Descripción de STANDARD_ATTACK'},
    [TurnActionType.HARD_STRIKE]: { description: 'Descripción de HARD_STRIKE'},
    [TurnActionType.HARD_SPELL]: { description: 'Descripción de HARD_SPELL'},
    [TurnActionType.BUFF_ARMOR]: { description: 'Descripción de BUFF_ARMOR'},
    [TurnActionType.DEBUFF_ARMOR]: { description: 'Descripción de DEBUFF_ARMOR'},
    [TurnActionType.NOACTION]: { description: 'Descripción de NOACTION'},
    
  }