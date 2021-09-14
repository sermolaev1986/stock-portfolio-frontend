import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Quotes} from "./quotes";
import {StockQuoteCacheService} from "./stock-quote-cache.service";

@Injectable({
  providedIn: 'root'
})
export class StockQuoteService {

  private readonly apiKey = "20b2192655a66e4941ad5fc81136e567";

  private readonly basePath = "http://api.marketstack.com/v1";

  constructor(private readonly http: HttpClient, private readonly cacheService: StockQuoteCacheService) {
  }

  public getQuotes(symbols: string[]): Promise<Quotes> {
    console.log(`fetching quotes for ${symbols.length} symbols: ${symbols}`);
    let quotes = this.cacheService.load();
    if (quotes == null) {
      console.log("Cache is empty, calling API");
      let headers = new HttpHeaders();
      return this.http.get<Quotes>(`${this.basePath}/eod/latest?symbols=${symbols.join(",")}&access_key=${this.apiKey}`,
        {headers: headers}).toPromise();
    } else {
      console.log("Cache is found, returning from cache");
      return Promise.resolve(quotes);
    }
  }

}
