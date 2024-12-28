import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = getStorage();

  constructor() {}

  // Obtener URL de una imagen específica
  async getImageUrl(folder: string, imageName: string): Promise<string> {
    const imageRef = ref(this.storage, `${folder}/${imageName}`);
    return await getDownloadURL(imageRef);
  }
}