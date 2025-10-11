import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
    // IonMenuButton,
    // IonButtons,
    // IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonThumbnail,
    IonIcon,
    IonItem,
    IonLabel,
    IonText,
    // IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
  ) {}
  usuarios: UsuariosInterface[] = [];
  id: any;
  finalId: any;
  nombre?: string;
  segundo_nombre?: string;
  apellido?: string;
  segundo_apellido?: string;
  telefono?: string;
  direccion?: string;
  id_tipo_documento?: number;
  documento?: string;
  fecha_expedicion?: string;
  correo?: string;
  id_pais?: number;
  pais_nombre?: string;
  PLAN_MECODEX?: string;
  observacion_cliente?: string | null;
  observacion_comercial?: string | null;
  observacion_soporte?: string | null;
  observacion_cuenta?: string | null;
  fecha_creacion?: string;
  id_usuario_sensei?: number;
  fecha_modificacion?: string;

  ngOnInit() {
    // A esta actual ruta, tome el id
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res; // guarda todos los usuarios del servicio en este array
        const usuarioEncontrado = this.usuarios.find(
          (usuario) => usuario.id === Number(this.id)
        );
        if (usuarioEncontrado) {
          this.nombre = usuarioEncontrado.nombre;
          this.segundo_nombre = usuarioEncontrado.segundo_nombre;
          this.apellido = usuarioEncontrado.apellido;
          this.segundo_apellido = usuarioEncontrado.segundo_apellido;
          this.telefono = usuarioEncontrado.telefono;
          this.direccion = usuarioEncontrado.direccion;
          this.id_tipo_documento = usuarioEncontrado.id_tipo_documento;
          this.documento = usuarioEncontrado.documento;
          this.fecha_expedicion = usuarioEncontrado.fecha_expedicion;
          this.correo = usuarioEncontrado.correo;
          this.id_pais = usuarioEncontrado.id_pais;
          this.pais_nombre = usuarioEncontrado.pais_nombre;
          this.PLAN_MECODEX = usuarioEncontrado.PLAN_MECODEX;
          this.observacion_cliente = usuarioEncontrado.observacion_cliente;
          this.observacion_comercial = usuarioEncontrado.observacion_comercial;
          this.observacion_soporte = usuarioEncontrado.observacion_soporte;
          this.observacion_cuenta = usuarioEncontrado.observacion_cuenta;
          this.cdr.detectChanges();
          console.log('Hola, soy', this.nombre);
        }
      },
      error(err: any) {
        console.error('Error al obtener el usuario:', err);
      },
    });
  }
}
