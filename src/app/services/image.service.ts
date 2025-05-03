import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageCache: { [key: string]: string } = {}; // Caché para almacenar las URLs
  private cachedImages: { [key: string]: string } = {};
  constructor(private storage: Storage) {}

  // Obtener la URL de una imagen (usa la caché si está disponible)
  async getImageUrl(path: string): Promise<string> {
    if (this.imageCache[path]) {
      return this.imageCache[path];
    }

    try {
      const storageRef = ref(this.storage, path);
      const url = await getDownloadURL(storageRef);
      this.imageCache[path] = url; // Guardar en caché
      return url;
    } catch (error) {
      //console.error(`Error al cargar la imagen: ${path}`, error);
      throw error;
    }
  }

  // Precargar múltiples imágenes
  async preloadImages(paths: string[]): Promise<void> {
    const preloadPromises = paths.map((path) => this.getImageUrl(path));
    await Promise.all(preloadPromises); // Carga todas las imágenes
  }

  // Obtener una imagen precargada desde la caché
  getCachedImage(path: string): string | null {
    return this.imageCache[path] || null;
  }
  getAllCachedImages(): { [key: string]: string } {
    return this.cachedImages;
  }
}