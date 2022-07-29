import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CompanyProfile, StockLookupResponse} from "../model/stock-lookup";
import {tap} from "rxjs/operators";
import {CacheService} from "./cache.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockLookupService {

  private readonly basePath = "https://finnhub.io/api/v1";

  private readonly LOCAL_STORAGE_KEY = "company_profile";

  private readonly CACHE_EXPIRATION_MILLIS = 24 * 60 * 60 * 1000;

  constructor(private readonly http: HttpClient, private readonly cacheService: CacheService) {
  }

  public lookupStockByName(name: string): Promise<StockLookupResponse> {
    return this.http.get<StockLookupResponse>(`${this.basePath}/search?q=${name}&token=${environment.finnhubApiKey}`)
      .toPromise();
  }

  public getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    console.log(`fetching company profile for ${symbol}`);
    let response = this.cacheService.load(this.getCacheKey(symbol));
    if (response == null) {
      console.log("Cache is empty, calling API");
      let headers = new HttpHeaders();
      return this.http.get<CompanyProfile>(`${this.basePath}/stock/profile2?symbol=${symbol}&token=${environment.finnhubApiKey}`)
        .pipe(tap(response => this.cacheResponse(response, symbol)))
        .toPromise();
    } else {
      console.log("Cache is found, returning from cache");
      return Promise.resolve(response);
    }
  }

  private cacheResponse(response: CompanyProfile, symbol: string) {
    this.cacheService.save(this.getCacheKey(symbol), this.CACHE_EXPIRATION_MILLIS, response);
    console.log(response);
  }

  private getCacheKey(symbol: string): string {
    return this.LOCAL_STORAGE_KEY + "_" + symbol;
  }
}
