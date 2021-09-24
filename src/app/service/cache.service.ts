import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public save(key: string, cacheExpiration: number, object: any) {
    const record = {
      value: JSON.stringify(object),
      expiration: new Date().getTime() + cacheExpiration,
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
