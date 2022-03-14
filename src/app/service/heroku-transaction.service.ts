import {Injectable} from '@angular/core';
import {HerokuTransaction, Transaction} from "../model/transaction";
import {HttpClient} from "@angular/common/http";
import {Paths} from "../constants/paths";

@Injectable({
  providedIn: 'root'
})
export class HerokuTransactionService {

  constructor(private readonly http: HttpClient) {
  }

  public createTransaction(transaction: Transaction): Promise<any> {
    if (!transaction.owner || !transaction.stockCount || !transaction.broker || !transaction.price) {
      return Promise.resolve();
    }

    let operator = "";
    if (transaction.type === "Buy") {
      operator = "PLUS";
    } else if (transaction.type === "Sell") {
      operator = "MINUS";
    } else {
      return Promise.resolve();
    }

    let symbol = transaction.stockSymbol;
    if (symbol) {
      symbol = symbol.replace('.F', '');
    } else {
      return Promise.resolve();
    }

    let herokuTransaction: HerokuTransaction = {
      symbol: symbol,
      date: transaction.date,
      owner: transaction.owner,
      price: transaction.price,
      argument: transaction.stockCount,
      operator: operator
    };

    return this.http.post(`${Paths.HEROKU_API_PATH}/transactions`, herokuTransaction).toPromise();
  }

  public getTransactions(owner: string, symbol: string): Promise<Array<HerokuTransaction>> {
    return this.http.get<Array<HerokuTransaction>>(`${Paths.HEROKU_API_PATH}/transactions?owner=${owner}&symbol=${symbol}`)
      .toPromise();
  }
}
