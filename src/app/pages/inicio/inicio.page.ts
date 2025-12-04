import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
} from '@ionic/angular/standalone';

// 1️⃣ Importar el módulo de ApexCharts y los tipos necesarios
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { ClientChartComponent } from 'src/app/components/charts/client-chart/client-chart.component';
import { PaisChartComponent } from 'src/app/components/charts/pais-chart/pais-chart.component';
import { PlanesChartComponent } from 'src/app/components/charts/planes-chart/planes-chart.component';
import { EvolucionClientesChartComponent } from 'src/app/components/charts/evolucion-clientes-chart/evolucion-clientes-chart.component';

// 2️⃣ Definir el tipo de opciones del chart (esto hace más fácil trabajar con TypeScript)
export type ChartOptions = {
  series: ApexAxisChartSeries; // Los datos que se van a mostrar
  chart: ApexChart; // Configuración general del gráfico (tipo, altura, etc)
  xaxis: ApexXAxis; // Configuración del eje X (categorías)
  title: ApexTitleSubtitle; // Título del gráfico
};

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  // 3️⃣ Agregar NgApexchartsModule a los imports para poder usar <apx-chart>
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    ClientChartComponent,
    PlanesChartComponent, 
    PaisChartComponent,
    EvolucionClientesChartComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InicioPage implements OnInit {
  ngOnInit() {
  }
}
