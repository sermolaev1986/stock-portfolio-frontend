import {Component, OnInit} from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import {DividendService} from "../service/dividend.service";
import {StockQuoteService} from "../service/stock-quote.service";
import {ActivatedRoute} from "@angular/router";
import {PortfolioPosition} from "../model/portfolio";
import {StockSymbolService} from "../service/stock-symbol.service";
import {Dividends, SplitAdjustedDividend} from "../model/dividends";
import {StockSplitService} from "../service/stock-split.service";
import {ExchangeRatesService} from "../service/exchange-rates.service";

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {

  public positions: Array<PortfolioPosition> = [];

  public dividends: Array<SplitAdjustedDividend> = [];
  private dividendMap: Map<string, SplitAdjustedDividend> = new Map<string, SplitAdjustedDividend>();

  constructor(private readonly portfolioService: PortfolioService,
              private readonly dividendService: DividendService,
              private readonly stockQuoteService: StockQuoteService,
              private readonly route: ActivatedRoute,
              private readonly stockSymbolService: StockSymbolService,
              private readonly stockSplitService: StockSplitService,
              private readonly exchangeRatesService: ExchangeRatesService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let owner = params['owner'];
      this.portfolioService.getPortfolio().then(portfolio => {
        let symbols = [...new Set(portfolio.positions.map(position => position.symbol))];

        this.stockQuoteService.getQuotes(symbols).then(quotes => {
          let quotesMap: Map<string, number> = new Map(quotes.data.map(quote => [quote.symbol, quote.close]));

          let ownerPositions = portfolio.positions.filter(value => value.owner === owner);
          this.positions = ownerPositions.map(position => {
            return {
              symbol: position.symbol,
              name: this.stockSymbolService.getNameForSymbol(position.symbol),
              stockCount: position.stockCount,
              currentValue: this.getValue(quotesMap, this.stockSymbolService.appendExchangeSymbol(position.symbol)) * position.stockCount,
              buyValue: position.buyPrice * position.stockCount,
              dividendsTotalAmountPaid: 0,
              lastDividendDate: "",
              lastDividendAmount: 0
            }
          });

          ownerPositions.forEach(ownerPosition => {
            if (this.dividendService.isDividendStock(ownerPosition.symbol)) {
              this.dividendService.getDividends(ownerPosition.symbol, ownerPosition.buyDate).then((dividends: Dividends) => {
                this.stockSplitService.getSplits(ownerPosition.symbol).then(splits => {
                  let splitsAfterBuy = splits.results
                    .filter(split => new Date(split.paymentDate).getTime() > new Date(ownerPosition.buyDate).getTime());

                  let splitAdjustedDividends = dividends.results
                    .filter(dividend => new Date(dividend.paymentDate).getTime() > new Date(ownerPosition.buyDate).getTime())
                    .map(dividend => {
                      let splitAdjustedStockCount = ownerPosition.stockCount;
                      splitsAfterBuy
                        .filter(split => new Date(dividend.paymentDate).getTime() > new Date(split.paymentDate).getTime())
                        .forEach(split => {
                          splitAdjustedStockCount = splitAdjustedStockCount / split.ratio;
                        });
                      let dollarBruttoAmount = splitAdjustedStockCount * dividend.amount;
                      //15% Quellensteuer
                      let dollarNettoAmount = dollarBruttoAmount * 0.85;

                      return new SplitAdjustedDividend(splitAdjustedStockCount,
                        dividend.amount,
                        dollarBruttoAmount,
                        dollarNettoAmount,
                        dividend.paymentDate);
                    });

                  let pos = this.positions.find(x => x.symbol === ownerPosition.symbol);
                  if (ownerPosition.symbol === "APC") {
                    this.dividendMap = splitAdjustedDividends.reduce(function(map, obj) {
                      map.set(obj.paymentDate, obj);
                      return map;
                    }, new Map<string, SplitAdjustedDividend>());

                    this.dividends = splitAdjustedDividends;
                  }

                  splitAdjustedDividends.forEach(splitAdjustedDividend => {
                    this.exchangeRatesService.getExchangeRates(splitAdjustedDividend.paymentDate).then(exchangeRate => {
                      if (pos) {
                        // @ts-ignore
                        let euroBruttoAmount = splitAdjustedDividend.dollarNettoAmount / exchangeRate.rates["USD"];
                        //12.5 Steuer: 12.5 + 15 = 27.5
                        let euroNettoAmount = euroBruttoAmount * 0.875;
                        pos.dividendsTotalAmountPaid += euroNettoAmount;

                        if (pos.symbol === "APC") {
                          let div = this.dividendMap.get(splitAdjustedDividend.paymentDate);
                          if(div) {
                            div.euroBruttoAmount = euroBruttoAmount;
                            div.euroNettoAmount = euroNettoAmount;
                          }
                        }
                      }

                    });
                  });
                });
              });
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

}
