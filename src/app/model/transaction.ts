import {StockLookupResult} from "./stock-lookup";

export type Transaction = {
  stock: StockLookupResult;
  argument: string;
  date: Date;
  type: string;
  owner: string,
  broker: string,
  price?: number;
}

export type HerokuTransaction = {
  symbol: string;
  argument: string;
  operator: string;
  date: Date;
  owner: string;
  broker: string;
  price?: number;
}

