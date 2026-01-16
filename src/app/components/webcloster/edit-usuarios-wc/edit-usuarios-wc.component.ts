import { Component, OnInit, signal, Input, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonInput,
  IonList,
  IonSelectOption,
  IonSelect,
  IonToggle,
  IonNote,
  IonIcon,
  ModalController,
} from '@ionic/angular/standalone';

import { DocumentosInterface } from 'src/app/models/documentos-interface';
import { DocumentosService } from 'src/app/core/services/documentos.service';

import { RolesInterface } from 'src/app/models/roles-interface';
import { RolesUsuariosService } from 'src/app/core/services/roles-usuarios.service';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';

@Component({
  selector: 'app-edit-usuarios-wc',
  templateUrl: './edit-usuarios-wc.component.html',
  styleUrls: ['./edit-usuarios-wc.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonInput,
    IonList,
    IonSelectOption,
    IonSelect,
    IonToggle,
    IonNote,
    IonIcon,
    FormsModule
  ],
})
export class EditUsuariosWcComponent implements OnInit {

  // Estas 2 sintaxis son validas
  documentos = signal(<DocumentosInterface[]>[]);
  roles = signal<RolesInterface[]>([]);

  documentosServices = inject(DocumentosService);
  rolesUsuariosServices = inject(RolesUsuariosService);
  modalController = inject(ModalController);

  @Input() dataUsuarioWc: UsuariosWebClosterInterface = {} as UsuariosWebClosterInterface;

  ngOnInit() {}

  getDocumentos() {
    this.documentosServices.getDocuments().subscribe({
      next: (_res: DocumentosInterface[]) => {
        this.documentos.set(_res);
      },
    });
  }

  getRoles() {
    this.rolesUsuariosServices.getRoles().subscribe({
      next: (_res: RolesInterface[]) => {
        this.roles.set(_res);
      },
    });
  }

  isToggleChecked(event: any){
    const isChecked = event.detail.checked;

    this.dataUsuarioWc.activo = isChecked ? 1 : 0;
    console.log("Activo: ", this.dataUsuarioWc.activo)
  }

  guardar() {
    this.modalController.dismiss(this.dataUsuarioWc, 'guardar');
  }

  cancelar() {
    this.modalController.dismiss(null, 'cancelar');
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.guardar()
    }else{
      // Marca los controles como tocados para que se muestren estados de error si agregas mensajes
      Object.values(form.controls).forEach(c => c.markAsTouched())
    }
  }
}
