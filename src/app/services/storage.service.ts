import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = getStorage();

  constructor() {}

  async getImageUrl(folder: string, imageName: string): Promise<string> {
    const imageRef = ref(this.storage, `${folder}/${imageName}`);
    return await getDownloadURL(imageRef);
  }
  async getSoundUrl(folder: string, soundName: string): Promise<string> {
    const audioRef = ref(this.storage,  `${folder}/${soundName}`); // ruta en Firebase Storage
    return await getDownloadURL(audioRef);
  }
}