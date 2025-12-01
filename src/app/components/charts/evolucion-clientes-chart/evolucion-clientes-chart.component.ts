import { Component, OnInit, ViewChild, signal, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MetricasService } from 'src/app/core/services/metricas.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { CommonModule } from "@angular/common";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-evolucion-clientes-chart',
  templateUrl: './evolucion-clientes-chart.component.html',
  styleUrls: ['./evolucion-clientes-chart.component.scss'],
  standalone: true,
  imports: [ChartComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvolucionClientesChartComponent  implements OnInit {
  @ViewChild("chart_evolucion_clientes") chart_evolucion_clientes!: ChartComponent

  public chartOptions = signal<Partial<ChartOptions>>({});

  constructor(private cdr: ChangeDetectorRef, private metricasService: MetricasService) { }

  ngOnInit() {
    this.getEvolucionClientes()
  }

  getEvolucionClientes(){
    return this.metricasService.getMetricasEvolucion().subscribe({
      next: (res) => {
        if(res.data){
          console.log("Métricas de evolución de clientes:", res.data)
          const clientes = res.data.map((item) => item.nuevos_clientes)
          const meses = res.data.map((item) => item.mes_nombre)
          this.chartOptions.set({
            series: [
              {
                name: "clientes",
                data: [...clientes]
              }
            ],
            chart: {
              height: 350,
              type: "line",
              zoom: {
                enabled: true
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: "straight"
            },
            title: {
              text: "Crecimiento de clientes",
              align: "center"
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5
              }
            },
            xaxis: {
              categories: [
                ...meses
              ]
            }
          })
          this.cdr.detectChanges()
        }
      }
    })
  }

}
