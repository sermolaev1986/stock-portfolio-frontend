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

  @Input()
  public showGrid = false;

  public plugins = [ChartDataLabels];
  public options: any;

  constructor() {
  }

  ngOnInit(): void {
    this.options = {
      responsive: true,
        legend: {
      display: false
    },
      title: {
        display: false
      },
      indexAxis: 'y',
        minBarLength: 50,
      // barValueSpacing: 1000000,
      scales: {
      y: {
        stacked: false,
          grid: {
          display: this.showGrid,
            color: "#e3e3e3",
            drawBorder: false,
            drawOnChartArea: true,
            drawTicks: this.showGrid
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
            display: this.showGrid,
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
            display: this.showGrid,
            drawBorder: true,
            drawOnChartArea: true,
            drawTicks: this.showGrid
        },
        showTicks: true,
          showTickMarks: false,
          ticks: {
          display: this.showGrid,
            beginAtZero: 0,
            suggestedMin: -100,
            min: -100,
            stepSize: 50
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
      return "—";
    }
    return value;

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
