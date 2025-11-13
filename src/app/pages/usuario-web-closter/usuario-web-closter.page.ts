import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonThumbnail,
  IonItem,
  IonIcon,
  IonLabel,
  IonText,
  IonButton
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';

@Component({
  selector: 'app-usuario-web-closter',
  templateUrl: './usuario-web-closter.page.html',
  styleUrls: ['./usuario-web-closter.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
    IonItem,
    IonIcon,
    IonLabel,
    IonText,
    IonButton,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioWebClosterPage implements OnInit {
  usuarioWc = signal<UsuariosWebClosterInterface[]>([]);
  
  ngOnInit() {}
}
