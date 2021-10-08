import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Quotes} from "../model/quotes";
import {CacheService} from "./cache.service";
import {tap} from "rxjs/operators";
import {ApiKeys} from "../constants/api-keys";

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
    let symbolString = symbols.join(",");

    let quotes = this.cacheService.load(this.getKey(symbolString));
    if (quotes == null) {
      console.log("Cache is empty, calling API");
      let headers = new HttpHeaders();
      return this.http.get<Quotes>(`${this.basePath}/eod/latest?symbols=${symbolString}&access_key=${ApiKeys.MARKETSTACK_API_KEY}`,
        {headers: headers})
        .pipe(tap(response => this.cacheResponse(symbolString, response)))
        .toPromise();
    } else {
      console.log("Cache is found, returning from cache");
      return Promise.resolve(quotes);
    }
  }

  private cacheResponse(symbols: string, response: Quotes) {
    this.cacheService.save(this.getKey(symbols), this.CACHE_EXPIRATION_MILLIS, response);
    console.log(response);
  }

  private getKey(symbols: string) {
    return this.LOCAL_STORAGE_KEY + "_" + symbols;
  }
}
