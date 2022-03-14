import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockSymbolService {

  private readonly exchangeSymbol = "XFRA";

  constructor() { }

  public appendExchangeSymbol(symbol: string) {
    return symbol + "." + this.exchangeSymbol;
  }
}
