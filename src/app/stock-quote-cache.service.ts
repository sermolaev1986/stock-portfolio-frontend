import { Injectable } from '@angular/core';
import {Quotes} from "./quotes";

@Injectable({
  providedIn: 'root'
})
export class StockQuoteCacheService {

  private readonly LOCAL_STORAGE_KEY = "quotes";
  private readonly CACHE_EXPIRATION_MILLIS = 60 * 60 * 1000;

  constructor() { }

  public save(quotes: Quotes) {
    const record = {
      value: JSON.stringify(quotes),
      expiration: new Date().getTime() + this.CACHE_EXPIRATION_MILLIS,
      hasExpiration: true
    }
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(record))
  }

  public load(): Quotes | null {
    const item = localStorage.getItem(this.LOCAL_STORAGE_KEY);
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
