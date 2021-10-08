export type Position = {
  symbol: string,
  stockCount: number,
  investments: number,
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
  profit: number
}

export type Portfolio = {
  investments: number,
  positions: Array<Position>
}
