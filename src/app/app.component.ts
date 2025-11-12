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
  AlertController
} from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';
import { AuthService } from './core/services/auth-service/auth.service';
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
  logOutSharp,
  cloudyOutline,
  cloudySharp,
  cloud
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
    { title: 'Usuarios webcloster', url: '/usuarios-web-closter', icon: 'cloudy' },
    { title: "login", url: "/login", icon: "log-in" },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private menuCtrl: MenuController,
    private autSerivce: AuthService,
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
      logOutSharp,
      cloudyOutline,
      cloudySharp,
      cloud
    });
  }

  async logOut(): Promise<void> {
    // Cierra el menú lateral por UX
    try {
      await this.menuCtrl.close();
      this.autSerivce.logOut()
    } catch {}

  }
}
