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

// Se importa cada componente con sus respectivas gráficas
import { ClientChartComponent } from 'src/app/components/charts/client-chart/client-chart.component';
import { PaisChartComponent } from 'src/app/components/charts/pais-chart/pais-chart.component';
import { PlanesChartComponent } from 'src/app/components/charts/planes-chart/planes-chart.component';
import { EvolucionClientesChartComponent } from 'src/app/components/charts/evolucion-clientes-chart/evolucion-clientes-chart.component';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
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
