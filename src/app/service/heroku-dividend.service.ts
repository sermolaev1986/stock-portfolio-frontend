import {Injectable} from '@angular/core';
import {Dividend, HerokuDividend} from "../model/dividends";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HerokuDividendService {

  private readonly basePath = "https://chubr-stock-portfolio.herokuapp.com/v1";

  constructor(private readonly http: HttpClient) {
  }

  getDividends(symbol: string, owner: string): Promise<Array<Dividend>> {
    return this.http.get<Array<HerokuDividend>>(`${this.basePath}/dividends?symbol=${symbol}&owner=${owner}`)
      .pipe(map(response => this.getUniqueListByPaymentDate(response)
        .map(it => this.convertDividend(it))))
      .toPromise();
  }

  private convertDividend(dividend: HerokuDividend): Dividend {
    return {
      ticker: dividend.symbol,
      paymentDate: new Date(dividend.paymentDate).toISOString().split('T')[0],
      exDate: new Date(dividend.exDate).toISOString().split('T')[0],
      amount: dividend.dollarBruttoAmount
    };
  }

  private getUniqueListByPaymentDate(arr: Array<HerokuDividend>): Array<HerokuDividend> {
    return [...new Map(arr.map(item => [item["paymentDate"], item])).values()]
  }

}
