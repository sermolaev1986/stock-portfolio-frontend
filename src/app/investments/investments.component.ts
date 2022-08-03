import {Component, OnInit} from '@angular/core';
import {InvestmentsService, Transaction} from "../service/investments.service";

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  options = {
    responsive: true,
    legend: {
      display: false
    },
    title: {
      display: false
    },
    indexAxis: 'x',
    scales: {
      y: {
        stacked: false,
        grid: {
          display: true,
          color: "#e3e3e3",
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true
        },
        showTicks: false,
        showTickMarks: false,
        display: true,
        scaleLabel: {
          show: false,
          labelString: 'Value'
        },
        ticks: {
          // callback: function(value, index, ticks) {
          //   return index;
          // },
          mirror: false,
          display: true,
          beginAtZero: true,
          max: 100,
          min: -100,
          suggestedMin: -100,
        }
      },
      x: {
        stacked: false,
        grid: {
          color: "#e3e3e3",
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true
        },
        showTicks: true,
        showTickMarks: false,
        ticks: {
          display: true,
          beginAtZero: 0
        }
      }
    },
    plugins: {
      datalabels: {
        enabled: false,
        display: false,
        color: '#fff'
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };
  chartData: any;
  date: any;

  constructor(private readonly investmentsService: InvestmentsService) {
  }

  ngOnInit(): void {
    this.investmentsService.getTransactions().then(value => this.renderTransactions(value));
  }

  renderTransactions(transactions: Array<Transaction>) {
    let totalInvestments = 0;
    let investments = transactions.filter(value => value.operator !== 'MULTIPLY')
      .map(transaction => {
        if (transaction.operator === 'PLUS') {
          totalInvestments += (transaction.argument * transaction.price)
        } else {
          totalInvestments -= (transaction.argument * transaction.price)
        }
        return {
          date: transaction.date,
          value: totalInvestments
        }
      })
    this.chartData = {
      labels: investments.map(item => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          data: investments.map(item => item.value),
          borderColor: "red"
        }
      ]
    };
  }

  onDateSelected() {
    let month = ("0" + (this.date.getMonth() + 1)).slice(-2);
    let date = month +  "/01/" + this.date.getFullYear();

    this.investmentsService.getTransactions(date).then(value => this.renderTransactions(value));
  }
}
