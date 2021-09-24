export type Dividends = {
  results: Dividend[]
}

export type Dividend = {
  ticker: string,
  paymentDate: string,
  amount: number,
}

export class SplitAdjustedDividend {
  set euroNettoAmount(value: number) {
    this._euroNettoAmount = value;
  }
  set euroBruttoAmount(value: number) {
    this._euroBruttoAmount = value;
  }

  get euroBruttoAmount(): number {
    return this._euroBruttoAmount;
  }

  get euroNettoAmount(): number {
    return this._euroNettoAmount;
  }

  private _euroBruttoAmount: number = 0;
  private _euroNettoAmount: number = 0;

  constructor(public readonly stockCount: number,
              public readonly amountPerShare: number,
              public readonly dollarBruttoAmount: number,
              public readonly dollarNettoAmount: number,
              public readonly paymentDate: string) {
  }

}
