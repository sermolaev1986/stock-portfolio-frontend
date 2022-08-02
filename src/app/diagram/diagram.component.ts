import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

  @Input()
  width: string = "300px";

  @Input()
  height: string = "300px";

  @Input()
  chartType: string;

  @Input()
  public chartData: any = [];

  @Input()
  public displayDataLabels = false;

  @Input()
  public showLabelsInPercents = true;

  public plugins = [ChartDataLabels];
  public options = {
    indexAxis: 'y',
    minBarLength: 100,
    scales: {
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        showTicks: false,
        categoryPercentage: 1,
        barPercentage: 1,
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
          display: false,
          beginAtZero: true,
          max: 100,
          min: 0,
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        showTicks: false,
        categoryPercentage: 0.9,
        showTickMarks: false,
        barPercentage: 0.9,
        ticks: {
          display: false,
          beginAtZero: 0
        }
      }
    },
    plugins: {
      datalabels: {
        enabled: true,
        display: true,
        color: '#fff'
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    if (!this.displayDataLabels) {
      // @ts-ignore
      this.options.plugins.datalabels.formatter = this.formatNoOp;
    } else {
      if (this.showLabelsInPercents) {
        /* show value in percents */
        // @ts-ignore
        this.options.plugins.datalabels.formatter = this.format;
      } else {
        // @ts-ignore
        this.options.plugins.datalabels.formatter = this.formatWithLabel;
      }
    }
  }

  formatWithLabel(value, ctx): string {
    const label = ctx.chart.data.labels[ctx.dataIndex];

    // let sum = 0;
    // const dataArr = ctx.chart.data.datasets[0].data;

    if (value === 0) {
      return "                —";
    }

    if (value < 100) {
      return value;
    } else {
      return label + " " + value;
    }

  }

  formatNoOp(value, ctx): string {
    return '';
  }

  format(value, ctx): string {
    const label = ctx.chart.data.labels[ctx.dataIndex];

    let sum = 0;
    const dataArr = ctx.chart.data.datasets[0].data;
    dataArr.map(data => {
      sum += data;
    });
    const percentage = (value * 100 / sum);
    if (percentage < 1.5) {
      return '';
    } else {
      let name = percentage.toFixed(2);
      if (percentage > 2) {
        name = name + '%';
      }

      if (percentage > 3 && label.length <= 20) {
        name = label + ' ' + name;
      }

      return name;
    }

  }

}
