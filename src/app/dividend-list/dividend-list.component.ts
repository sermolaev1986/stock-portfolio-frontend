import {Component, OnInit} from '@angular/core';
import {DividendService} from "../service/dividend.service";
import {ActivatedRoute} from "@angular/router";
import {HerokuDividend} from "../model/dividends";
import {ExchangeRatesService} from "../service/exchange-rates.service";
import {StockLookupService} from "../service/stock-lookup.service";
import {StockSymbolService} from "../service/stock-symbol.service";

@Component({
  selector: 'app-dividend-list',
  templateUrl: './dividend-list.component.html',
  styleUrls: ['./dividend-list.component.css']
})
export class DividendListComponent implements OnInit {

  public owner: string = "";
  public dividends: Array<HerokuDividend> = [];
  public companyName: string = "";
  public logo: string = "";

  constructor(private readonly dividendService: DividendService,
              private readonly exchangeRatesService: ExchangeRatesService,
              private readonly stockLookupService: StockLookupService,
              private readonly stockSymbolService: StockSymbolService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.owner = params['owner'];
      let symbol = params['symbol'];

      this.dividendService.getDividends(this.owner, symbol, "").then(dividends => {
        this.dividends = dividends;
      });

      this.stockLookupService.getCompanyProfile(this.stockSymbolService.getUsSymbol(symbol)).then(companyProfile => {
        this.companyName = companyProfile.name;
        this.logo = companyProfile.logo;
      });
    });

  }

  isPaymentDateInFuture(paymentDate: string): boolean {
    return new Date(paymentDate).getTime() > new Date().getTime();
  }

}
