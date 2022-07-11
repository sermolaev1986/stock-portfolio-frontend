import {Component, OnInit} from '@angular/core';
import {ChartData} from "../portfolio/data";

@Component({
  selector: 'app-diagram-details',
  templateUrl: './diagram-details.component.html',
  styleUrls: ['./diagram-details.component.css']
})
export class DiagramDetailsComponent implements OnInit {

  private originalData: Array<ChartData> = [];
  public chartData: any = [];

  public selectedTypes: string[] = ['stock', 'bond', 'reit'];

  public chartType = 'doughnut';
  public chartTypes = [
    {name: 'Pie', code: 'pie'},
    {name: 'Doughnut', code: 'doughnut'},
    {name: 'Bar', code: 'bar'}
  ];

  public displayGroupedByType = false;
  public displayDataLabels = true;

  ngOnInit(): void {
    this.originalData = history.state.originalData;
    this.chartData = this.getPieChartData(this.originalData);
  }

  private getPieChartDataGroupedByType(data: Array<ChartData>) {
    let map = this.groupBy(data, value => value.type);

    return {
      labels: Array.from(map.keys()),
      datasets: [
        {
          data: Array.from(map.values()),
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#62929E",
            "#4A6D7C",
            "#9AD1D4",
            "#FCE762",
            "#4F4789",
            "#CBE896",
            "#AD5D4E",
            "#EB6534",
            "#E85F5C",
            "#FFDAC6",
            "#7C6A0A"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D",
            "#62929E",
            "#4A6D7C",
            "#9AD1D4",
            "#FCE762",
            "#4F4789",
            "#CBE896",
            "#AD5D4E",
            "#EB6534",
            "#E85F5C",
            "#FFDAC6",
            "#7C6A0A"
          ]
        }
      ]
    };
  }

  private groupBy(list: Array<ChartData>, keyGetter) {
    const map: Map<string, number> = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const price = map.get(key);
      if (!price) {
        map.set(key, item.price);
      } else {
        map.set(key, item.price + price);
      }
    });
    return map;
  }

  public toggleDisplayGroupedByType() {
    if (this.displayGroupedByType) {
      this.chartData = this.getPieChartDataGroupedByType(this.originalData);
    } else {
      this.chartData = this.getPieChartData(this.originalData);
    }
  }

  private getPieChartData(data: Array<ChartData>) {
    return {
      labels: data.map(item => item.name),
      datasets: [
        {
          data: data.map(item => item.price),
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#62929E",
            "#4A6D7C",
            "#9AD1D4",
            "#FCE762",
            "#4F4789",
            "#CBE896",
            "#AD5D4E",
            "#EB6534",
            "#E85F5C",
            "#FFDAC6",
            "#7C6A0A"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D",
            "#62929E",
            "#4A6D7C",
            "#9AD1D4",
            "#FCE762",
            "#4F4789",
            "#CBE896",
            "#AD5D4E",
            "#EB6534",
            "#E85F5C",
            "#FFDAC6",
            "#7C6A0A"
          ]
        }
      ]
    };
  }

  public refreshPieChart() {
    this.chartData = this.getPieChartData(this.originalData.filter(value => this.selectedTypes.includes(value.type)));
    this.displayDataLabels = this.chartType != 'bar';
  }

}
