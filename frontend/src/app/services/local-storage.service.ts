import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private platformId = inject(PLATFORM_ID);

  getItem(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(key);
  }

  setJSON<T>(key: string, value: T): void {
    this.setItem(key, JSON.stringify(value));
  }

  parseJSON<T>(key: string): T | null {
    const item = this.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
}
