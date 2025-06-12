export enum EnemyType {
    FOREST1 = 'FOREST1',
    GOLEM1 = 'GOLEM1',
    ENT1 = 'ENT1',
    JABALI1 = 'JABALI1',
    JABALI2 = 'JABALI2',
    JABALI3 = 'JABALI3',
    JABALI4 = 'JABALI4',
    JABALI5 = 'JABALI5',
    JABALI6 = 'JABALI6',
    JABALI7 = 'JABALI7',
  }
  
  
  

 

  export const enemyStyles: Record<EnemyType, { backgroundColor: string; longBackground: string ; icon: string; missionIcon: string; gifVictory: string; gifDefeat: string; description: string; }> = {
    [EnemyType.FOREST1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_forest1.jpg', missionIcon: 'mission/C_forest1.png', gifVictory: 'gifs/Y_forest1_victory.gif', gifDefeat: 'gifs/Y_forest1_defeat.gif', description: 'Descripción de FOREST1'},
    [EnemyType.GOLEM1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_golem1.jpg', missionIcon: 'mission/C_golem1.png', gifVictory: 'gifs/Y_golem1_victory.gif', gifDefeat: 'gifs/Y_golem1_defeat.gif', description: 'Descripción de GOLEM1'},
    [EnemyType.ENT1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_ent1.jpg', missionIcon: 'mission/C_ent1.png', gifVictory: 'gifs/Y_ent1_victory.gif', gifDefeat: 'gifs/Y_ent1_defeat.gif', description: 'Descripción de ENT1'},
    [EnemyType.JABALI1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali1.jpg', missionIcon: 'mission/C_jabali1.png', gifVictory: 'gifs/Y_jabali1_victory.gif', gifDefeat: 'gifs/Y_jabali1_defeat.gif', description: 'Descripción de JABALI1'},
    [EnemyType.JABALI2]: { backgroundColor: '#025128',longBackground: '#966E64', icon: 'characters/A_jabali2.jpg', missionIcon: 'mission/C_jabali2.png', gifVictory: 'gifs/Y_jabali2_victory.gif', gifDefeat: 'gifs/Y_jabali2_defeat.gif', description: 'Descripción de JABALI2'},
    [EnemyType.JABALI3]: { backgroundColor: '#02477E',longBackground: '#966E64', icon: 'characters/A_jabali3.jpg', missionIcon: 'mission/C_jabali3.png', gifVictory: 'gifs/Y_jabali3_victory.gif', gifDefeat: 'gifs/Y_jabali3_defeat.gif', description: 'Descripción de JABALI3'},
    [EnemyType.JABALI4]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali4.jpg', missionIcon: 'mission/C_jabali4.png', gifVictory: 'gifs/Y_jabali4_victory.gif', gifDefeat: 'gifs/Y_jabali4_defeat.gif', description: 'Descripción de JABALI4'},
    [EnemyType.JABALI5]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali5.jpg', missionIcon: 'mission/C_jabali5.png', gifVictory: 'gifs/Y_jabali5_victory.gif', gifDefeat: 'gifs/Y_jabali5_defeat.gif', description: 'Descripción de JABALI5'},
    [EnemyType.JABALI6]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali6.jpg', missionIcon: 'mission/C_jabali6.png', gifVictory: 'gifs/Y_jabali6_victory.gif', gifDefeat: 'gifs/Y_jabali6_defeat.gif', description: 'Descripción de JABALI6'},
    [EnemyType.JABALI7]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali7.jpg', missionIcon: 'mission/C_jabali7.png', gifVictory: 'gifs/Y_jabali7_victory.gif', gifDefeat: 'gifs/Y_jabali7_defeat.gif', description: 'Descripción de JABALI7'},
      
  }