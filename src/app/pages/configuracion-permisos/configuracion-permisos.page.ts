import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonCard,
  IonCardContent,
  IonIcon,
  AlertController,
  ModalController,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonThumbnail,
  IonText,
  IonButtons,
} from '@ionic/angular/standalone';
import { RolesUsuariosService } from 'src/app/core/services/roles-usuarios.service';
import { RolesInterface } from 'src/app/models/roles-interface';
import { AddRoleComponent } from 'src/app/components/rbca/roles/add-role/add-role.component';
import { PermisosService } from 'src/app/core/services/permisos.service';
import { EditRoleComponent } from 'src/app/components/rbca/roles/edit-role/edit-role.component';

@Component({
  selector: 'app-configuracion-permisos',
  templateUrl: './configuracion-permisos.page.html',
  styleUrls: ['./configuracion-permisos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonLabel,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonThumbnail,
    IonText,
    IonButtons,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracionPermisosPage implements OnInit {
  private permisosService = inject(PermisosService);
  private rolesService = inject(RolesUsuariosService);
  roles = signal<RolesInterface[]>([]);

  private alertController = inject(AlertController);
  private modalController = inject(ModalController);

  ngOnInit() {
    this.obtenerRoles();
  }

  // TODO: INICIO MODALES DE ALERTA
  private async showSuccesAlert(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Acción realizada con éxito',
      message: `${mensaje}`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showErrorAlert(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: `${mensaje}`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }
  // TODO: FIN MODALES DE ALERTA

  obtenerRoles() {
    this.rolesService.getRoles().subscribe({
      next: (res: RolesInterface[]) => {
        this.roles.set(res);
        console.log('roles:', this.roles());
      },
    });
  }

  async crearRolModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddRoleComponent,
      backdropDismiss: true,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log('data:', data, 'role:', role);

    if (role === 'confirm') {
      this.rolesService.createRoles(data).subscribe({
        next: async (_res: RolesInterface[]) => {
          this.rolesService.getRoles().subscribe({
            error: async (err) => {
              await this.showErrorAlert(
                'Error al obtener los roles, por favor intenta de nuevo',
              );
            },
            next: async (roles: RolesInterface[]) => {
              this.roles.set(roles);
              await this.showSuccesAlert('Rol agregado satisfactoriamente');
            },
          });
        },
        error: () => {
          this.showErrorAlert(
            'Error al agregar el rol, por favor intenta de nuevo',
          );
        },
      });
    }
  }

  async editRolmodal(rol: RolesInterface): Promise<void> {
    const modal = await this.modalController.create({
      component: EditRoleComponent,
      backdropDismiss: true,
      componentProps: {
        dataRoles: { ...rol }, // Usar spread para evitar mutar el objeto original antes de confirmar
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      // data.rol contiene los datos básicos, data.permisos contiene los IDs de permisos activos
      this.rolesService.updateRol(data.rol, data.permisos).subscribe({
        next: () => {
          // Refrescamos la lista de roles tras el éxito
          this.obtenerRoles();
          this.showSuccesAlert('Rol actualizado satisfactoriamente');
        },
        error: () => {
          this.showErrorAlert('Error al actualizar el rol');
        },
      });
    }
  }

  async deleteRolModal(rol: RolesInterface): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar el rol ${rol.nombre_rol}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.rolesService.deleteRol(rol).subscribe({
              next: () => {
                this.obtenerRoles();
                this.showSuccesAlert('Rol eliminado satisfactoriamente');
              },
              error: () => {
                this.showErrorAlert('Error al eliminar el rol');
              },
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
