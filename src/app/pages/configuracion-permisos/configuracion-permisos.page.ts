import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  IonCard,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-configuracion-permisos',
  templateUrl: './configuracion-permisos.page.html',
  styleUrls: ['./configuracion-permisos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSegmentView,
    IonSegmentContent,
    IonCard,
    IonCardContent,
    IonIcon,
  ],
})
export class ConfiguracionPermisosPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
