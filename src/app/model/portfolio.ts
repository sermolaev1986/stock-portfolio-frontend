export type Position = {
  symbol: string,
  stockCount: number,
  buyPrice: number,
  buyDate: string,
  owner: string,
  dividends: number
}

export type PortfolioPosition = {
  symbol: string,
  name: string,
  stockCount: number,
  currentValue: number,
  buyValue: number,
  buyDate: string,
  dividendsTotalAmountPaid: number,
  lastDividendDate: string,
  lastDividendAmount: number
}
