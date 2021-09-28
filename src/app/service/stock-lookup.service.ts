import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockLookupResponse} from "../model/stock-lookup";
import {ApiKeys} from "../api-keys/api-keys";

@Injectable({
  providedIn: 'root'
})
export class StockLookupService {

  private readonly basePath = "https://finnhub.io/api/v1";

  constructor(private readonly http: HttpClient) {
  }

  public lookupStockByName(name: string): Promise<StockLookupResponse> {
    return this.http.get<StockLookupResponse>(`${this.basePath}/search?q=${name}&token=${ApiKeys.FINNHUB_API_KEY}`)
      .toPromise();
  }

  public getCompanyProfile(symbol: string): Promise<StockLookupResponse> {
    return this.http.get<StockLookupResponse>(`${this.basePath}/search?q=${name}&token=${ApiKeys.FINNHUB_API_KEY}`)
      .toPromise();
  }
}
