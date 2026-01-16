import { Component, OnInit, inject, signal } from '@angular/core';
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
import { PermisosDataInterface, PermisosInterface, PermisosResponseInterface } from 'src/app/models/permisos';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
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
})
export class AddRoleComponent implements OnInit {
  dataRole = {
    nombre_rol: '',
    descripcion: '',
    activo: 1,
  };

  private modalCtrl = inject(ModalController);
  private permisosService = inject(PermisosService);
  permisos = signal<PermisosInterface[]>([]);

  // Array para almacenar los IDs de los permisos seleccionados
  permisosSeleccionados: number[] = [];

  ngOnInit() {
    this.obtenerPermisos();
  }

  obtenerPermisos() {
    this.permisosService.getPermisos().subscribe({
      next: (res: PermisosDataInterface) => {
        this.permisos.set(res.general)
        console.log('permisos:', this.permisos());
      },
    });
  }

  // Método para manejar el cambio en los toggles de permisos
  togglePermiso(event: any, idPermiso: number) {
    const isChecked = event.detail.checked;

    if (isChecked) {
      // Si se activa, agregar el ID al array
      this.permisosSeleccionados.push(idPermiso);
    } else {
      // Si se desactiva, remover el ID del array
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
    // Combinar los datos del rol con los permisos seleccionados
    const dataToSave = {
      ...this.dataRole,
      permisos: this.permisosSeleccionados,
    };
    this.modalCtrl.dismiss(dataToSave, 'confirm');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.guardar();
    } else {
      // Marca los controles como tocados para que se muestren estados de error si agregas mensajes
      Object.values(form.controls).forEach((c) => c.markAsTouched());
    }
  }
}
