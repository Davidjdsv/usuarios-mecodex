import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonText,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-usuarios-web-closter',
  templateUrl: './usuarios-web-closter.page.html',
  styleUrls: ['./usuarios-web-closter.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonSearchbar,
    IonText,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ]
})
export class UsuariosWebClosterPage implements OnInit {
  /**
   * Componente de página para visualizar la estructura de usuarios de Mecodex.
   * No contiene lógica ni variables dinámicas; solo replica la estructura HTML
   * con componentes de Ionic necesarios para la vista.
   *
   * Parámetros: ninguno.
   * Retorno: void.
   * Excepciones: no aplica.
   */
  constructor() {}

  /**
   * Ciclo de vida de inicialización del componente.
   * Actualmente no realiza ninguna acción ya que la página es estática.
   *
   * Parámetros: ninguno.
   * Retorno: void.
   * Excepciones: no aplica.
   */
  ngOnInit(): void {}
}
