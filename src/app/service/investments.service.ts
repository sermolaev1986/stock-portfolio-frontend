import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paths} from "../constants/paths";

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  constructor(private readonly http: HttpClient) {
  }

  public getTransactions(date?: string): Promise<Array<Transaction>> {
    if (date) {
      return this.http.get<Array<Transaction>>(`${Paths.HEROKU_API_PATH}/transactions/Overall?from=${date}`)
        .toPromise()
    } else {
      return this.http.get<Array<Transaction>>(`${Paths.HEROKU_API_PATH}/transactions/Overall`)
        .toPromise()
    }

  }
}

export type Transaction = {
  date: string;
  symbol: string;
  owner: string;
  argument: number;
  operator: string;
  price: number;
}

