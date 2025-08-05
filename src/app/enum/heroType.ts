export enum HeroType {
    GUERRERO = 'GUERRERO',
    PICARO = 'PICARO',
    MAGO = 'MAGO',
    PALADIN = 'PALADIN',
    CAZADOR = 'CAZADOR',
    CLERIGO = 'CLERIGO',
  }
  
  
  



  export const heroStyles: Record<HeroType, { price: number, backgroundColor: string; longBackground: string ; description: string; }> = {
    [HeroType.GUERRERO]: { price: 100, backgroundColor: '#7E0602',longBackground: '#966E64', description: 'Robusto combatiente que destaca por su gran defensa física, tambien usa habilidades brutales para atacar o mejorar su defensa.'},
    [HeroType.PICARO]: { price: 100, backgroundColor: '#025128',longBackground: '#966E64', description: 'Versatil atacante que usa su sigilo y mezcla de habilidades para atacar los puntos débiles del enemigo. Sus defensas son variadas aunque no muy efectivas'},
    [HeroType.MAGO]: { price: 100, backgroundColor: '#02477E',longBackground: '#966E64', description: 'Potente hechicero que domina las habilidades mágicas y destaca en el ataque mágico sin embargo tiene poca vida y defensa.'},
    [HeroType.PALADIN]: { price: 1000, backgroundColor: '#604A13',longBackground: '#966E64', description: 'Implacable muro mágico que usa habilidades fisicas, destaca por su resistencia mágica y vida.'},
    [HeroType.CAZADOR]: { price: 1000, backgroundColor: '#532929',longBackground: '#966E64', description: 'Versatil atacante con mucha precisión , habilidades y defensas hibridas. Sus defensas son variadas aunque no muy efectivas.'},
    [HeroType.CLERIGO]: { price: 1000, backgroundColor: '#9A9283',longBackground: '#966E64', description: 'Curandero capaz tanto de restaurar la salud como de potenciar las estadísticas aliadas y dar soporte al equipo.'},
  };