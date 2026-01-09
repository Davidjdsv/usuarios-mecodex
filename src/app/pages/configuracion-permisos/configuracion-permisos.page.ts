import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
  IonCard,
  IonCardContent,
  IonIcon,
  AlertController,
  ModalController,
  IonButton
} from '@ionic/angular/standalone';
import { RolesUsuariosService } from 'src/app/core/services/roles-usuarios.service';
import { RolesInterface } from 'src/app/models/roles-interface';
import { AddRoleComponent } from 'src/app/components/rbca/roles/add-role/add-role.component';

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
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSegmentView,
    IonSegmentContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracionPermisosPage implements OnInit {
  private rolesService = inject(RolesUsuariosService)
  private roles = signal<RolesInterface[]>([])
  
  private alertController = inject(AlertController)
  private modalController = inject(ModalController)

  ngOnInit() {}

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

  async crearRolModal(): Promise<void>{
    const modal = await this.modalController.create({
      component: AddRoleComponent,
      backdropDismiss: true,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log('data:', data, 'role:', role);
    if (role === 'confirm') {
      this.rolesService.createRoles(data).subscribe({
        next: (res: RolesInterface[]) => {
          this.roles.set(res);
          this.showSuccesAlert("Rol agregado satisfactoriamente");
        },
        error: () => {
          this.showErrorAlert("Error al agregar el rol, por favor intenta de nuevo");
        },
      });
    }
  }
}
