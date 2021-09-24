import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockSymbolService {

  private readonly exchangeSymbol = "XFRA";

  private readonly symbolToNameMap = new Map([
    ["APC", "Apple"],
    ["MSF", "Microsoft"],
    ["CSA", "Accenture"],
    ["RTS2", "Severstal"],
    ["XONA", "Exxon"],
    ["SOBA", "AT&T"],
    ["WX2", "FRIT"],
    ["PEP", "Pepsi"],
    ["WDP", "Disney"],
    ["AMZ", "Amazon"],
    ["LUK", "Lukoil"],
    ["PFE", "Pfizer"],
    ["AIY", "Blizzard"],
    ["BCO", "Boeing"],
    ["11L1", "Canopy Growth"],
    ["TEV", "Teva"],
    ["1YD", "Broadcom"],
    ["HDI", "Home Depot"],
    ["PRG", "Procter & Gamble"]
  ]);

  private readonly usSymbolMap = new Map([
    ["APC", "AAPL"],
    ["MSF", "MSFT"],
    ["CSA", "ACN"],
    // ["RTS2", "RTS2"],
    ["XONA", "XOM"],
    // ["SOBA", "AT&T"],
    ["WX2", "FRT"],
    ["PEP", "PEP"],
    ["WDP", "DIS"],
    ["AMZ", "AMZN"],
    // ["LUK", "Lukoil"],
    ["PFE", "PFE"],
    ["AIY", "ATVI"],
    ["BCO", "BA"],
    ["11L1", "CGC"],
    ["TEV", "TEVA"],
    ["1YD", "AVGO"],
    ["HDI", "HD"],
    ["PRG", "PG"]
  ]);

  constructor() { }

  public getNameForSymbol(symbol: string): string {
    let name = this.symbolToNameMap.get(symbol);
    if (name) {
      return name;
    } else {
      return symbol;
    }
  }

  public getUsSymbol(symbol: string) {
    return this.usSymbolMap.get(symbol);
  }

  public appendExchangeSymbol(symbol: string) {
    return symbol + "." + this.exchangeSymbol;
  }
}
