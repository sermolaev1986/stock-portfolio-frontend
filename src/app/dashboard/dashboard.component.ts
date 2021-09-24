import {Component, OnInit} from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import {StockQuoteService} from "../service/stock-quote.service";
import {Portfolio, Position} from "../model/portfolio";
import {formatCurrency} from "@angular/common";
import {StockSymbolService} from "../service/stock-symbol.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sergeiData: any = [];
  andreiData: any = [];
  olgaData: any = [];

  public andreiTotalExpenses = "";
  public andreiTotalProfit = "";

  public sergeiTotalExpenses = "";
  public sergeiTotalProfit = "";

  public olgaTotalExpenses = "";
  public olgaTotalProfit = "";

  basicOptions = {
    plugins: {
      legend: {
        display: false
      },
      responsive: true
    }
  };

  constructor(private readonly portfolioService: PortfolioService,
              private readonly stockQuoteService: StockQuoteService,
              private readonly stockSymbolService: StockSymbolService) {
  }

  ngOnInit(): void {
    // Chart.register(ChartDataLabels);

    this.portfolioService.getPortfolio().then(portfolio => {
      let symbols = [...new Set(portfolio.positions.map(position => position.symbol))];
      symbols = symbols.map(symbol => this.stockSymbolService.appendExchangeSymbol(symbol));

      this.stockQuoteService.getQuotes(symbols).then(quotes => {
        let quotesMap: Map<string, number> = new Map(quotes.data.map(quote => [quote.symbol, quote.close]));
        console.log(quotesMap);

        this.fillCharts(quotesMap, portfolio);
      });
    })
  }

  fillCharts(quotesMap: Map<string, number>, portfolio: Portfolio) {
    let sergeiPositions = portfolio.positions.filter(value => value.owner === "Sergei");
    let olgaPositions = portfolio.positions.filter(value => value.owner === "Olga");
    let andreiPositions = portfolio.positions.filter(value => value.owner === "Andrei");

    let andreiTotalExpenses = this.getTotalExpenses(andreiPositions);
    let olgaTotalExpenses = this.getTotalExpenses(olgaPositions);
    let sergeiTotalExpenses = this.getTotalExpenses(sergeiPositions);

    this.andreiTotalExpenses = this.formatToCurrencyString(andreiTotalExpenses);
    this.olgaTotalExpenses = this.formatToCurrencyString(olgaTotalExpenses);
    this.sergeiTotalExpenses = this.formatToCurrencyString(sergeiTotalExpenses);

    this.andreiTotalProfit = this.formatToCurrencyString(this.getTotalProfit(andreiTotalExpenses, andreiPositions, quotesMap));
    this.olgaTotalProfit = this.formatToCurrencyString(this.getTotalProfit(olgaTotalExpenses, olgaPositions, quotesMap));
    this.sergeiTotalProfit = this.formatToCurrencyString(this.getTotalProfit(sergeiTotalExpenses, sergeiPositions, quotesMap));

    this.sergeiData = this.getData(quotesMap, sergeiPositions);
    this.olgaData = this.getData(quotesMap, olgaPositions);
    this.andreiData = this.getData(quotesMap, andreiPositions);
  }

  private getTotalExpenses(positions: Position[]): number {
    return positions
      .map(position => position.buyPrice * position.stockCount)
      .reduce((a, b) => a + b);
  }

  private formatToCurrencyString(amount: number): string {
    return formatCurrency(amount, "de-AT", "EUR");
  }

  private getTotalProfit(expenses: number, positions: Position[], quotesMap: Map<string, number>): number {
    let currentPortfolioValue = positions
      .map(position => this.getValue(quotesMap, this.stockSymbolService.appendExchangeSymbol(position.symbol)) * position.stockCount)
      .reduce((a, b) => a + b);
    return currentPortfolioValue - expenses;
  }

  private getValue(map: Map<string, number>, key: string): number {
    let value = map.get(key);
    if (!value) {
      value = 0;
    }
    return value;
  }

  private getData(quotesMap: Map<string, number>, positions: Position[]) {


    let data: Array<any> = [];
    positions.forEach(position => {
      data.push({
        name: this.stockSymbolService.getNameForSymbol(position.symbol),
        price: this.getValue(quotesMap, this.stockSymbolService.appendExchangeSymbol(position.symbol)) * position.stockCount
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
            "#FFA726",
            "#62929E",
            "#4A6D7C",
            "#9AD1D4",
            "#FCE762",
            "#4F4789",
            "#CBE896",
            "#AD5D4E",
            "#EB6534",
            "#E85F5C",
            "#FFDAC6",
            "#7C6A0A"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D",
            "#62929E",
            "#4A6D7C",
            "#9AD1D4",
            "#FCE762",
            "#4F4789",
            "#CBE896",
            "#AD5D4E",
            "#EB6534",
            "#E85F5C",
            "#FFDAC6",
            "#7C6A0A"
          ]
        }
      ]
    };
  }

}
