import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonThumbnail,
  IonIcon,
  IonBadge,
  IonItem,
  IonLabel,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonThumbnail,
    IonIcon,
    IonBadge,
    IonItem,
    IonLabel,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}
  usuarios: UsuariosInterface[] = []
  id = signal<number | null>(null)
  nombre = signal<string | null>(null)
  segundo_nombre = signal<string | null>(null)
  apellido = signal<string | null>(null)
  segundo_apellido = signal<string | null>(null)
  telefono = signal<string | null>(null)
  direccion = signal<string | null>(null)
  id_tipo_documento = signal<number | null>(null)
  documento = signal<string | null>(null)
  fecha_expedicion = signal<string | null>(null)
  correo = signal<string | null>(null)
  id_pais = signal<number | null>(null)
  pais_nombre = signal<string | null>(null)
  PLAN_MECODEX = signal<string | null>(null)
  observacion_cliente = signal<string | null>(null)
  observacion_comercial = signal<string | null>(null)
  observacion_soporte = signal<string | null>(null)
  observacion_cuenta = signal<string | null>(null)
  fecha_creacion = signal<string | null>(null)
  id_usuario_sensei = signal<number | null>(null)
  fecha_modificacion = signal<string | null>(null)

  ngOnInit() {
    // A esta actual ruta, tome el id
    this.id.set(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.getUser();
  }

  getUser() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res; // guarda todos los usuarios del servicio en este array
        const usuarioEncontrado = this.usuarios.find((usuario) => usuario.id ===  Number(this.id()));
        if (usuarioEncontrado) {
          this.nombre.set(usuarioEncontrado.nombre)
          this.segundo_nombre.set(usuarioEncontrado.segundo_nombre)
          this.apellido.set(usuarioEncontrado.apellido)
          this.segundo_apellido.set(usuarioEncontrado.segundo_apellido)
          this.telefono.set(usuarioEncontrado.telefono)
          this.direccion.set(usuarioEncontrado.direccion)
          this.id_tipo_documento.set(usuarioEncontrado.id_tipo_documento)
          this.documento.set(usuarioEncontrado.documento)
          this.fecha_expedicion.set(usuarioEncontrado.fecha_expedicion)
          this.correo.set(usuarioEncontrado.correo)
          this.id_pais.set(usuarioEncontrado.id_pais)
          this.pais_nombre.set(usuarioEncontrado.pais_nombre)
          this.PLAN_MECODEX.set(usuarioEncontrado.PLAN_MECODEX)
          this.observacion_cliente.set(usuarioEncontrado.observacion_cliente)
          this.observacion_comercial.set(usuarioEncontrado.observacion_comercial)
          this.observacion_soporte.set(usuarioEncontrado.observacion_soporte)
          this.observacion_cuenta.set(usuarioEncontrado.observacion_cuenta)
          this.fecha_creacion.set(usuarioEncontrado.fecha_creacion)
          this.id_usuario_sensei.set(usuarioEncontrado.id_usuario_sensei || null)
          this.fecha_modificacion.set(usuarioEncontrado.fecha_modificacion || null)
          console.log('Hola, soy', this.nombre());
        }
      },
      error(err: any) {
        console.error('Error al obtener el usuario:', err);
      },
    });
  }
}
