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

  private dividendByDateMap: Map<string, Map<string, SplitAdjustedDividend>> = new Map<string, Map<string, SplitAdjustedDividend>>();
  private dividendsBySymbolMap: Map<string, Array<SplitAdjustedDividend>> = new Map<string, Array<SplitAdjustedDividend>>();

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
      this.portfolioService.getPortfolio().then(positions => {
        let symbols = [...new Set(positions.map(position => position.symbol))];

        this.stockQuoteService.getQuotes(symbols).then(quotes => {
          let quotesMap: Map<string, number> = new Map(quotes.data.map(quote => [quote.symbol, quote.close]));

          let ownerPositions = positions.filter(value => value.owner === owner);
          this.positions = ownerPositions.map(position => {
            return {
              symbol: position.symbol,
              name: this.stockSymbolService.getNameForSymbol(position.symbol),
              stockCount: position.stockCount,
              currentValue: this.getValue(quotesMap, this.stockSymbolService.appendExchangeSymbol(position.symbol)) * position.stockCount,
              buyValue: position.buyPrice * position.stockCount,
              buyDate: position.buyDate,
              dividendsTotalAmountPaid: 0,
              lastDividendDate: "",
              lastDividendAmount: 0
            }
          });

          ownerPositions.forEach(ownerPosition => {
            this.dividendService.getDividends(ownerPosition.symbol, ownerPosition.buyDate).then((dividends: Dividends) => {
              this.stockSplitService.getSplits(ownerPosition.symbol).then(splits => {
                let splitsAfterBuy = splits.results
                  .filter(split => new Date(split.paymentDate).getTime() > new Date(ownerPosition.buyDate).getTime());

                let splitAdjustedDividends = dividends.results
                  .filter(dividend => new Date(dividend.paymentDate).getTime() > new Date(ownerPosition.buyDate).getTime())
                  .filter(dividend => new Date(dividend.exDate).getTime() > new Date(ownerPosition.buyDate).getTime())
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
                this.dividendByDateMap.set(ownerPosition.symbol, splitAdjustedDividends.reduce(function (map, obj) {
                  map.set(obj.paymentDate, obj);
                  return map;
                }, new Map<string, SplitAdjustedDividend>()));

                this.dividends = splitAdjustedDividends;
                this.dividendsBySymbolMap.set(ownerPosition.symbol, splitAdjustedDividends);

                splitAdjustedDividends.forEach(splitAdjustedDividend => {
                  if (new Date(splitAdjustedDividend.paymentDate).getTime() > new Date().getTime()) {

                  } else {
                    this.exchangeRatesService.getExchangeRates(splitAdjustedDividend.paymentDate).then(exchangeRate => {
                      if (pos) {
                        // @ts-ignore
                        let euroBruttoAmount = splitAdjustedDividend.dollarNettoAmount / exchangeRate.rates["USD"];
                        //12.5 Steuer: 12.5 + 15 = 27.5
                        let euroNettoAmount = euroBruttoAmount * 0.875;
                        pos.dividendsTotalAmountPaid += euroNettoAmount;

                        let map = this.dividendByDateMap.get(ownerPosition.symbol);
                        if (map) {
                          let div = map.get(splitAdjustedDividend.paymentDate);
                          if (div) {
                            div.euroBruttoAmount = euroBruttoAmount;
                            div.euroNettoAmount = euroNettoAmount;
                          }
                        }
                      }
                    });
                  }

                });
              });
            });
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

  onDividendClick(symbol: string) {
    console.log(`symbol ${symbol} clicked`);
    let dividends = this.dividendsBySymbolMap.get(symbol);
    if (dividends) {
      this.dividends = dividends;
    } else {
      this.dividends = [];
    }
  }

  isPaymentDateInFuture(paymentDate: string):boolean {
    return new Date(paymentDate).getTime() > new Date().getTime();
  }
}
