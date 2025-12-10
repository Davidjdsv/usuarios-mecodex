import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
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
import { RolesDirective } from './core/directives/roles.directive';
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
  cloud,
  keyOutline,
  syncOutline
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
    LoginPage,
    RolesDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Clientes Mecodex', url: '/usuarios', icon: 'people' },
    { title: 'Usuarios webcloster', url: '/usuarios-web-closter', icon: 'cloudy' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  public isAuthenticated = computed(() => {
    const logged = this.authService.authState();
    return logged || this.authService.isAutenthicate();
  });

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
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
      cloud,
      keyOutline,
      syncOutline
    });

    console.log("El usuario está autenticado? ", this.isAuthenticated());
  }
  
  async logOut(): Promise<void> {
    // Cierra el menú lateral por UX
    try {
      await this.menuCtrl.close();
      this.authService.logOut()
    } catch {}

  }
}
