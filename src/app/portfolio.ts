export type Portfolio = {
  positions: Position[]
}

export type Position = {
  symbol: string,
  stockCount: number,
  buyPrice: number,
  owner: string
}
