export enum HeroType {
    GUERRERO = 'GUERRERO',
    PICARO = 'PICARO',
    MAGO = 'MAGO',
    PALADIN = 'PALADIN',
    CAZADOR = 'CAZADOR',
    CLERIGO = 'CLERIGO',
  }
  
  
  



  export const heroStyles: Record<HeroType, { backgroundColor: string; longBackground: string ; icon: string; description: string; }> = {
    [HeroType.GUERRERO]: { backgroundColor: '#7E0602',longBackground: '#966E64', icon: 'iconos/guerrero.png',description: 'Robusto combatiente que destaca por su gran defensa física, tambien usa habilidades brutales para atacar o mejorar su defensa'},
    [HeroType.PICARO]: { backgroundColor: '#025128',longBackground: '#966E64', icon: 'iconos/picaro.png',description: 'Versatil atacante que usa su sigilo y mezcla de habilidades para atacar los puntos débiles del enemigo. Sus defensas son variadas aunque no muy efectivas'},
    [HeroType.MAGO]: { backgroundColor: '#02477E',longBackground: '#966E64', icon: 'iconos/mago.png',description: 'Potente hechicero que domina las habilidades mágicas y destaca en el ataque mágico.'},
    [HeroType.PALADIN]: { backgroundColor: '#604A13',longBackground: '#966E64', icon: 'iconos/paladin.png',description: 'Implacable muro mágico que usa habilidades fisicas, destaca por su resistencia mágica y vida.'},
    [HeroType.CAZADOR]: { backgroundColor: '#532929',longBackground: '#966E64', icon: 'iconos/cazador.png',description: 'Versatil atacante con mucha precisión , habilidades y defensas hibridas. Sus defensas son variadas aunque no muy efectivas'},
    [HeroType.CLERIGO]: { backgroundColor: '#9A9283',longBackground: '#966E64', icon: 'iconos/clerigo.png',description: 'Curandero capaz tanto de restaurar la salud como potenciar las estadísticas aliadas.'},
  };