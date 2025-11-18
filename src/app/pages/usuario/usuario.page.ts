import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonAccordionGroup,
  IonAccordion,
  AlertController
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';

import { LicenciaService } from 'src/app/core/services/licencia.service';
import { LicenciaInterface } from 'src/app/models/licencia';

import { CuentaService } from 'src/app/core/services/cuenta.service';
import { CuentaInterface } from 'src/app/models/cuenta-interface';


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
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonAccordionGroup,
    IonAccordion,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private licenciaService: LicenciaService,
    private cuentaService: CuentaService,
    private alertController: AlertController
  ) {}

  licencias = signal<LicenciaInterface[]>([]);

  usuarios: UsuariosInterface[] = [];
  cuentaUsuario: CuentaInterface[] = [];

  usuarioActual: UsuariosInterface | undefined = undefined;

  id = signal<number | null>(null);
  nombre = signal<string | null>(null);
  segundo_nombre = signal<string | null>(null);
  apellido = signal<string | null>(null);
  segundo_apellido = signal<string | null>(null);
  telefono = signal<string | null>(null);
  direccion = signal<string | null>(null);
  id_tipo_documento = signal<number | null>(null);
  abreviatura = signal<string | null>(null);
  estado = signal<string | null>(null);
  modo_conexion = signal<string | null>(null);
  version_app = signal<string | null>(null);
  fecha_calificacion = signal<string | null>(null);
  calificacion = signal<number | null>(null);
  mensaje_calificacion = signal<string | null>(null);
  documento = signal<string | null>(null);
  fecha_expedicion = signal<string | null>(null);
  correo = signal<string | null>(null);
  id_pais = signal<number | null>(null);
  pais_nombre = signal<string | null>(null);
  PLAN_MECODEX = signal<string | null>(null);
  observacion_cliente = signal<string | null>(null);
  observacion_comercial = signal<string | null>(null);
  observacion_soporte = signal<string | null>(null);
  observacion_cuenta = signal<string | null>(null);
  fecha_creacion = signal<string | null>(null);
  id_usuario_sensei = signal<number | null>(null);
  fecha_modificacion = signal<string | null>(null);

  ngOnInit() {
    // A esta actual ruta, tome el id
    this.id.set(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.getUser();
  }

  getUser() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res; // guarda todos los usuarios del servicio en este array
        const usuarioEncontrado = this.usuarios.find(
          (usuario) => usuario.id === Number(this.id())
        );
        this.usuarioActual = usuarioEncontrado;
        if (usuarioEncontrado) {
          this.nombre.set(usuarioEncontrado.nombre);
          this.segundo_nombre.set(usuarioEncontrado.segundo_nombre);
          this.apellido.set(usuarioEncontrado.apellido);
          this.segundo_apellido.set(usuarioEncontrado.segundo_apellido);
          this.telefono.set(usuarioEncontrado.telefono);
          this.direccion.set(usuarioEncontrado.direccion);
          this.id_tipo_documento.set(usuarioEncontrado.id_tipo_documento);
          this.abreviatura.set(usuarioEncontrado.abreviatura || null);
          this.estado.set(usuarioEncontrado.estado || null);
          this.modo_conexion.set(usuarioEncontrado.modo_conexion || null);
          this.version_app.set(usuarioEncontrado.version_app || null);
          this.fecha_calificacion.set(
            usuarioEncontrado.fecha_calificacion || null
          );
          this.calificacion.set(usuarioEncontrado.calificacion || null);
          this.mensaje_calificacion.set(
            usuarioEncontrado.mensaje_calificacion || null
          );
          this.documento.set(usuarioEncontrado.documento || null);
          this.fecha_expedicion.set(usuarioEncontrado.fecha_expedicion || null);
          this.correo.set(usuarioEncontrado.correo || null);
          this.id_pais.set(usuarioEncontrado.id_pais || null);
          this.pais_nombre.set(usuarioEncontrado.pais_nombre || null);
          this.PLAN_MECODEX.set(usuarioEncontrado.PLAN_MECODEX || null);
          this.observacion_cliente.set(
            usuarioEncontrado.observacion_cliente || null
          );
          this.observacion_comercial.set(
            usuarioEncontrado.observacion_comercial || null
          );
          this.observacion_soporte.set(
            usuarioEncontrado.observacion_soporte || null
          );
          this.observacion_cuenta.set(
            usuarioEncontrado.observacion_cuenta || null
          );
          this.fecha_creacion.set(usuarioEncontrado.fecha_creacion || null);
          this.id_usuario_sensei.set(
            usuarioEncontrado.id_usuario_sensei || null
          );
          this.fecha_modificacion.set(
            usuarioEncontrado.fecha_modificacion || null
          );
          console.log(this.usuarioActual);
        }
      },
      error(err: any) {
        console.error('Error al obtener el usuario:', err);
      },
    });
  }

  getLicencias() {
    this.licenciaService.getLicenciasService().subscribe({
      next: (res) => {
        this.licencias.set(res.data);
      },
      error(err: any) {
        console.error('Error al obtener las licencias:', err);
      },
    });
  }

  getCuentaUsuario(){
    this.cuentaService.getCuenta().subscribe({
      next: (res) => {
        this.cuentaUsuario = res
      },
      error(err: any) {
        console.error('Error al obtener la cuenta:', err);
      },
    });
  }

  idLicencia = signal<number | null>(null);
  showIdlicencia = computed(() => this.idLicencia());

  manejarEvento(event: CustomEvent) {
    console.log('ionChange fired with value: ' + event.detail.value);
    return this.idLicencia.set(event.detail.value);
  }

  private async actualizarPlanSuccess(): Promise<void>{
    const modal = await this.alertController.create({
      header: 'Plan actualizado',
      message: 'El plan ha sido actualizado con éxito',
      buttons: ['OK'],
    });
    await modal.present();
  }

  private async actualizarPLanFailure(): Promise<void>{
    const modal = await this.alertController.create({
      header: "Error",
      message: "El plan seleccionado es el mismo plan actual de la cuenta del cliente",
      buttons: ['OK'],
    });
    await modal.present();
  }

  actualizarPlan() {
    console.log('El valor seleccionado por el usuario es de: ', this.showIdlicencia());
    const nuevaLicencia = this.showIdlicencia();
    if (nuevaLicencia !== null && this.usuarioActual) {
      this.cuentaService.updateCuentaLicencia(nuevaLicencia, this.usuarioActual.id).subscribe({
          next: (res) => {
            console.log('Licencia actualizada con éxito:', res);
            this.actualizarPlanSuccess();
          },
          error: (err: any) => {
            console.error('Error al actualizar la licencia:', err);
            this.actualizarPLanFailure();
          },
        });
    }
  }
}
