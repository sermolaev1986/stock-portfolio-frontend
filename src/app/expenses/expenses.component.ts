import {Component, OnInit} from '@angular/core';
import {ExpensesService} from "../service/expenses.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  chartData: any;
  month: Date = new Date();
  otherMonth: Date;

  public colorsPool = [{backgroundColor: "red", hoverColor: "red-lighter"}, {
    backgroundColor: "green",
    hoverColor: "green-lighter"
  }];

  constructor(private readonly expensesService: ExpensesService) {
  }

  ngOnInit(): void {
    this.getExpenses();
  }

  private getExpenses() {
    const months = [this.transformToMonth(this.month)];

    if (this.otherMonth) {
      months.push(this.transformToMonth(this.otherMonth));
    }

    this.expensesService.getExpenses(months).then(expensesMap => {
      const keys = [];
      const values = [];
      for (let key in expensesMap) {
        keys.push(key);
        values.push(expensesMap[key]);
      }

      this.chartData = {
        labels: values[0].map(value => value.category),
        datasets: values.map((expenses, index) => {
          return {
            data: expenses.map(expense => expense.value),
            backgroundColor: this.colorsPool[index].backgroundColor,
            hoverBackgroundColor: this.colorsPool[index].hoverColor,
          };
        })
      };
    })
  }

  private transformToMonth(date: Date) {
    let year = date.getFullYear() - 2000;
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    return month + "." + year;
  }

  onMonthSelected() {
    this.getExpenses();
  }
}
