import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Paths} from "../constants/paths";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {


  constructor(private readonly http: HttpClient) {
  }

  public getExpenses(months: string[]): Promise<Map<string, Array<Expense>>> {
    let monthQuery = "";
    for (const month of months) {
      monthQuery += `&month=${month}`;
    }
    return this.http.get<Map<string, Array<Expense>>>(`${Paths.HEROKU_API_PATH}/expenses?${monthQuery}`)
      .toPromise()
  }
}

export type Expense = {
  value: number;
  category: string;
}


