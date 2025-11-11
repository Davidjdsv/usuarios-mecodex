import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
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
import { UsuariosWebClosterService } from 'src/app/core/services/usuarios-webcloster.service';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosWebClosterPage implements OnInit {
  folder = signal('Usuarios web closter')
  usuariosWc = signal(<UsuariosWebClosterInterface[]>([]))

  constructor(private usuariosWebClosterService: UsuariosWebClosterService) {}

  ngOnInit(): void {
    this.getUsuariosWebCloster()
  }

  getUsuariosWebCloster(){
    this.usuariosWebClosterService.getUsuariosWebCloster().subscribe({
      next: (res: UsuariosWebClosterInterface[]) => {
        console.log(res)
        this.usuariosWc.set(res)
      }
    })
  }
}
