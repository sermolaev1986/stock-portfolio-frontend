export type StockLookupResponse = {
  count: number;
  result: Array<StockLookupResult>;
}

export class StockLookupResult {

  constructor(public description: string, public symbol: string, public displaySymbol: string, public type: string) {
  }
}

export type CompanyProfile = {
  name: string;
  logo: string;
}
