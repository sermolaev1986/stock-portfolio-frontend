export type StockLookupResponse = {
  count: number;
  result: Array<StockLookupResult>;
}

export type StockLookupResult = {
  description: string;
  symbol: string;
  displaySymbol: string;
  type: string;
}

