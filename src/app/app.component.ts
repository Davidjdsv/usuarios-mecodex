import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  peopleOutline,
  peopleSharp,
  personOutline,
  personSharp,
  callOutline,
  callSharp,
  documentTextOutline,
  documentTextSharp,
  cardOutline,
  cardSharp,
  globeOutline,
  globeSharp,
  caretForwardOutline,
  logOutOutline, 
  logOutSharp
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Clientes Mecodex', url: '/usuarios', icon: 'people' },
    { title: "login", url: "/login", icon: "log-in" },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
  ) {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      peopleOutline,
      peopleSharp,
      personOutline,
      personSharp,
      callOutline,
      callSharp,
      documentTextOutline,
      documentTextSharp,
      cardOutline,
      cardSharp,
      globeOutline,
      globeSharp,
      caretForwardOutline,
      logOutOutline,
      logOutSharp
    });
  }

  /**
   * Cierra la sesión del usuario y navega a la página de login.
   * Parámetros: ninguno
   * Retorno: void
   * Excepciones: no lanza; si falla el cierre del menú o la navegación, se ignora silenciosamente.
   */
  async logout(): Promise<void> {

    // Cierra el menú lateral por UX
    try {
      await this.menuCtrl.close();
    } catch {}

  }
}
