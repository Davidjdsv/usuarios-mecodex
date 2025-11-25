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
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
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
    IonSegment,
    IonSegmentButton,
    IonSegmentView,
    IonSegmentContent,
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

  // * INTERFACES 
  licencias = signal<LicenciaInterface[]>([]);
  usuarios = signal<UsuariosInterface[]>([]);
  cuentaUsuario = signal<CuentaInterface[]>([]);
  usuarioActual = signal<UsuariosInterface | undefined>(undefined);
  useUsuario = signal<UsuariosInterface | undefined>(undefined);
  useCuenta = signal<CuentaInterface | undefined>(undefined);
  // Variables para almacenar los datos del cliente y de la cuenta que son de tipo interface
  id = signal<number | null>(null);

  ngOnInit() {
    this.id.set(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.getUser();
    this.getCuentaUsuario();
  }

  getUser() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios.set(res); // guarda todos los usuarios del servicio en este array de tipo interface
        const usuarioEncontrado = this.usuarios().find((usuario) => usuario.id === Number(this.id())
        );
        this.useUsuario.set(usuarioEncontrado);
        this.usuarioActual.set(usuarioEncontrado);
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
        this.cuentaUsuario.set(res)
        const cuenta = res.find(c => c.id_cliente === Number(this.id()));
        if (cuenta) {
          this.useCuenta.set(cuenta);
        }
      },
      error(err: any) {
        console.error('Error al obtener la cuenta:', err);
      },
    });
  }

  idLicencia = signal<number | null>(null);
  showIdlicencia = computed(() => this.idLicencia());

  getLicenciaSeleccionada(event: CustomEvent) {
    console.log('ionChange fired with value: ' + event.detail.value);
    return this.idLicencia.set(event.detail.value);
  }

  actualizarPlan() {
    console.log('El valor seleccionado por el usuario es de: ', this.showIdlicencia(), "el id de usuario es: ", this.id());
    const nuevaLicencia = this.showIdlicencia();
    const idUsuario = this.id();
    if (nuevaLicencia !== null && idUsuario) {
      this.cuentaService.updateCuentaLicencia(nuevaLicencia, idUsuario).subscribe({
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

  // * INICIO MODALES DE ALERTA
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
  // * FIN MODALES DE ALERTA
}
