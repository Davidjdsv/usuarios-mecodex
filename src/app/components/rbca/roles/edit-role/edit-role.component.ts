import { Component, OnInit, inject, signal, ChangeDetectionStrategy, Input } from '@angular/core';
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
  IonLabel
} from '@ionic/angular/standalone';
import { PermisosService } from 'src/app/core/services/permisos.service';
import { RolesUsuariosService } from 'src/app/core/services/roles-usuarios.service';
import { PermisosDataInterface, PermisosInterface, PermisosResponseInterface } from 'src/app/models/permisos';
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
    // CAMBIO 2: Cargar los permisos que ya tiene el rol cuando se abre el modal
    this.cargarPermisosDelRol(this.dataRoles);
  }

  obtenerPermisos() {
    this.permisosService.getPermisos().subscribe({
      next: (res: PermisosDataInterface) => {
        this.permisos.set(res.general)
        console.log('permisos:', this.permisos());
      },
    });
  }

  cargarPermisosDelRol(rol: RolesInterface) {
    this.rolesUsuariosService.getPermisosActivos(rol).subscribe({
      next: (permisos: any) => {
        this.permisosSeleccionados = permisos;
        console.log("Permisos activos del rol:", this.permisosSeleccionados);
      },
      error: (err) => {
        console.error("Error al cargar permisos:", err);
      }
    });
  }

  // Método para verificar si un permiso está activo (lo usará el HTML)
  isPermisoSeleccionado(idPermiso: number): boolean {
    return this.permisosSeleccionados.includes(idPermiso);
  }

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
    // CAMBIO 3: Cambiar dataRoles por rol
    this.modalCtrl.dismiss(this.dataRoles, 'confirm');  // <- antes usaba "this.dataRoles"
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.guardar();
    } else {
      Object.values(form.controls).forEach((c) => c.markAsTouched());
    }
  }
}
