export enum EnemyType {
    FOREST1 = 'FOREST1',FOREST1_UP1 = 'FOREST1_UP1',FOREST1_UP2 = 'FOREST1_UP2',
    GOLEM1 = 'GOLEM1',GOLEM1_UP1 = 'GOLEM1_UP1',GOLEM1_UP2 = 'GOLEM1_UP2',
    ENT1 = 'ENT1',ENT1_UP1 = 'ENT1_UP1',ENT1_UP2 = 'ENT1_UP2',
    JABALI1 = 'JABALI1',JABALI1_UP1 = 'JABALI1_UP1',JABALI1_UP2 = 'JABALI1_UP2',
    JABALI2 = 'JABALI2',JABALI2_UP1 = 'JABALI2_UP1',JABALI2_UP2 = 'JABALI2_UP2',
    JABALI3 = 'JABALI3',JABALI3_UP1 = 'JABALI3_UP1',JABALI3_UP2 = 'JABALI3_UP2',
    JABALI4 = 'JABALI4',JABALI4_UP1 = 'JABALI4_UP1',JABALI4_UP2 = 'JABALI4_UP2',
    JABALI5 = 'JABALI5',JABALI5_UP1 = 'JABALI5_UP1',JABALI5_UP2 = 'JABALI5_UP2',
    JABALI6 = 'JABALI6',JABALI6_UP1 = 'JABALI6_UP1',JABALI6_UP2 = 'JABALI6_UP2',
    JABALI7 = 'JABALI7',JABALI7_UP1 = 'JABALI7_UP1',JABALI7_UP2 = 'JABALI7_UP2',

