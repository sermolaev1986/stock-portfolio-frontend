import {Component} from '@angular/core';
import {Transaction} from "../model/transaction";
import {HerokuTransactionService} from "../service/heroku-transaction.service";
import {StockLookupService} from "../service/stock-lookup.service";
import {StockLookupResult} from "../model/stock-lookup";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-transaction-wizard',
    templateUrl: './transaction-wizard.component.html',
    styleUrls: ['./transaction-wizard.component.css'],
    providers: [MessageService]
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
        {type: 'Sell'}
    ];

    public results: Array<StockLookupResult> = [];

    public form = new FormGroup({
        stock: new FormControl(''),
        stockCount: new FormControl(0),
        owner: new FormControl({owner: "Olga"}),
        broker: new FormControl(''),
        price: new FormControl(0),
        type: new FormControl({type: "Buy"}),
        date: new FormControl(new Date())
    });

    constructor(private readonly herokuTransactionService: HerokuTransactionService,
                private readonly stockLookupService: StockLookupService,
                private readonly messageService: MessageService) {
    }

    onSubmit() {
        let formValue = this.form.value;
        console.warn(this.form.value);

        let stock = "";
        if (formValue.stock.symbol) {
            stock = formValue.stock.symbol;
        } else {
            stock = formValue.stock;
        }

        let transaction: Transaction = {
            stockSymbol: stock,
            stockCount: formValue.stockCount,
            broker: formValue.broker.broker,
            price: formValue.price,
            owner: formValue.owner.owner,
            type: formValue.type.type,
            date: formValue.date
        };
        this.herokuTransactionService.createTransaction(transaction).then(value => {
            let message;
            if (formValue.type.type === 'Buy') {
                message = 'gekauft';
            } else if (formValue.type.type === 'Sell') {
                message = 'verkauft';
            }
          this.messageService.add({severity:'success', summary: 'Erfolgreich!', detail: `${stock} ${message}`});
        });
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
