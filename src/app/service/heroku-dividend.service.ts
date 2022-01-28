import {Injectable} from '@angular/core';
import {HerokuDividend} from "../model/dividends";
import {HttpClient} from "@angular/common/http";
import {Paths} from "../constants/paths";

@Injectable({
  providedIn: 'root'
})
export class HerokuDividendService {

  constructor(private readonly http: HttpClient) {
  }

  public getDividends(owner: string, symbol: string): Promise<Array<HerokuDividend>> {
    return this.http.get<Array<HerokuDividend>>(`${Paths.HEROKU_API_PATH}/dividends?symbol=${symbol}&owner=${owner}`)
      .toPromise()
  }

}
