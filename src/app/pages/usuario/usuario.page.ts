import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject
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
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonImg,
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
  AlertController,
  ModalController
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';

import { LicenciaService } from 'src/app/core/services/licencia.service';
import { LicenciaInterface } from 'src/app/models/licencia';

import { CuentaService } from 'src/app/core/services/cuenta.service';
import { CuentaInterface } from 'src/app/models/cuenta-interface';
import { AddCuentaComponent } from 'src/app/components/cuenta-cliente/add-cuenta/add-cuenta.component';

import { HidePasswordPipe } from 'src/app/core/pipes/hide-password.pipe';


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
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonImg,
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
    HidePasswordPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioPage implements OnInit {
  constructor(
  ) {}

  private activatedRoute = inject(ActivatedRoute)
  private usuariosService = inject(UsuariosService)
  private licenciaService = inject(LicenciaService)
  private cuentaService = inject(CuentaService)
  private alertController = inject(AlertController)
  private modalController = inject(ModalController)

  // * INTERFACES 
  licencias = signal<LicenciaInterface[]>([]);
  usuarios = signal<UsuariosInterface[]>([]);
  cuentaUsuario = signal<CuentaInterface[]>([]);
  usuarioActual = signal<UsuariosInterface[]>([]);
  useUsuario = signal<UsuariosInterface | undefined>(undefined);
  useCuenta = signal<CuentaInterface | undefined>(undefined);
  // Variables para almacenar los datos del cliente y de la cuenta que son de tipo interface
  id = signal<number | null>(null);
  id_cuenta = signal<number | null>(null)
  plan = signal<string>("")

  ngOnInit() {
    this.id.set(Number(this.activatedRoute.snapshot.paramMap.get('id')));
    this.id_cuenta.set(Number(this.activatedRoute.snapshot.paramMap.get('id_cuenta')));
    console.log("El usuario es: ", this.id());
    console.log("El id de la cuenta es: ", this.id_cuenta());
    this.getUsers();
    this.getCuentaUsuario();
  }

  getUsers() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios.set(res); // guarda todos los usuarios del servicio en este array de tipo interface
        const usuarioEncontrado = this.usuarios().find((usuario) => usuario.id === Number(this.id())
        );
        this.useUsuario.set(usuarioEncontrado);
        // this.usuarioActual.set(usuarioEncontrado);
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
  this.cuentaService.getCuenta(Number(this.id())).subscribe({
    next: (res) => {
      this.cuentaUsuario.set(res);
      
      if (res.length > 0) {
        this.useCuenta.set(res[0]); // Primera cuenta por defecto
        console.log("Cantidad de cuentas del usuario: ", res.length);
        console.log("Todas las cuentas: ", res);
        console.log("Cuenta por defecto seleccionada: ", this.useCuenta());
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

actualizarPlan(idCuenta: number) {
  console.log('El valor seleccionado es:', this.showIdlicencia(), "el id de cuenta es:", idCuenta);
  
  const nuevaLicencia = this.showIdlicencia();
  
  if (nuevaLicencia !== null && idCuenta) {
    this.cuentaService.updateCuentaLicencia(nuevaLicencia, idCuenta).subscribe({
      next: (res) => {
        console.log('Licencia actualizada con éxito:', res);
        this.actualizarPlanSuccess();
        this.getCuentaUsuario();
      },
      error: (err: any) => {
        console.error('Error al actualizar la licencia:', err);
        this.actualizarPLanFailure();
      },
    });
  }
}

  // * CREAR CUENTA DE UN CLIENTE CUANDO NO TIENE CUENTA ASOCIADA
  async crearCuenta(){
    const modal = await this.modalController.create({
      component: AddCuentaComponent,
      componentProps: {
        id_cliente: Number(this.id()),
      }
    })
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data, role);

    if(role === "guardar"){
      if(data.idLicencia == 1){
        this.plan.set("LITE");
      } else if(data.id_licencia == 2){
        this.plan.set("PRO")
      } else {
        this.plan.set("PRO PLUS")
      }
      this.cuentaService.createCuenta(data).subscribe({
        next: (res) => {
          console.log('Cuenta creada con éxito:', res);
          this.cuentaCreadaSuccess(this.useUsuario()?.nombre, this.plan());
          this.getCuentaUsuario();
        },
        error: (err: any) => {
          console.error('Error al crear la cuenta:', err);
          this.cuentaCreadaError(this.useUsuario()?.nombre);
        },
      })
    }
  }

  // * INICIO MODALES DE ALERTA

  private async cuentaCreadaSuccess(cliente?: string, plan?: string): Promise<void>{
    const modal = await this.alertController.create({
      header: 'Cuenta creada',
      message: `La cuenta ha sido creada con éxito para el cliente ${cliente} con el plan ${plan}`,
      buttons: ['OK'],
    });
    await modal.present();
  }

  private async cuentaCreadaError(cliente?: string): Promise<void>{
    const modal = await this.alertController.create({
      header: 'Error',
      message: `Error al crear la cuenta para el cliente ${cliente}`,
      buttons: ['OK'],
    });
    await modal.present();
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
  // * FIN MODALES DE ALERTA
}
