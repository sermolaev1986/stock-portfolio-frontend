import {Component, OnInit} from '@angular/core';
import {HerokuTransaction} from "../model/transaction";
import {HerokuTransactionService} from "../service/heroku-transaction.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  public transactions: Array<HerokuTransaction> = [];

  constructor(private transactionService: HerokuTransactionService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let owner = params['owner'];
      let symbol = params['symbol'];

      this.transactionService.getTransactions(owner, symbol).then(result => {
        this.transactions = result;
      });
    });
  }

  public getOperationType(operator: string): string {
    switch (operator) {
      case "PLUS":
        return "Kauf";
      case "MINUS":
        return "Verkauf";
      case "MULTIPLY":
        return "Stock Split";
      default:
        return "";
    }
  }
}
