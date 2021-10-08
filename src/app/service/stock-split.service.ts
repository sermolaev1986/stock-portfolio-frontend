import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {StockSymbolService} from "./stock-symbol.service";
import {tap} from "rxjs/operators";
import {Splits} from "../model/splits";
import {ApiKeys} from "../constants/api-keys";

@Injectable({
  providedIn: 'root'
})
export class StockSplitService {

  private readonly basePath = "https://api.polygon.io/v2";

  private readonly LOCAL_STORAGE_KEY = "splits";

  private readonly CACHE_EXPIRATION_MILLIS = 24 * 60 * 60 * 1000;

  constructor(private readonly http: HttpClient,
              private readonly cacheService: CacheService,
              private readonly stockSymbolService: StockSymbolService) {
  }

  public getSplits(symbol: string): Promise<Splits> {
    let usSymbol = this.stockSymbolService.getUsSymbol(symbol);
    if (!usSymbol) {
      console.log(`no us symbol found for ${symbol}`);
      return Promise.resolve({results: []});
    } else {
      console.log(`fetching splits for ${usSymbol}`);
      let splits = this.cacheService.load(this.getCacheKey(symbol));
      if (splits == null) {
        console.log("Cache is empty, calling API");
        let headers = new HttpHeaders();
        return this.http.get<Splits>(`${this.basePath}/reference/splits/${usSymbol}?&apiKey=${ApiKeys.POLYGON_IO_API_KEY}`,
          {headers: headers})
          .pipe(tap(response => this.cacheResponse(response, symbol)))
          .toPromise();
      } else {
        console.log("Cache is found, returning from cache");
        return Promise.resolve(splits);
      }
    }
  }

  private getCacheKey(symbol: string): string {
    return this.LOCAL_STORAGE_KEY + "_" + symbol;
  }

  private cacheResponse(response: Splits, symbol: string) {
    this.cacheService.save(this.getCacheKey(symbol), this.CACHE_EXPIRATION_MILLIS, response);
    console.log(response);
  }
}
