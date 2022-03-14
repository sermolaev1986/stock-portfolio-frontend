import {Component, OnInit} from '@angular/core';
import {PortfolioPosition} from "../model/portfolio";
import {PortfolioService} from "../service/portfolio.service";
import {StockQuoteService} from "../service/stock-quote.service";
import {ActivatedRoute} from "@angular/router";
import {StockSymbolService} from "../service/stock-symbol.service";
import {StockLookupService} from "../service/stock-lookup.service";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-sold-positions',
  templateUrl: './sold-positions.component.html',
  styleUrls: ['./sold-positions.component.css']
})
export class SoldPositionsComponent implements OnInit {

  public logoMap: Map<string, string> = new Map<string, string>();
  public soldPositions: Array<PortfolioPosition> = [];
  public owner: string = "";

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
    this.portfolioService.getSoldPositionsByOwner(this.owner, page, pageSize).then(soldPositions => {
      this.soldPositions = soldPositions
        .map(position => {
          return {
            symbol: position.symbol,
            usSymbol: position.usSymbol,
            name: position.name,
            stockCount: position.stockCount,
            currentValue: 0,
            buyValue: position.investments,
            buyDate: position.buyDate,
            dividendsTotalAmountPaid: position.dividends,
            profit: position.investments * -1
          }
        });

      this.soldPositions
        .map(position => position.usSymbol)
        .forEach(symbol => {
          this.stockLookupService.getCompanyProfile(symbol).then(companyProfile => {
            this.logoMap.set(symbol, companyProfile.logo);
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
