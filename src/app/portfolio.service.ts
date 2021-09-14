import { Injectable } from '@angular/core';
import {Portfolio} from "./portfolio";

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
          stockCount: 60,
          buyPrice: 46.62,
          owner: "Sergei"
        },
        {
          symbol: "MSF",
          stockCount: 19,
          buyPrice: 95.53,
          owner: "Sergei"
        },
        {
          symbol: "CSA",
          stockCount: 16,
          buyPrice: 183,
          owner: "Sergei"
        },
        {
          symbol: "RTS2",
          stockCount: 235,
          buyPrice: 15.5,
          owner: "Olga"
        },
        {
          symbol: "XONA",
          stockCount: 91,
          buyPrice: 37.04,
          owner: "Olga"
        },
        {
          symbol: "SOBA",
          stockCount: 180,
          buyPrice: 24.01,
          owner: "Olga"
        },
        {
          symbol: "SOBA",
          stockCount: 35,
          buyPrice: 27.29,
          owner: "Sergei"
        },
        {
          symbol: "WX2",
          stockCount: 37,
          buyPrice: 75.5,
          owner: "Olga"
        },
        {
          symbol: "WX2",
          stockCount: 8,
          buyPrice: 75.5,
          owner: "Andrei"
        },
        {
          symbol: "PEP",
          stockCount: 24,
          buyPrice: 119.12,
          owner: "Olga"
        },
        {
          symbol: "WDP",
          stockCount: 20,
          buyPrice: 138.38,
          owner: "Sergei"
        },
        {
          symbol: "LUK",
          stockCount: 30,
          buyPrice: 87.28,
          owner: "Sergei"
        },
        {
          symbol: "PFE",
          stockCount: 44,
          buyPrice: 29.4,
          owner: "Sergei"
        },
        {
          symbol: "AIY",
          stockCount: 20,
          buyPrice: 50.64,
          owner: "Sergei"
        },
        {
          symbol: "AMZ",
          stockCount: 1,
          buyPrice: 2784,
          owner: "Sergei"
        },
        {
          symbol: "BCO",
          stockCount: 3,
          buyPrice: 330.2,
          owner: "Sergei"
        },
        {
          symbol: "11L1",
          stockCount: 20,
          buyPrice: 32.98,
          owner: "Sergei"
        },
        {
          symbol: "TEV",
          stockCount: 25,
          buyPrice: 20.08,
          owner: "Sergei"
        },
      ]
    });
  }
}
