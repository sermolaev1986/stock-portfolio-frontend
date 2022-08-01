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
  chartType: string;

  @Input()
  public chartData: any = [];

  @Input()
  public displayDataLabels = false;

  public plugins = [ChartDataLabels];
  public options = {
    indexAxis: 'y',
    plugins: {
      datalabels: {
        enabled: true,
        display: true,
        /* show value in percents */
        formatter: (value, ctx) => {
          if (!this.displayDataLabels) {
            return '';
          }

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

            if (percentage > 3 && label.length <=20) {
              name = label + ' ' + name;
            }

            return name;
          }

        },
        color: '#fff',
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
  }

}
