import { Component, OnInit, signal, ChangeDetectionStrategy, inject } from '@angular/core';
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
import { UsuariosWebClosterService } from 'src/app/core/services/usuarios-webcloster.service';
import { find, map } from 'rxjs';

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
  // Inyección de dependencias de router y servicio
  route = inject(ActivatedRoute)
  usuarioWebClosterService = inject(UsuariosWebClosterService)

  // Señal única con el usuario a mostrar en detalle
  usuario_wc = signal<UsuariosWebClosterInterface | null>(null)
  // Señal para el parámetro de ruta capturado
  id_usuario_wc = signal<number>(0)

  // Captura el id desde la URL y consulta el backend para obtener el detalle
  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id_usuario_wc')
    this.id_usuario_wc.set(Number(idParam || '0'))
    if (this.id_usuario_wc()) {
      this.obtenerUsuarioWc(this.id_usuario_wc())
    }
  }

  // Realiza la solicitud al backend por `id_usuario_wc` y actualiza la señal `usuario_wc`
  private obtenerUsuarioWc(id: number) {
    this.usuarioWebClosterService.getUsuariosWebCloster().subscribe({
      next: (usuarios: UsuariosWebClosterInterface[]) => {
        const usuario = usuarios.find((usarioWc) => usarioWc.id_usuario_wc === id)
        if (usuario) {
          this.usuario_wc.set(usuario)
        } else {
          console.error('Usuario Web Closter no encontrado')
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario Web Closter por ID:', err)
      }
    })
  }
}
