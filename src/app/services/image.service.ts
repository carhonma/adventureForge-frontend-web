import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private imageCache: Record<string, string> = {};

  constructor(private storage: Storage) {}

  /** Devuelve (y cachea) la URL firmada de Firebase */
  async getImageUrl(path: string): Promise<string> {
    if (this.imageCache[path]) { return this.imageCache[path]; }

    const storageRef = ref(this.storage, path);
    const url = await getDownloadURL(storageRef);
    this.imageCache[path] = url;
    return url;
  }

  /** --- NUEVO: descarga real del binario antes de resolver --- */
  private async reallyPreload(path: string): Promise<void> {
    const url = await this.getImageUrl(path);

    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve();          // se completó la descarga
      img.onerror = () => reject(path);       // falló (404, CORS…)
      img.src     = url;
    });
  }

  /** Precarga un lote completo.
   *  ¡No devuelve hasta que cada imagen esté ya en la caché de red! */
  async preloadImages(paths: string[]): Promise<void> {
    const tasks = paths.map(p => this.reallyPreload(p));
    await Promise.all(tasks);
  }

  /** Acceso de lectura a la caché */
  getCachedImage(path: string): string | null {
    return this.imageCache[path] ?? null;
  }
}
