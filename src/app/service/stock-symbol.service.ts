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
    ["PRG", "Procter & Gamble"],
    ["2PP", "PayPal"],
    ["13T1", "TCS Group"],
    ["VWCE", "FTSE All-World"],
    ["VUAA", "S&P 500"],
    ["GQ9", "Gold Trust"],
    ["CCC3", "Coca-Cola"],
    ["AMD", "AMD"],
    ["NFC", "Netflix"],
    ["E3M", "EPAM"],
    ["FOO", "Salesforce"],
    ["NVD", "Nvidia"]
  ]);

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

  public getNameForSymbol(symbol: string): string {
    let name = this.symbolToNameMap.get(symbol);
    if (name) {
      return name;
    } else {
      return symbol;
    }
  }

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
