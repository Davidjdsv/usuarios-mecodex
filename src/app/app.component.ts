import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { AuthService } from './core/services/auth/auth.service';
import { PermisosDirective } from './core/directives/permisos.directive';
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
  syncOutline,
  documentOutline,
  documentSharp,
  addCircle
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
    PermisosDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public appPages = [
    { 
      title: 'Inicio', 
      url: '/inicio', 
      icon: 'home', 
      permisos: [9] },
    {
      title: 'Clientes Mecodex',
      url: '/usuarios',
      icon: 'people',
      permisos: [1],
    },
    {
      title: 'Usuarios webcloster',
      url: '/usuarios-web-closter',
      icon: 'cloudy',
      permisos: [5],
    },
    {
      title: 'RBCA',
      url: '/configuracion-permisos',
      icon: 'key',
      permisos: [10],
    },
  ];

  isAuthenticated = computed(() => {
    const logged = this.authService.authState();
    return logged || this.authService.isAutenthicate();
  });

  currentUser = toSignal<any | null>(
    inject(AuthService).datosUsuario$
  )

  currentUserName = computed(() => {
    return this.currentUser()?.usuario?.nombre_usuario || 'Usuario'
  })


  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService
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
      syncOutline,
      documentOutline,
      documentSharp,
      addCircle
    });
  }

  async logOut(): Promise<void> {
    // Cierra el menú lateral por UX
    try {
      await this.menuCtrl.close();
      this.authService.logOut();
    } catch {}
  }

  goToDocs() {
    window.open('http://localhost:3000/usuarios-mecodex/', '_blank');
  }
}
