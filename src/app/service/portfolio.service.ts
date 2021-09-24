import { Injectable } from '@angular/core';
import {Portfolio} from "../model/portfolio";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  public getPortfolio(): Promise<Portfolio> {
    return Promise.resolve({
      positions: [
        {
          symbol: "APC",
          stockCount: 15,
          buyPrice: 46.62,
          buyDate: "2018-11-12",
          owner: "Sergei"
        },
        {
          symbol: "MSF",
          stockCount: 19,
          buyPrice: 95.53,
          buyDate: "2018-11-13",
          owner: "Sergei"
        },
        {
          symbol: "CSA",
          stockCount: 16,
          buyPrice: 183,
          buyDate: "2019-12-02",
          owner: "Sergei"
        },
        {
          symbol: "RTS2",
          stockCount: 227,
          buyPrice: 15.5,
          buyDate: "2021-01-15",
          owner: "Olga"
        },
        {
          symbol: "RTS2",
          stockCount: 8,
          buyPrice: 19.5,
          buyDate: "2021-09-15",
          owner: "Andrei"
        },
        {
          symbol: "1YD",
          stockCount: 5,
          buyPrice: 421.1,
          buyDate: "2021-09-10",
          owner: "Olga"
        },
        {
          symbol: "HDI",
          stockCount: 9,
          buyPrice: 283.5,
          buyDate: "2021-09-13",
          owner: "Olga"
        },
        {
          symbol: "XONA",
          stockCount: 91,
          buyPrice: 37.04,
          buyDate: "2020-12-22",
          owner: "Olga"
        },
        {
          symbol: "SOBA",
          stockCount: 80,
          buyPrice: 24.1,
          buyDate: "2020-12-22",
          owner: "Olga"
        },
        {
          symbol: "SOBA",
          stockCount: 35,
          buyPrice: 27.29,
          buyDate: "2018-11-09",
          owner: "Sergei"
        },
        {
          symbol: "WX2",
          stockCount: 37,
          buyPrice: 75.5,
          buyDate: "2020-12-11",
          owner: "Olga"
        },
        {
          symbol: "WX2",
          stockCount: 8,
          buyPrice: 75.5,
          buyDate: "2020-12-11",
          owner: "Andrei"
        },
        {
          symbol: "PEP",
          stockCount: 24,
          buyPrice: 119.12,
          buyDate: "2020-12-28",
          owner: "Olga"
        },
        {
          symbol: "WDP",
          stockCount: 20,
          buyPrice: 138.38,
          buyDate: "2019-12-02",
          owner: "Sergei"
        },
        {
          symbol: "AMZ",
          stockCount: 1,
          buyPrice: 2784,
          buyDate: "2021-08-30",
          owner: "Sergei"
        },
        {
          symbol: "LUK",
          stockCount: 30,
          buyPrice: 87.28,
          buyDate: "2019-12-02",
          owner: "Sergei"
        },
        {
          symbol: "PFE",
          stockCount: 44,
          buyPrice: 29.4,
          buyDate: "2020-03-20",
          owner: "Sergei"
        },
        {
          symbol: "AIY",
          stockCount: 20,
          buyPrice: 50.64,
          buyDate: "2018-11-09",
          owner: "Sergei"
        },
        {
          symbol: "BCO",
          stockCount: 3,
          buyPrice: 330.2,
          buyDate: "2019-03-15",
          owner: "Sergei"
        },
        {
          symbol: "11L1",
          stockCount: 20,
          buyPrice: 32.98,
          buyDate: "2018-11-05",
          owner: "Sergei"
        },
        {
          symbol: "TEV",
          stockCount: 25,
          buyPrice: 20.08,
          buyDate: "2018-11-05",
          owner: "Sergei"
        },
        {
          symbol: "PRG",
          stockCount: 19,
          buyPrice: 122.2,
          buyDate: "2021-09-17",
          owner: "Olga"
        },
        {
          symbol: "AMD",
          stockCount: 22,
          buyPrice: 92.19,
          buyDate: "2021-09-07",
          owner: "Sergei"
        },
        {
          symbol: "2PP",
          stockCount: 8,
          buyPrice: 247.2,
          buyDate: "2021-09-07",
          owner: "Sergei"
        },
        {
          symbol: "13T1",
          stockCount: 20,
          buyPrice: 81,
          buyDate: "2021-09-07",
          owner: "Sergei"
        }
      ]
    });
  }
}
