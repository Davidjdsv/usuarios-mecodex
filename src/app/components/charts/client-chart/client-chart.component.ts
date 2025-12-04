import { Component, OnInit, ViewChild, ChangeDetectorRef, signal, ChangeDetectionStrategy } from '@angular/core'; // <- Agrega ChangeDetectorRef
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { MetricasService } from 'src/app/core/services/metricas.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-client-chart',
  templateUrl: './client-chart.component.html',
  styleUrls: ['./client-chart.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientChartComponent implements OnInit {
  @ViewChild('chart_client') chart_client!: ChartComponent;

  public chartOptions = signal<Partial<ChartOptions>>({});

  constructor(
    private metricasService: MetricasService,
    private cdr: ChangeDetectorRef  // <- Inyecta esto
  ) {}

  ngOnInit() {
    this.getMetricasClientes();
  }

  getMetricasClientes(){
    return this.metricasService.getMetricasGenerales().subscribe({
      next: (res) => {
        if(res.data) {
          this.chartOptions.set({
            series: [
              {
                name: 'Clientes con cuenta',
                data: [res.data.distribucion_clientes.clientes_con_cuenta],
              },
              {
                name: 'Clientes sin cuenta',
                data: [res.data.distribucion_clientes.clientes_sin_cuenta],
              },
            ],
            chart: {
              type: 'bar',
              height: 350,
            },
            xaxis: {
              categories: ['Clientes'],
            }
          });          
          this.cdr.detectChanges();
        } else {
          console.error('No hay datos disponibles');
        }
      },
      error: (err) => {
        console.error('Error al obtener métricas:', err);
      }
    })
  }
}