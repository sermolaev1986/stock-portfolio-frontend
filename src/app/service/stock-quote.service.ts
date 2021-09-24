import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Quotes} from "../model/quotes";
import {CacheService} from "./cache.service";
import {tap} from "rxjs/operators";
import {ApiKeys} from "../api-keys/api-keys";

@Injectable({
  providedIn: 'root'
})
export class StockQuoteService {

  private readonly basePath = "http://api.marketstack.com/v1";

  private readonly LOCAL_STORAGE_KEY = "quotes";

  private readonly CACHE_EXPIRATION_MILLIS = 180 * 60 * 1000;

  constructor(private readonly http: HttpClient, private readonly cacheService: CacheService) {
  }

  public getQuotes(symbols: string[]): Promise<Quotes> {
    console.log(`fetching quotes for ${symbols.length} symbols: ${symbols}`);
    let quotes = this.cacheService.load(this.LOCAL_STORAGE_KEY);
    if (quotes == null) {
      console.log("Cache is empty, calling API");
      let headers = new HttpHeaders();
      return this.http.get<Quotes>(`${this.basePath}/eod/latest?symbols=${symbols.join(",")}&access_key=${ApiKeys.MARKETSTACK_API_KEY}`,
        {headers: headers})
        .pipe(tap(response => this.cacheResponse(response)))
        .toPromise();
    } else {
      console.log("Cache is found, returning from cache");
      return Promise.resolve(quotes);
    }
  }

  private cacheResponse(response: Quotes) {
    this.cacheService.save(this.LOCAL_STORAGE_KEY, this.CACHE_EXPIRATION_MILLIS, response);
    console.log(response);
  }
}
