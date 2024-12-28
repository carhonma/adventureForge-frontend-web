export enum HeroType {
    GUERRERO = 'GUERRERO',
    PICARO = 'PICARO',
    MAGO = 'MAGO',
    PALADIN = 'PALADIN',
    CAZADOR = 'CAZADOR',
    CLERIGO = 'CLERIGO',
  }
  
  // Asignar las imágenes a cada tipo de héroe
  export const HeroIcono: { [key in HeroType]: string } = {
    [HeroType.GUERRERO]: 'guerrero.png',
    [HeroType.PICARO]: 'picaro.png',
    [HeroType.MAGO]: 'mago.png',
    [HeroType.PALADIN]: 'paladin.png',
    [HeroType.CAZADOR]: 'cazador.png',
    [HeroType.CLERIGO]: 'clerigo.png',
  };

  export const HeroBackground: { [key in HeroType]: string } = {
    [HeroType.GUERRERO]: '#532929',
    [HeroType.PICARO]: '#025128',
    [HeroType.MAGO]: '#6a99ce',
    [HeroType.PALADIN]: '#AF8824',
    [HeroType.CAZADOR]: '#532929',
    [HeroType.CLERIGO]: '#9A9283',
  };

  export const HeroLongBackground: { [key in HeroType]: string } = {
    [HeroType.GUERRERO]: '#966E64',
    [HeroType.PICARO]: '#0AAE59',
    [HeroType.MAGO]: '#a8d1ff',
    [HeroType.PALADIN]: '#F4C347',
    [HeroType.CAZADOR]: '#966E64',
    [HeroType.CLERIGO]: '#fff',
  };