import { ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { MetricasService } from 'src/app/core/services/metricas.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-planes-chart',
  templateUrl: './planes-chart.component.html',
  styleUrls: ['./planes-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, ChartComponent],
})
export class PlanesChartComponent  implements OnInit {

  @ViewChild("chart_planes") chart_planes!: ChartComponent
  public chartOptions = signal<Partial<ChartOptions>>({});

  constructor(private metricasService: MetricasService, 
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getMetricasPlanes()
  }

  getMetricasPlanes(){
    return this.metricasService.getMetricasPlanes().subscribe({
      next: (res) => {
        if(res.data){
          const cantidad_planes = res.data.map((item) => item.total)
          const planes = res.data.map((item) => item.plan)
          this.chartOptions.set({
            series: [
              ...cantidad_planes
            ],
            chart: {
              type: "pie",
              width: "450"
            },
            labels: [
              ...planes
            ],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: "300"
                  },
                  legend: {
                    position: "bottom",
                  }
                }
              }
            ]
          })
          this.cdr.detectChanges()
        }
      }
    })
  }

}
