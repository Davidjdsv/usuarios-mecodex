import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonThumbnail,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonThumbnail,
    IonItem,
    IonLabel,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    CommonModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosPage implements OnInit {
  folder = signal('Usuarios Mecodex');
  // * Una señal de tipo array de UsuariosInterface que contiene un array vacío como valor inicial
  usuarios = signal<UsuariosInterface[]>([]);

  constructor() {}

  private usuariosServices = inject(UsuariosService)

  ngOnInit() {
    setTimeout(() => {
      this.usuariosServices.getUsuarios().subscribe({
        next: (res: UsuariosInterface[]) => {
          this.usuarios.set(res)
          // this.usuarios.update((usuarios) => [...usuarios, ... res])
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }, 1000)
  }
}
