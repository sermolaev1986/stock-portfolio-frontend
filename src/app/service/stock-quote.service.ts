import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Quote} from "../model/quotes";
import {Paths} from "../constants/paths";

type YahooQuote = {
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class StockQuoteService {

  private readonly basePath = Paths.HEROKU_API_PATH;

  constructor(private readonly http: HttpClient) {
  }

  public getQuotes(symbols: string[]): Promise<Array<Quote>> {
    console.log(`fetching quotes for ${symbols.length} symbols: ${symbols}`);
    let symbolString = symbols.join(",");
    return this.http.get<Array<Quote>>(`${this.basePath}/quotes?symbols=${symbolString}`)
      .toPromise();
  }

  public getQuote(symbol: string): Promise<YahooQuote> {
    return this.http.get<YahooQuote>(`${Paths.HEROKU_API_PATH}/quotes/${symbol}`)
      .toPromise();
  }

}
