import {Injectable} from '@angular/core';
import {Paths} from "../constants/paths";
import {HttpClient} from "@angular/common/http";

type UpcomingDividend = {
  payDate: string;
  name: string;
  amount: number;
  quantity: number;
  exchangeRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class UpcomingDividendsService {

  constructor(private readonly http: HttpClient) {
  }

  public getUpcomingDividends(): Promise<Array<UpcomingDividend>> {
    return this.http.get<Array<UpcomingDividend>>(`${Paths.HEROKU_API_PATH}/dividends/upcoming`)
      .toPromise()
  }
}
