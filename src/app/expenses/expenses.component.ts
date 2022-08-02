import {Component, OnInit} from '@angular/core';
import {Expense, ExpensesService} from "../service/expenses.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  chartData: any;
  month: Date = new Date();
  otherMonth: Date;

  public colorsPool = [
    {backgroundColor: "red", hoverColor: "light-red"},
    {backgroundColor: "green", hoverColor: "light-green"}
  ];

  constructor(private readonly expensesService: ExpensesService) {
  }

  ngOnInit(): void {
    this.getExpenses();
  }

  private getExpenses() {
    let month = this.transformToMonth(this.month);
    const months = [month];

    let otherMonth;
    if (this.otherMonth) {
      otherMonth = this.transformToMonth(this.otherMonth);
      months.push(otherMonth);
    }

    this.expensesService.getExpenses(months).then(expensesMap => {
      const keys: string[] = [];
      const values: Expense[][] = [];
      for (let key in expensesMap) {
        keys.push(key);
        if (key !== "lastYearAverages") {
          values.push(expensesMap[key]);
        }
      }

      // expensesMap[month].sort((a, b) => b.value - a.value);
      //
      // const myMap = new Map();
      // expensesMap[month].forEach((object, index) => {
      //   myMap.set(object.category, index);
      // });
      //
      // if (expensesMap[otherMonth]) {
      //   expensesMap[otherMonth].sort((a, b) => {
      //     return myMap.get(a.category) - myMap.get(b.category)
      //   })
      // }

      const datasets = values.map((expenses, index) => {
        return {
          data: expenses.map(expense => expense.value),
          backgroundColor: this.colorsPool[index].backgroundColor,
          hoverBackgroundColor: this.colorsPool[index].hoverColor,
        };
      })

      datasets.push({
        data: expensesMap["lastYearAverages"].map(expense => expense.value),
        backgroundColor: "#1E555C",
        hoverBackgroundColor: "light-blue",
      });
      this.chartData = {
        labels: values[0].map(value => value.category),
        datasets: datasets
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
