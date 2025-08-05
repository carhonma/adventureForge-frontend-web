import { Injectable } from '@angular/core';
import { SpriteData } from './spritesDataModel'; // ajusta la ruta según tu estructura
import spriteDataButtons from '../../assets/sprites_buttons.json';
import spriteDataHeros from '../../assets/sprites_heros.json';
import spriteDataMissions from '../../assets/sprites_missions_map1.json';

@Injectable({
  providedIn: 'root'
})
export class SpritesService {

  constructor() { }

  getSpriteByName(name: string, spriteType: string): SpriteData | undefined {
    if(spriteType=="hero"){
        return spriteDataHeros.find((s: SpriteData) => s.name === name);
    }
    if(spriteType=="mission_map1"){
        return spriteDataMissions.find((s: SpriteData) => s.name === name);
    }
    else{
        return spriteDataButtons.find((s: SpriteData) => s.name === name);
    }
    
  }
getStyleByName(name: string, spriteSheetUrl: string, spriteType: string): { [key: string]: string } | undefined {
  const sprite = this.getSpriteByName(name,spriteType);
  if (!sprite) return undefined;
  return {
    width: `${sprite.width}px`,
    height: `${sprite.height}px`,
    'background-image': `url(${spriteSheetUrl})`,
    'background-position': `-${sprite.x}px -${sprite.y}px`,
    'background-repeat': 'no-repeat',
    'display': 'inline-block'
  };
}
}