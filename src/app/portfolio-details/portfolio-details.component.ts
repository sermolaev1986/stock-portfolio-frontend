import {Component, OnInit} from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import {StockQuoteService} from "../service/stock-quote.service";
import {ActivatedRoute} from "@angular/router";
import {PortfolioPosition} from "../model/portfolio";
import {StockSymbolService} from "../service/stock-symbol.service";
import {StockLookupService} from "../service/stock-lookup.service";
import {PercentPipe} from "@angular/common";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {

  public logoMap: Map<string, string> = new Map<string, string>();
  public owner: string = "";
  public positions: Array<PortfolioPosition> = [];
  public soldPositions: Array<PortfolioPosition> = [];

  constructor(private readonly portfolioService: PortfolioService,
              private readonly stockQuoteService: StockQuoteService,
              private readonly route: ActivatedRoute,
              private readonly stockSymbolService: StockSymbolService,
              private readonly stockLookupService: StockLookupService,
              private readonly percentPipe: PercentPipe) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.owner = params['owner'];
      this.portfolioService.getPositionsByOwner(this.owner).then(ownerPositions => {
        this.soldPositions = ownerPositions
          .filter(position => position.stockCount === 0)
          .map(position => {
            return {
              symbol: position.symbol,
              name: this.stockSymbolService.getNameForSymbol(position.symbol),
              stockCount: position.stockCount,
              currentValue: 0,
              buyValue: position.investments,
              buyDate: position.buyDate,
              dividendsTotalAmountPaid: position.dividends,
              profit: position.investments * -1
            }
          });


        let currentPositions = ownerPositions.filter(position => position.stockCount !== 0);
        let symbols = [...new Set(currentPositions.map(position => position.symbol))];

        symbols.forEach(symbol => {
          this.stockLookupService.getCompanyProfile(this.stockSymbolService.getUsSymbol(symbol)).then(companyProfile => {
            this.logoMap.set(symbol, companyProfile.logo);
          });
        });

        this.stockQuoteService.getQuotes(symbols.map(value => this.stockSymbolService.appendExchangeSymbol(value))).then(quotes => {
          let quotesMap: Map<string, number> = new Map(quotes.data.map(quote => [quote.symbol, quote.close]));

          this.positions = currentPositions.map(position => {
            let currentValue = this.getValue(quotesMap, this.stockSymbolService.appendExchangeSymbol(position.symbol)) * position.stockCount;

            return {
              symbol: position.symbol,
              name: this.stockSymbolService.getNameForSymbol(position.symbol),
              stockCount: position.stockCount,
              currentValue: currentValue,
              buyValue: position.investments,
              buyDate: position.buyDate,
              dividendsTotalAmountPaid: position.dividends,
              profit: (currentValue - position.investments) / position.investments
            }
          });

        });
      })
    });
  }

  private getValue(map: Map<string, number>, key: string): number {
    let value = map.get(key);
    if (!value) {
      value = 0;
    }
    return value;
  }

  public getStringValue(value: string | null): string {
    return value ? value : "";
  }

}
