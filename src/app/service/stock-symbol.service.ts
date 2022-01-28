import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockSymbolService {

  private readonly exchangeSymbol = "XFRA";

  private readonly usSymbolMap = new Map([
    ["APC", "AAPL"],
    ["MSF", "MSFT"],
    ["CSA", "ACN"],
    ["RTS2", "SVJTY"],
    ["XONA", "XOM"],
    ["SOBA", "T"],
    ["WX2", "FRT"],
    ["PEP", "PEP"],
    ["WDP", "DIS"],
    ["AMZ", "AMZN"],
    ["LUK", "LKOH"],
    ["PFE", "PFE"],
    ["AIY", "ATVI"],
    ["BCO", "BA"],
    ["11L1", "CGC"],
    ["TEV", "TEVA"],
    ["1YD", "AVGO"],
    ["HDI", "HD"],
    ["PRG", "PG"],
    ["2PP", "PYPL"],
    ["13T1", "TCSG"],
    ["CCC3", "KO"],
    ["NFC", "NFLX"],
    ["E3M", "EPAM"],
    ["FOO", "CRM"],
    ["NVD", "NVDA"],
    ["AMD", "AMD"]
  ]);

  constructor() { }

  public getUsSymbol(symbol: string): string {
    let name = this.usSymbolMap.get(symbol);
    if (name) {
      return name;
    } else {
      return symbol;
    }
  }

  public appendExchangeSymbol(symbol: string) {
    return symbol + "." + this.exchangeSymbol;
  }
}
