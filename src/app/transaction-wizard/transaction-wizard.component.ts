import {Component} from '@angular/core';
import {Transaction} from "../model/transaction";
import {HerokuTransactionService} from "../service/heroku-transaction.service";
import {StockLookupService} from "../service/stock-lookup.service";
import {StockLookupResult} from "../model/stock-lookup";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-transaction-wizard',
  templateUrl: './transaction-wizard.component.html',
  styleUrls: ['./transaction-wizard.component.css']
})
export class TransactionWizardComponent {

  ownerOptions = [
    {owner: 'Olga'},
    {owner: 'Andrei'},
    {owner: 'Sergei'}
  ];

  brokerOptions = [
    {broker: 'Flatex'},
    {broker: 'DADAT'}
  ];

  transactionTypeOptions = [
    {type: 'Buy'},
    {type: 'Sell'},
    {type: 'Stock Split'}
  ];

  public results: Array<StockLookupResult> = [];

  public form = new FormGroup({
    stock: new FormControl(''),
    argument: new FormControl(0),
    owner: new FormControl({owner: "Olga"}),
    broker: new FormControl(''),
    price: new FormControl(0),
    type: new FormControl({type: "Buy"}),
    date: new FormControl(new Date())
  });

  constructor(private readonly herokuTransactionService: HerokuTransactionService,
              private readonly stockLookupService: StockLookupService) {
  }

  onSubmit() {
    let formValue = this.form.value;
    console.warn(this.form.value);
    let transaction: Transaction = {
      stock: formValue.stock,
      broker: formValue.broker.broker,
      price: formValue.price,
      argument: formValue.argument,
      owner: formValue.owner.owner,
      type: formValue.type.type,
      date: formValue.date
    };
    this.herokuTransactionService.createTransaction(transaction);
  }

  search(event: any) {
    if (event) {
      // @ts-ignore
      if (event.query) {
        this.stockLookupService.lookupStockByName(event.query).then(response => {
          this.results = response.result.filter(result => result.symbol.endsWith(".F"));
        });
      }
    }

  }
}
