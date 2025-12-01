import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, signal, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {
  ApexAxisChartSeries,
  NgApexchartsModule,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip
} from "ng-apexcharts";
import { MetricasService } from 'src/app/core/services/metricas.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  colors: string[];
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-pais-chart',
  templateUrl: './pais-chart.component.html',
  styleUrls: ['./pais-chart.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaisChartComponent  implements OnInit {
  @ViewChild("chart_pais") chart_pais!: ChartComponent

  public chartOptions = signal<Partial<ChartOptions>>({});

  constructor(private metricasService: MetricasService, 
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getMetricasPaises()
  }

  getMetricasPaises(){
    return this.metricasService.getMetricasPaises().subscribe({
      next: (res) => {
        if(res.data){
          console.log(res.data)
          const clientes_por_pais = res.data.map((item) => item.total_clientes)
          const paises = res.data.map((item) => item.pais)
          this.chartOptions.set({
            series: [
              {
                data: [
                  ...clientes_por_pais
                ]
              }
            ],
            chart: {
              type: "bar",
              height: 350
            },
            plotOptions: {
              bar: {
                barHeight: "100%",
                distributed: true,
                horizontal: true,
                dataLabels: {
                  position: "bottom"
                }
              }
            },
            colors: [
              "#33b2df",
              "#546E7A",
              "#d4526e",
              "#13d8aa",
              "#A5978B",
              "#2b908f",
              "#f9a3a4",
              "#90ee7e",
              "#f48024",
              "#69d2e7"
            ],
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              style: {
                colors: ["#fff"]
              },
              formatter: function(val: string | number | number[], opt?: any){
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
              },
              offsetX: 0,
              dropShadow: {
                enabled: true
              }
            },
            stroke: {
              width: 1,
              colors: ["#fff"]
            },
            xaxis: {
              categories: [
                ...paises
              ]
            },
            yaxis: {
              labels: {
                show: false
              }
            },
            subtitle: {
              text: "Distribución de clientes por pais",
              align: "center"
            },
            tooltip: {
              theme: "dark",
              x: {
                show: false
              },
              y: {
                title: {
                  formatter: function(){
                    return ""
                  }
                }
              }
            }
          })
        }
      }
    })
  }

}
