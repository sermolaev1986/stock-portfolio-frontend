import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Portfolio, Position} from "../model/portfolio";
import {StockSymbolService} from "../service/stock-symbol.service";
import {StockQuoteService} from "../service/stock-quote.service";
import {ChartData} from "./data";
import {PieChartService} from "../service/pie-chart.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnChanges {

  @Input("portfolio")
  portfolio: Portfolio | undefined;

  @Input()
  showPortfolioDetailsLink = true;

  @Input("owner")
  owner: string | undefined;

  public originalData: Array<ChartData>;
  public chartData: any;
  public totalProfit = 0;
  public currentPortfolioValue;

  public checked = false;

  constructor(private readonly stockSymbolService: StockSymbolService,
              private readonly stockQuoteService: StockQuoteService,
              private readonly pieChartService: PieChartService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.portfolio) {
      let symbols = [...new Set(this.portfolio.positions.map(position => position.symbol))];

      this.stockQuoteService.getQuotes(symbols).then(quotes => {
        let quotesMap: Map<string, number> = new Map(quotes.map(quote => [quote.symbol, quote.price]));

        if (this.portfolio) {
          this.currentPortfolioValue = this.getCurrentPortfolioValue(this.portfolio.positions, quotesMap);
          this.totalProfit = this.currentPortfolioValue - this.portfolio.investments;
          this.originalData = this.getData(quotesMap, this.portfolio.positions.filter(value => value.stockCount !== 0)).sort((a, b) => b.price - a.price);
          this.chartData = this.pieChartService.getPieChartData(this.originalData);
        }
      });
    }
  }

  private getCurrentPortfolioValue(positions: Position[], quotesMap: Map<string, number>): number {
    return positions
      .map(position => {
        return PortfolioComponent.getValue(quotesMap, position.symbol) * position.stockCount;
      })
      .reduce((a, b) => a + b);
  }

  private getData(quotesMap: Map<string, number>, positions: Position[]): Array<ChartData> {
    let data: Array<ChartData> = [];
    positions.forEach(position => {
      data.push({
        symbol: position.symbol,
        name: position.name,
        type: position.type,
        price: PortfolioComponent.getValue(quotesMap, position.symbol) * position.stockCount
      });
    });

    return data;
  }

  private static getValue(map: Map<string, number>, key: string): number {
    let value = map.get(key);
    if (!value) {
      value = 0;
    }
    return value;
  }

}
