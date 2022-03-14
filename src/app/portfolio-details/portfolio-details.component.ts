import {Component, OnInit} from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import {StockQuoteService} from "../service/stock-quote.service";
import {ActivatedRoute} from "@angular/router";
import {PortfolioPosition} from "../model/portfolio";
import {StockSymbolService} from "../service/stock-symbol.service";
import {StockLookupService} from "../service/stock-lookup.service";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {

  public logoMap: Map<string, string> = new Map<string, string>();
  public owner: string = "";
  public positions: Array<PortfolioPosition> = [];

  public pageSize = 6;

  constructor(private readonly portfolioService: PortfolioService,
              private readonly stockQuoteService: StockQuoteService,
              private readonly route: ActivatedRoute,
              private readonly stockSymbolService: StockSymbolService,
              private readonly stockLookupService: StockLookupService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.owner = params['owner'];
      this.loadPositionsForPage(0, this.pageSize);
    });
  }

  public onPageChanged(event: LazyLoadEvent) {
    if (event.first != undefined && event.rows != undefined) {
      //event.first = First row offset
      //event.rows = Number of rows per page
      const currentPage = event.first / event.rows + 1;
      this.loadPositionsForPage(currentPage - 1, event.rows);
    }
  }

  private loadPositionsForPage(page: number, pageSize: number): void {
    this.portfolioService.getPositionsByOwner(this.owner, page, pageSize).then(ownerPositions => {
      let currentPositions = ownerPositions.filter(position => position.stockCount !== 0);
      let symbols = [...new Set(currentPositions.map(position => position.symbol))];
      let usSymbols = [...new Set(currentPositions.map(position => position.usSymbol))];

      usSymbols.forEach(symbol => {
        this.stockLookupService.getCompanyProfile(symbol).then(companyProfile => {
          this.logoMap.set(symbol, companyProfile.logo);
        });
      });

      this.stockQuoteService.getQuotes(symbols).then(quotes => {
        let quotesMap: Map<string, number> = new Map(quotes.map(quote => [quote.symbol, quote.price]));

        this.positions = currentPositions.map(position => {
          let currentValue = this.getValue(quotesMap, position.symbol) * position.stockCount;

          return {
            symbol: position.symbol,
            usSymbol: position.usSymbol,
            name: position.name,
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
