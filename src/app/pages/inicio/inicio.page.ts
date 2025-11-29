import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
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
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { ClientChartComponent } from 'src/app/components/charts/client-chart/client-chart.component';

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
    IonButton,
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
  ],
})
export class InicioPage implements OnInit {
  // 4️⃣ ViewChild para obtener referencia al componente del chart (opcional, útil para manipularlo después)
  @ViewChild('chart') chart!: ChartComponent;

  // 5️⃣ Variable que contiene todas las opciones de configuración del gráfico
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    // 6️⃣ Inicializar las opciones del gráfico en el constructor
    this.chartOptions = {
      // Los datos que se van a graficar
      series: [
        {
          name: 'cosa', // Nombre de la serie (aparece en la leyenda)
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // Valores para cada categoría
        },
      ],
      // Configuración general del gráfico
      chart: {
        height: 350, // Altura del gráfico en píxeles
        type: 'bar', // Tipo de gráfico (bar, line, area, pie, donut, etc.)
      },
      // Título que aparece arriba del gráfico
      title: {
        text: 'Mi Primer Gráfico con ApexCharts',
      },
      // Configuración del eje X (las categorías horizontales)
      xaxis: {
        categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
        ],
      },
    };
  }

  ngOnInit() {
    // Aquí puedes agregar lógica adicional si necesitas cargar datos desde una API
  }

  // 7️⃣ Ejemplo de método para actualizar los datos del gráfico dinámicamente
  actualizarDatos() {
    // Al cambiar series, el gráfico se actualiza automáticamente
    this.chartOptions.series = [
      {
        name: 'Ventas Actualizadas',
        data: [23, 44, 1, 22, 88, 45, 70, 30, 100],
      },
    ];
  }
}
