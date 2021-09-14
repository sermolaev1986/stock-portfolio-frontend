import {Component, OnInit} from '@angular/core';
import {StockQuoteService} from "./stock-quote.service";
import {Quotes} from "./quotes";
import {StockQuoteCacheService} from "./stock-quote-cache.service";
import {PortfolioService} from "./portfolio.service";
import {Portfolio, Position} from "./portfolio";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sergeiData: any = [];
  andreiData: any = [];
  olgaData: any = [];

  basicOptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  private readonly exchangeSymbol = "XFRA";

  constructor(private readonly portfolioService: PortfolioService,
              private readonly stockQuoteService: StockQuoteService,
              private readonly cacheService: StockQuoteCacheService) {
  }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().then(portfolio => {
      let symbols = [...new Set(portfolio.positions.map(position => position.symbol))];
      symbols = symbols.map(symbol => this.appendExchangeSymbol(symbol));

      this.stockQuoteService.getQuotes(symbols).then(quotes => {
        this.cacheService.save(quotes);
        this.fillCharts(quotes, portfolio);
      });
    })
  }

  private appendExchangeSymbol(symbol: string) {
    return symbol + "." + this.exchangeSymbol;
  }

  fillCharts(quotes: Quotes, portfolio: Portfolio) {
    console.log(quotes);
    this.sergeiData = this.getData(quotes, portfolio.positions.filter(value => value.owner === "Sergei"));
    this.olgaData = this.getData(quotes, portfolio.positions.filter(value => value.owner === "Olga"));
    this.andreiData = this.getData(quotes, portfolio.positions.filter(value => value.owner === "Andrei"));
  }

  private getData(quotes: Quotes, positions: Position[]) {
    let data: Array<any> = [];
    positions.forEach(position => {
      data.push({
        name: position.symbol,
        price: quotes.data.find(quote => quote.symbol === this.appendExchangeSymbol(position.symbol))?.close
      });
    });

    console.log(data);

    return {
      labels: data.map(item => item.name),
      datasets: [
        {
          data: data.map(item => item.price),
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D"
          ]
        }
      ]
    };
  }
}
