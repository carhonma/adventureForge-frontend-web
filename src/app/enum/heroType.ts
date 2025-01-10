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
    [HeroType.GUERRERO]: '#7E0602',
    [HeroType.PICARO]: '#025128',
    [HeroType.MAGO]: '#02477E',
    [HeroType.PALADIN]: '#604A13',
    [HeroType.CAZADOR]: '#532929',
    [HeroType.CLERIGO]: '#9A9283',
  };

  export const HeroLongBackground: { [key in HeroType]: string } = {
    [HeroType.GUERRERO]: '#966E64',
    [HeroType.PICARO]: '#966E64',//'#0AAE59',
    [HeroType.MAGO]: '#966E64',//'#3885C1',
    [HeroType.PALADIN]: '#966E64',//'#F4C347',
    [HeroType.CAZADOR]: '#966E64',//'#966E64',
    [HeroType.CLERIGO]: '#966E64',//'#fff',
  };