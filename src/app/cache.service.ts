import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private readonly CACHE_EXPIRATION_MILLIS = 180 * 60 * 1000;

  constructor() { }

  public save(key: string, object: any) {
    const record = {
      value: JSON.stringify(object),
      expiration: new Date().getTime() + this.CACHE_EXPIRATION_MILLIS,
      hasExpiration: true
    }
    localStorage.setItem(key, JSON.stringify(record))
  }

  public load(key: string): any | null {
    const item = localStorage.getItem(key);
    if (item !== null) {
      const record = JSON.parse(item);
      const now = new Date().getTime()
      // Expired data will return null
      if (!record || (record.hasExpiration && record.expiration <= now)) {
        return null;
      } else {
        return JSON.parse(record.value);
      }
    }
    return null;
  }
}
