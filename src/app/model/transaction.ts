export type Transaction = {
  stockSymbol: string;
  stockCount: number;
  date: Date;
  type: string;
  owner: string,
  broker: string,
  price: number;
}

export type HerokuTransaction = {
  symbol: string;
  argument: number;
  operator: string;
  date: Date;
  owner: string;
  price: number;
}

