import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries; // Los datos que se van a mostrar
  chart: ApexChart; // Configuración general del gráfico (tipo, altura, etc)
  xaxis: ApexXAxis; // Configuración del eje X (categorías)
  title: ApexTitleSubtitle; // Título del gráfico
};

@Component({
  selector: 'app-client-chart',
  templateUrl: './client-chart.component.html',
  styleUrls: ['./client-chart.component.scss'],
  standalone: true,
  imports: [
    NgApexchartsModule,
  ]
})
export class ClientChartComponent implements OnInit {
  @ViewChild('chart-client') chart_client!: ChartComponent;

  public chartOptions!: Partial<ChartOptions>

  constructor() {}

  ngOnInit() {}
}