    PEZ2 = 'PEZ2',PEZ2_UP1 = 'PEZ2_UP1',PEZ2_UP2 = 'PEZ2_UP2',
  }
  
  
  

 

  export const enemyStyles: Record<EnemyType, { backgroundColor: string; longBackground: string ; icon: string; missionIcon: string; gifVictory: string; gifDefeat: string; description: string; }> = {
    [EnemyType.FOREST1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_forest1.jpg', missionIcon: 'mission/C_forest1.png', gifVictory: 'gifs/Y_forest1_victory.gif', gifDefeat: 'gifs/Y_forest1_defeat.gif', description: 'Descripción de FOREST1'},
    [EnemyType.FOREST1_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_forest1_up1.jpg', missionIcon: 'mission/C_forest1_up1.png', gifVictory: 'gifs/Y_forest1_victory.gif', gifDefeat: 'gifs/Y_forest1_defeat.gif', description: 'Descripción de FOREST1_UP1'},
    [EnemyType.FOREST1_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_forest1_up2.jpg', missionIcon: 'mission/C_forest1_up2.png', gifVictory: 'gifs/Y_forest1_victory.gif', gifDefeat: 'gifs/Y_forest1_defeat.gif', description: 'Descripción de FOREST1_UP2'},
    [EnemyType.GOLEM1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_golem1.jpg', missionIcon: 'mission/C_golem1.png', gifVictory: 'gifs/Y_golem1_victory.gif', gifDefeat: 'gifs/Y_golem1_defeat.gif', description: 'Descripción de GOLEM1'},
    [EnemyType.GOLEM1_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_golem1_up1.jpg', missionIcon: 'mission/C_golem1_up1.png', gifVictory: 'gifs/Y_golem1_up1_victory.gif', gifDefeat: 'gifs/Y_golem1_up1_defeat.gif', description: 'Descripción de GOLEM1_UP1'},
    [EnemyType.GOLEM1_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_golem1_up2.jpg', missionIcon: 'mission/C_golem1_up2.png', gifVictory: 'gifs/Y_golem1_up2_victory.gif', gifDefeat: 'gifs/Y_golem1_up2_defeat.gif', description: 'Descripción de GOLEM1_UP2'},
    [EnemyType.ENT1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_ent1.jpg', missionIcon: 'mission/C_ent1.png', gifVictory: 'gifs/Y_ent1_victory.gif', gifDefeat: 'gifs/Y_ent1_defeat.gif', description: 'Descripción de ENT1'},
    [EnemyType.ENT1_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_ent1_up1.jpg', missionIcon: 'mission/C_ent1_up1.png', gifVictory: 'gifs/Y_ent1_up1_victory.gif', gifDefeat: 'gifs/Y_ent1_up1_defeat.gif', description: 'Descripción de ENT1_UP1'},
    [EnemyType.ENT1_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_ent1_up2.jpg', missionIcon: 'mission/C_ent1_up2.png', gifVictory: 'gifs/Y_ent1_up2_victory.gif', gifDefeat: 'gifs/Y_ent1_up2_defeat.gif', description: 'Descripción de ENT1_UP2'},
    [EnemyType.JABALI1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali1.jpg', missionIcon: 'mission/C_jabali1.png', gifVictory: 'gifs/Y_jabali1_victory.gif', gifDefeat: 'gifs/Y_jabali1_defeat.gif', description: 'Descripción de JABALI1'},
    [EnemyType.JABALI1_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali1_up1.jpg', missionIcon: 'mission/C_jabali1_up1.png', gifVictory: 'gifs/Y_jabali1_victory.gif', gifDefeat: 'gifs/Y_jabali1_defeat.gif', description: 'Descripción de JABALI1_UP1'},
    [EnemyType.JABALI1_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali1_up2.jpg', missionIcon: 'mission/C_jabali1_up2.png', gifVictory: 'gifs/Y_jabali1_victory.gif', gifDefeat: 'gifs/Y_jabali1_defeat.gif', description: 'Descripción de JABALI1_UP2'},
    [EnemyType.JABALI2]: { backgroundColor: '#025128',longBackground: '#966E64', icon: 'characters/A_jabali2.jpg', missionIcon: 'mission/C_jabali2.png', gifVictory: 'gifs/Y_jabali2_victory.gif', gifDefeat: 'gifs/Y_jabali2_defeat.gif', description: 'Descripción de JABALI2'},
    [EnemyType.JABALI2_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali2_up1.jpg', missionIcon: 'mission/C_jabali2_up1.png', gifVictory: 'gifs/Y_jabali2_victory.gif', gifDefeat: 'gifs/Y_jabali2_defeat.gif', description: 'Descripción de JABALI1_UP1'},
    [EnemyType.JABALI2_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali2_up2.jpg', missionIcon: 'mission/C_jabali2_up2.png', gifVictory: 'gifs/Y_jabali2_victory.gif', gifDefeat: 'gifs/Y_jabali2_defeat.gif', description: 'Descripción de JABALI1_UP2'},
    [EnemyType.JABALI3]: { backgroundColor: '#02477E',longBackground: '#966E64', icon: 'characters/A_jabali3.jpg', missionIcon: 'mission/C_jabali3.png', gifVictory: 'gifs/Y_jabali3_victory.gif', gifDefeat: 'gifs/Y_jabali3_defeat.gif', description: 'Descripción de JABALI3'},
    [EnemyType.JABALI3_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali3_up1.jpg', missionIcon: 'mission/C_jabali3_up1.png', gifVictory: 'gifs/Y_jabali3_victory.gif', gifDefeat: 'gifs/Y_jabali3_defeat.gif', description: 'Descripción de JABALI1_UP1'},
    [EnemyType.JABALI3_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali3_up2.jpg', missionIcon: 'mission/C_jabali3_up2.png', gifVictory: 'gifs/Y_jabali3_victory.gif', gifDefeat: 'gifs/Y_jabali3_defeat.gif', description: 'Descripción de JABALI1_UP2'},
    [EnemyType.JABALI4]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali4.jpg', missionIcon: 'mission/C_jabali4.png', gifVictory: 'gifs/Y_jabali4_victory.gif', gifDefeat: 'gifs/Y_jabali4_defeat.gif', description: 'Descripción de JABALI4'},
    [EnemyType.JABALI4_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali4_up1.jpg', missionIcon: 'mission/C_jabali4_up1.png', gifVictory: 'gifs/Y_jabali4_victory.gif', gifDefeat: 'gifs/Y_jabali4_defeat.gif', description: 'Descripción de JABALI1_UP1'},
    [EnemyType.JABALI4_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali4_up2.jpg', missionIcon: 'mission/C_jabali4_up2.png', gifVictory: 'gifs/Y_jabali4_victory.gif', gifDefeat: 'gifs/Y_jabali4_defeat.gif', description: 'Descripción de JABALI1_UP2'},
    [EnemyType.JABALI5]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali5.jpg', missionIcon: 'mission/C_jabali5.png', gifVictory: 'gifs/Y_jabali5_victory.gif', gifDefeat: 'gifs/Y_jabali5_defeat.gif', description: 'Descripción de JABALI5'},
    [EnemyType.JABALI5_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali5.jpg', missionIcon: 'mission/C_jabali5.png', gifVictory: 'gifs/Y_jabali5_victory.gif', gifDefeat: 'gifs/Y_jabali5_defeat.gif', description: 'Descripción de JABALI1_UP1'},
    [EnemyType.JABALI5_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali5.jpg', missionIcon: 'mission/C_jabali5.png', gifVictory: 'gifs/Y_jabali5_victory.gif', gifDefeat: 'gifs/Y_jabali5_defeat.gif', description: 'Descripción de JABALI1_UP2'},
    [EnemyType.JABALI6]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali6.jpg', missionIcon: 'mission/C_jabali6.png', gifVictory: 'gifs/Y_jabali6_victory.gif', gifDefeat: 'gifs/Y_jabali6_defeat.gif', description: 'Descripción de JABALI6'},
    [EnemyType.JABALI6_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali6_up1.jpg', missionIcon: 'mission/C_jabali6_up1.png', gifVictory: 'gifs/Y_jabali6_victory.gif', gifDefeat: 'gifs/Y_jabali6_defeat.gif', description: 'Descripción de JABALI1_UP1'},
    [EnemyType.JABALI6_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali6_up2.jpg', missionIcon: 'mission/C_jabali6_up2.png', gifVictory: 'gifs/Y_jabali6_victory.gif', gifDefeat: 'gifs/Y_jabali6_defeat.gif', description: 'Descripción de JABALI1_UP2'},
    [EnemyType.JABALI7]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali7.jpg', missionIcon: 'mission/C_jabali7.png', gifVictory: 'gifs/Y_jabali7_victory.gif', gifDefeat: 'gifs/Y_jabali7_defeat.gif', description: 'Descripción de JABALI7'},
    [EnemyType.JABALI7_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali7_up1.jpg', missionIcon: 'mission/C_jabali7_up1.png', gifVictory: 'gifs/Y_jabali7_victory.gif', gifDefeat: 'gifs/Y_jabali7_defeat.gif', description: 'Descripción de JABALI1_UP1'},
    [EnemyType.JABALI7_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali7_up2.jpg', missionIcon: 'mission/C_jabali7_up2.png', gifVictory: 'gifs/Y_jabali7_victory.gif', gifDefeat: 'gifs/Y_jabali7_defeat.gif', description: 'Descripción de JABALI1_UP2'},
    [EnemyType.PEZ2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_pez2.jpg', missionIcon: 'mission/C_pez2.png', gifVictory: 'gifs/Y_jabali7_victory.gif', gifDefeat: 'gifs/Y_jabali7_defeat.gif', description: 'Descripción de PEZ2'},
    [EnemyType.PEZ2_UP1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_pez2_up1.jpg', missionIcon: 'mission/C_pez2_up1.png', gifVictory: 'gifs/Y_jabali7_victory.gif', gifDefeat: 'gifs/Y_jabali7_defeat.gif', description: 'Descripción de PEZ2_UP1'},
    [EnemyType.PEZ2_UP2]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_pez2_up2.jpg', missionIcon: 'mission/C_pez2_up2.png', gifVictory: 'gifs/Y_jabali7_victory.gif', gifDefeat: 'gifs/Y_jabali7_defeat.gif', description: 'Descripción de PEZ2_UP2'},
          
  }