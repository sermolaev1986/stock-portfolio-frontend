import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {Dividends} from "../model/dividends";
import {StockSymbolService} from "./stock-symbol.service";
import {tap} from "rxjs/operators";
import {ApiKeys} from "../api-keys/api-keys";
import {YahooDividendService} from "./yahoo-dividend.service";

@Injectable({
  providedIn: 'root'
})
export class DividendService {

  private readonly dividendStocks = new Set(["APC", "MSF", "CSA", "XONA", "SOBA", "WX2", "PEP", "WDP", "PFE", "AIY", "BCO", "1YD", "HDI", "PRG"]);

  private readonly basePath = "https://api.polygon.io/v2";

  private readonly LOCAL_STORAGE_KEY = "dividends";

  private readonly CACHE_EXPIRATION_MILLIS = 24 * 60 * 60 * 1000;

  constructor(private readonly http: HttpClient,
              private readonly cacheService: CacheService,
              private readonly stockSymbolService: StockSymbolService,
              private readonly yahooDividendService: YahooDividendService) {
  }

  public getDividends(symbol: string, dateFrom: string): Promise<Dividends> {
    let usSymbol = this.stockSymbolService.getUsSymbol(symbol);
    if (!usSymbol) {
      console.log(`no us symbol found for ${symbol}`);
      return Promise.resolve({results: []});
    }

    if (!this.isDividendStock(symbol)) {
      // console.log(`calling yahoo api to get dividends for symbol ${usSymbol}`);
      // return this.yahooDividendService.getDividends(usSymbol, dateFrom);
      return Promise.resolve({results: []});
    } else {
      console.log(`fetching dividends for ${usSymbol} from date ${dateFrom}`);
      let dividends = this.cacheService.load(this.getCacheKey(symbol));
      if (dividends == null) {
        console.log("Cache is empty, calling API");
        let headers = new HttpHeaders();
        return this.http.get<Dividends>(`${this.basePath}/reference/dividends/${usSymbol}?&apiKey=${ApiKeys.POLYGON_IO_API_KEY}`,
          {headers: headers})
          .pipe(tap(response => this.cacheResponse(response, symbol)))
          .toPromise();
      } else {
        console.log("Cache is found, returning from cache");
        return Promise.resolve(dividends);
      }

    }

  }

  public isDividendStock(symbol: string): boolean {
    return this.dividendStocks.has(symbol);
  }

  private getCacheKey(symbol: string): string {
    return this.LOCAL_STORAGE_KEY + "_" + symbol;
  }

  private cacheResponse(response: Dividends, symbol: string) {
    this.cacheService.save(this.getCacheKey(symbol), this.CACHE_EXPIRATION_MILLIS, response);
  }
}
