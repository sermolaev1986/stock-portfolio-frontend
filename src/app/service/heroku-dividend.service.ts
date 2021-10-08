import {Injectable} from '@angular/core';
import {Dividend, HerokuDividend} from "../model/dividends";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Paths} from "../constants/paths";

@Injectable({
  providedIn: 'root'
})
export class HerokuDividendService {

  constructor(private readonly http: HttpClient) {
  }

  public getDividends(symbol: string, owner: string): Promise<Array<HerokuDividend>> {
    return this.http.get<Array<HerokuDividend>>(`${Paths.HEROKU_API_PATH}/dividends?symbol=${symbol}&owner=${owner}`)
      .pipe(map(response => this.getUniqueListByPaymentDate(response)))
      .toPromise()
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
