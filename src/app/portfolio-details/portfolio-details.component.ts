import {Component, OnInit} from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import {StockQuoteService} from "../service/stock-quote.service";
import {ActivatedRoute} from "@angular/router";
import {PortfolioPosition, PositionsResponse} from "../model/portfolio";
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
  public allPositions: Array<PortfolioPosition> = [];

  public pageSize = 6;
  public totalPositions = 0;

  private currentPage = 0;
  private sortDirection = 'ASC';
  public isSomePositionsSold = false;
  public loading = true;
  public showSoldPositions = false;
  public sortOnBackend = true;

  constructor(private readonly portfolioService: PortfolioService,
              private readonly stockQuoteService: StockQuoteService,
              private readonly route: ActivatedRoute,
              private readonly stockSymbolService: StockSymbolService,
              private readonly stockLookupService: StockLookupService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.owner = params['owner'];
      if (this.owner === "Overall") {
        this.pageSize = 100;
        this.sortOnBackend = false;
      }

      this.loadPositionsForPage();
    });
  }

  public onPageChanged(event: LazyLoadEvent) {
    this.loading = true;
    if (event.first != undefined && event.rows != undefined) {
      //event.first = First row offset
      //event.rows = Number of rows per page
      const currentPage = event.first / event.rows + 1;
      this.currentPage = currentPage - 1;

      this.sortDirection = event.sortOrder > 0 ? 'ASC' : 'DESC';
      this.loadPositionsForPage();
    }
  }

  public onSearchByName(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    if (value.length >= 3) {
      this.currentPage = 0;
      this.loading = true;
      this.portfolioService.getPositionsByOwner(this.owner, this.currentPage, this.pageSize, 'stock.name', this.sortDirection, value).then(positionsResponse => {
        this.renderPositions(positionsResponse);
      });
    } else if (value.length === 0) {
      this.currentPage = 0;
      this.loading = true;
      this.loadPositionsForPage();
    }
  }

  private loadPositionsForPage(): void {
    this.portfolioService.getPositionsByOwner(this.owner, this.currentPage, this.pageSize, 'stock.name', this.sortDirection).then(positionsResponse => {
      this.renderPositions(positionsResponse);
    });
  }

  private renderPositions(positionsResponse: PositionsResponse) {
    this.totalPositions = positionsResponse.totalPositions;
    let currentPositions = positionsResponse.positions;
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
          profit: position.stockCount > 0 ? (currentValue - position.investments) / position.investments : position.investments * -0.725
        }
      });

      this.allPositions = this.positions;
      this.onShowSoldPositionChange();

      this.loading = false;

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

  public onShowSoldPositionChange() {
    if (this.showSoldPositions) {
      this.positions = this.allPositions;
    } else {
      this.positions = this.allPositions.filter(value => value.stockCount !== 0);
    }

  }
}
