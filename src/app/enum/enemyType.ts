export enum EnemyType {
    JABALI1 = 'JABALI1',
    JABALI2 = 'JABALI2',
    JABALI3 = 'JABALI3',
  }
  
  
  

 

  export const enemyStyles: Record<EnemyType, { backgroundColor: string; longBackground: string ; icon: string; gifVictory: string; gifDefeat: string; description: string; }> = {
    [EnemyType.JABALI1]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'characters/A_jabali1.png', gifVictory: 'gifs/Y_jabali1_victory.gif', gifDefeat: 'gifs/Y_jabali1_defeat.gif', description: 'A_jabali1.description'},
    [EnemyType.JABALI2]: { backgroundColor: '#025128',longBackground: '#966E64', icon: 'characters/A_jabali2.png', gifVictory: 'gifs/Y_jabali2_victory.gif', gifDefeat: 'gifs/Y_jabali2_defeat.gif', description: 'A_jabali2.description'},
    [EnemyType.JABALI3]: { backgroundColor: '#02477E',longBackground: '#966E64', icon: 'characters/A_jabali3.png', gifVictory: 'gifs/Y_jabali3_victory.gif', gifDefeat: 'gifs/Y_jabali3_defeat.gif', description: 'A_jabali3.description'},
  }