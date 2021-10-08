import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {tap} from "rxjs/operators";
import {ExchangeRates} from "../model/exchangeRates";
import {ApiKeys} from "../constants/api-keys";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  private readonly basePath = "http://api.exchangeratesapi.io/v1";

  private readonly LOCAL_STORAGE_KEY = "exchange_rates";

  private readonly CACHE_EXPIRATION_MILLIS = 100 * 24 * 60 * 60 * 1000;

  constructor(private readonly http: HttpClient, private readonly cacheService: CacheService) {
  }

  public getExchangeRates(date: string): Promise<ExchangeRates> {
    console.log(`fetching exchange rates for ${date}`);
    let exchangeRates = this.cacheService.load(this.LOCAL_STORAGE_KEY + "_" + date);
    if (exchangeRates == null) {
      console.log("Cache is empty, calling API");
      let headers = new HttpHeaders();
      return this.http.get<ExchangeRates>(`${this.basePath}/${date}?access_key=${ApiKeys.EXCHANGE_RATES_API_KEY}`,
        {headers: headers})
        .pipe(tap(response => this.cacheResponse(response, date)))
        .toPromise();
    } else {
      console.log("Cache is found, returning from cache");
      return Promise.resolve(exchangeRates);
    }
  }

  private getCacheKey(date: string): string {
    return this.LOCAL_STORAGE_KEY + "_" + date;
  }

  private cacheResponse(response: ExchangeRates, date: string) {
    this.cacheService.save(this.getCacheKey(date), this.CACHE_EXPIRATION_MILLIS, response);
    console.log(response);
  }
}
