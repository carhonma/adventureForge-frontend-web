export enum TurnActionType {
    STANDARD_ATTACK = 'STANDARD_ATTACK',
    HARD_STRIKE= 'HARD_STRIKE',
    HARD_SHOT= 'HARD_SHOT',
    HARD_SPELL= 'HARD_SPELL',
    BUFF_ARMOR= 'BUFF_ARMOR',
    DEBUFF_ARMOR= 'DEBUFF_ARMOR',
    NOACTION= 'NOACTION' 
  }
 
  export const turnActionStyles: Record<TurnActionType, { icon: string, description: string; }> = {
    [TurnActionType.STANDARD_ATTACK]: { icon: 'skills/STANDARD_ATTACK.png',description: 'El campeón relaiza un ataque de:<br>x1 Dbrutal<br>x1 Dletal<br>x1 Dmistic'},
    [TurnActionType.HARD_STRIKE]: { icon: 'skills/HARD_STRIKE.png',description: 'El campeón relaiza un ataque de:<br>x1.5 Dbrutal'},
    [TurnActionType.HARD_SHOT]: { icon: 'skills/HARD_SHOT.png',description: 'El campeón relaiza un ataque de:<br>x1.5 Dletal'},
    [TurnActionType.HARD_SPELL]: { icon: 'skills/HARD_SPELL.png',description: 'El campeón relaiza un ataque de:<br>x1.5 Dmistic'},
    [TurnActionType.BUFF_ARMOR]: { icon: 'skills/BUFF_ARMOR.png',description: 'El campeón varía sus estadisticas:<br>+5 Armor'},
    [TurnActionType.DEBUFF_ARMOR]: { icon: 'skills/DEBUFF_ARMOR.png',description: 'El enemigo varía sus estadisticas:<br>-5 Armor'},
    [TurnActionType.NOACTION]: { icon: 'skills/STANDARD_ATTACK.png',description: 'Descripción de NOACTION'},//aqui haria falta un icono
    
  }