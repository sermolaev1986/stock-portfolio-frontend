import {Component, Inject, OnInit} from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import {Portfolio, Position} from "../model/portfolio";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  overallPortfolio: Portfolio | undefined;
  andreiPortfolio: Portfolio | undefined;
  sergeiPortfolio: Portfolio | undefined;
  olgaPortfolio: Portfolio | undefined;

  constructor(private readonly portfolioService: PortfolioService, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().then(portfolio => {
      // @ts-ignore
      this.andreiPortfolio = portfolio["Andrei"];
      // @ts-ignore
      this.sergeiPortfolio = portfolio["Sergei"];
      // @ts-ignore
      this.olgaPortfolio = portfolio["Olga"];

      const map = new Map<string, Position>();
      this.andreiPortfolio.positions.forEach(item => this.mergePosition(map, item));
      this.sergeiPortfolio.positions.forEach(item => this.mergePosition(map, item));
      this.olgaPortfolio.positions.forEach(item => this.mergePosition(map, item));

      this.overallPortfolio = {
        investments: this.andreiPortfolio.investments + this.sergeiPortfolio.investments + this.olgaPortfolio.investments,
        positions: Array.from(map.values())
      }
    })
  }

  private mergePosition(map: Map<string, Position>, item: Position) {
    let position = map.get(item.symbol)
    if (position) {
      map.set(item.symbol, {
        symbol: item.symbol,
        usSymbol: item.usSymbol,
        name: item.name,
        type: item.type,
        stockCount: item.stockCount + position.stockCount,
        investments: item.investments + position.investments,
        dividends: item.dividends + position.dividends,
        owner: 'Overall',
        buyDate: null
      });
    } else {
      map.set(item.symbol, item)
    }
  }

  onSchemeChange() {
    this.document.body.classList.toggle('bold-scheme');
  }
}
