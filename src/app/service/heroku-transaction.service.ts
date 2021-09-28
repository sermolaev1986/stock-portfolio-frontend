import {Injectable} from '@angular/core';
import {HerokuTransaction, Transaction} from "../model/transaction";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HerokuTransactionService {

  private readonly basePath = "https://chubr-stock-portfolio.herokuapp.com/v1";

  constructor(private readonly http: HttpClient) {
  }

  public createTransaction(transaction: Transaction) {
    if (!transaction.owner || !transaction.argument || !transaction.broker) {
      return;
    }

    if ((transaction.type === "Buy" || transaction.type === "Sell") && !transaction.price) {
      return;
    }

    let operator = "";
    if (transaction.type === "Stock Split") {
      operator = "MULTIPLY";
    } else if (transaction.type === "Buy") {
      operator = "PLUS";
    } else if (transaction.type === "Sell") {
      operator = "MINUS";
    } else {
      return;
    }

    let symbol = transaction.stock?.symbol;
    if (symbol) {
      symbol = symbol.replace('.F', '');
    } else {
      return;
    }

    let herokuTransaction: HerokuTransaction = {
      symbol: symbol,
      date: transaction.date,
      owner: transaction.owner,
      broker: transaction.broker,
      price: transaction.price,
      argument: transaction.argument,
      operator: operator
    };

    this.http.post(`${this.basePath}/transactions`, herokuTransaction).subscribe();
  }
}
