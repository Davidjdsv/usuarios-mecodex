import {
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonToggle,
  IonList,
  IonNote,
  IonListHeader,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';
import { PermisosService } from 'src/app/core/services/permisos.service';
import { RolesUsuariosService } from 'src/app/core/services/roles-usuarios.service';
import {
  PermisosDataInterface,
  PermisosInterface,
  PermisosResponseInterface,
} from 'src/app/models/permisos';
import { RolesInterface } from 'src/app/models/roles-interface';
@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonToggle,
    IonList,
    IonNote,
    IonListHeader,
    IonLabel,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRoleComponent implements OnInit {
  @Input() dataRoles: RolesInterface = {} as RolesInterface;

  private modalCtrl = inject(ModalController);
  private permisosService = inject(PermisosService);
  private rolesUsuariosService = inject(RolesUsuariosService);
  permisos = signal<PermisosInterface[]>([]);

  // Array para almacenar los IDs de los permisos seleccionados
  permisosSeleccionados: number[] = [];

  ngOnInit() {
    this.obtenerPermisos();
    this.cargarPermisosDelRol(this.dataRoles);
  }

  /**
  * Obtiene toda la lista de permisos para ser mostrados en la modal y así poder seleccionarlos
  * @returns Observable<PermisosResponseInterface>
  */
  obtenerPermisos() {
    this.permisosService.getPermisos().subscribe({
      next: (res: PermisosDataInterface) => {
        this.permisos.set(res.general);
        console.log('permisos:', this.permisos());
      },
    });
  }

  /**
   * Cargar los permisos que ya tiene el rol asignados desde la base de datos cuando se abre el modal
   * @param rol rol a consultar permisos activos en la base de datos
   */
  cargarPermisosDelRol(rol: RolesInterface) {
    this.rolesUsuariosService.getPermisosActivos(rol).subscribe({
      next: (permisos: any) => {
        this.permisosSeleccionados = permisos;
        console.log('Permisos activos del rol:', this.permisosSeleccionados);
      },
      error: (err) => {
        console.error('Error al cargar permisos:', err);
      },
    });
  }

  /**
   * Verifica si un permiso está activo en el rol
   * @param idPermiso ID del permiso a verificar
   * @returns boolean indicando si el permiso está activo. Este se usa en el html
   * para marcar los toggles como activos o no del rol seleccionado
   */
  isPermisoSeleccionado(idPermiso: number): boolean {
    return this.permisosSeleccionados.includes(idPermiso);
  }

  /**
   * Alterna la selección de un permiso en el rol
   * @param event Evento de cambio de estado del toggle
   * @param idPermiso ID del permiso a alternar
   */
  togglePermiso(event: any, idPermiso: number) {
    const isChecked = event.detail.checked;

    if (isChecked) {
      this.permisosSeleccionados.push(idPermiso);
    } else {
      this.permisosSeleccionados = this.permisosSeleccionados.filter(
        (id) => id !== idPermiso
      );
    }
    console.log('Permisos seleccionados:', this.permisosSeleccionados);
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    // Enviamos un objeto que contenga los datos del rol Y los permisos elegidos
    const dataDeRetorno = {
      rol: this.dataRoles,
      permisos: this.permisosSeleccionados,
    };
    this.modalCtrl.dismiss(dataDeRetorno, 'confirm');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.guardar();
    } else {
      Object.values(form.controls).forEach((c) => c.markAsTouched());
    }
  }
}
