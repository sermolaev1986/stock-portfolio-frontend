export type Portfolio = {
  positions: Position[]
}

export type Position = {
  symbol: string,
  stockCount: number,
  buyPrice: number,
  buyDate: string,
  owner: string
}

export type PortfolioPosition = {
  symbol: string,
  name: string,
  stockCount: number,
  currentValue: number,
  buyValue: number,
  dividendsTotalAmountPaid: number,
  lastDividendDate: string,
  lastDividendAmount: number
}
