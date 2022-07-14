import {Injectable} from '@angular/core';
import {ChartData} from "../portfolio/data";

type Color = {
  backgroundColor: string;
  hoverColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  private colorsPool: Color[] = [
    {backgroundColor: "#42A5F5", hoverColor: "#64B5F6"},
    {backgroundColor: "#66BB6A", hoverColor: "#81C784"},
    {backgroundColor: "#FFA726", hoverColor: "#FFB74D"},
    {backgroundColor: "#62929E", hoverColor: "#62929E"},
    {backgroundColor: "#4A6D7C", hoverColor: "#4A6D7C"},
    {backgroundColor: "#9AD1D4", hoverColor: "#9AD1D4"},
    {backgroundColor: "#FCE762", hoverColor: "#FCE762"},
    {backgroundColor: "#4F4789", hoverColor: "#4F4789"},
    {backgroundColor: "#CBE896", hoverColor: "#CBE896"},
    {backgroundColor: "#AD5D4E", hoverColor: "#AD5D4E"},
    {backgroundColor: "#EB6534", hoverColor: "#EB6534"},
    {backgroundColor: "#E85F5C", hoverColor: "#E85F5C"},
    {backgroundColor: "#FFDAC6", hoverColor: "#FFDAC6"},
    {backgroundColor: "#7C6A0A", hoverColor: "#7C6A0A"},
    //TODO here color repetition - we need to define more colors
    {backgroundColor: "#611b9a", hoverColor: "#af14da"},
    {backgroundColor: "#66BB6A", hoverColor: "#81C784"},
    {backgroundColor: "#FFA726", hoverColor: "#FFB74D"},
    {backgroundColor: "#62929E", hoverColor: "#62929E"},
    {backgroundColor: "#4A6D7C", hoverColor: "#4A6D7C"},
    {backgroundColor: "#9AD1D4", hoverColor: "#9AD1D4"},
    {backgroundColor: "#FCE762", hoverColor: "#FCE762"},
    {backgroundColor: "#4F4789", hoverColor: "#4F4789"},
    {backgroundColor: "#CBE896", hoverColor: "#CBE896"},
    {backgroundColor: "#AD5D4E", hoverColor: "#AD5D4E"},
    {backgroundColor: "#EB6534", hoverColor: "#EB6534"},
    {backgroundColor: "#E85F5C", hoverColor: "#E85F5C"},
    {backgroundColor: "#FFDAC6", hoverColor: "#FFDAC6"},
    {backgroundColor: "#7C6A0A", hoverColor: "#7C6A0A"},
    {backgroundColor: "#42A5F5", hoverColor: "#64B5F6"},
    {backgroundColor: "#66BB6A", hoverColor: "#81C784"},
    {backgroundColor: "#FFA726", hoverColor: "#FFB74D"},
    {backgroundColor: "#62929E", hoverColor: "#62929E"},
    {backgroundColor: "#4A6D7C", hoverColor: "#4A6D7C"},
    {backgroundColor: "#9AD1D4", hoverColor: "#9AD1D4"},
    {backgroundColor: "#FCE762", hoverColor: "#FCE762"},
    {backgroundColor: "#4F4789", hoverColor: "#4F4789"},
    {backgroundColor: "#CBE896", hoverColor: "#CBE896"},
    {backgroundColor: "#AD5D4E", hoverColor: "#AD5D4E"},
    {backgroundColor: "#EB6534", hoverColor: "#EB6534"},
    {backgroundColor: "#E85F5C", hoverColor: "#E85F5C"},
    {backgroundColor: "#FFDAC6", hoverColor: "#FFDAC6"},
    {backgroundColor: "#7C6A0A", hoverColor: "#7C6A0A"},
    {backgroundColor: "#42A5F5", hoverColor: "#64B5F6"},
    {backgroundColor: "#66BB6A", hoverColor: "#81C784"},
    {backgroundColor: "#FFA726", hoverColor: "#FFB74D"},
    {backgroundColor: "#62929E", hoverColor: "#62929E"},
    {backgroundColor: "#4A6D7C", hoverColor: "#4A6D7C"},
    {backgroundColor: "#9AD1D4", hoverColor: "#9AD1D4"},
    {backgroundColor: "#FCE762", hoverColor: "#FCE762"},
    {backgroundColor: "#4F4789", hoverColor: "#4F4789"},
    {backgroundColor: "#CBE896", hoverColor: "#CBE896"},
    {backgroundColor: "#AD5D4E", hoverColor: "#AD5D4E"},
    {backgroundColor: "#EB6534", hoverColor: "#EB6534"},
    {backgroundColor: "#E85F5C", hoverColor: "#E85F5C"},
    {backgroundColor: "#FFDAC6", hoverColor: "#FFDAC6"},
    {backgroundColor: "#7C6A0A", hoverColor: "#7C6A0A"},
    {backgroundColor: "#42A5F5", hoverColor: "#64B5F6"},
    {backgroundColor: "#66BB6A", hoverColor: "#81C784"},
    {backgroundColor: "#FFA726", hoverColor: "#FFB74D"},
    {backgroundColor: "#62929E", hoverColor: "#62929E"},
    {backgroundColor: "#4A6D7C", hoverColor: "#4A6D7C"},
    {backgroundColor: "#9AD1D4", hoverColor: "#9AD1D4"},
    {backgroundColor: "#FCE762", hoverColor: "#FCE762"},
    {backgroundColor: "#4F4789", hoverColor: "#4F4789"},
    {backgroundColor: "#CBE896", hoverColor: "#CBE896"},
    {backgroundColor: "#AD5D4E", hoverColor: "#AD5D4E"},
    {backgroundColor: "#EB6534", hoverColor: "#EB6534"},
    {backgroundColor: "#E85F5C", hoverColor: "#E85F5C"},
    {backgroundColor: "#FFDAC6", hoverColor: "#FFDAC6"},
    {backgroundColor: "#7C6A0A", hoverColor: "#7C6A0A"}
  ];

  private symbolToColorMap: Map<string, Color> = new Map();

  constructor() {
  }

  public getPieChartData(data: Array<ChartData>) {
    return {
      labels: data.map(item => item.name),
      datasets: [
        {
          data: data.map(item => item.price),
          backgroundColor: data.map(item => this.getColorBySymbol(item.symbol).backgroundColor),
          hoverBackgroundColor: data.map(item => this.getColorBySymbol(item.symbol).backgroundColor)
        }
      ]
    };
  }

  public getColorBySymbol(symbol: string): Color {
    let color = this.symbolToColorMap.get(symbol);
    if (!color) {
      color = this.colorsPool.pop();
      this.symbolToColorMap.set(symbol, color);
    }

    return color;
  }
}
