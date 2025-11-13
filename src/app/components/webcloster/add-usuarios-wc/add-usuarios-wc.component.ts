import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ModalController
} from '@ionic/angular/standalone';
import { UsuariosWebClosterService } from 'src/app/core/services/usuarios-webcloster.service';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
import { RolesInterface } from 'src/app/models/roles-interface';
import { RolesUsuariosService } from 'src/app/core/services/roles-usuarios.service';
import { PaisesInterface } from 'src/app/models/paises-interface';
import { DocumentosInterface } from 'src/app/models/documentos-interface';
import { DocumentosService } from 'src/app/core/services/documentos.service';

@Component({
  selector: 'app-add-usuarios-wc',
  templateUrl: './add-usuarios-wc.component.html',
  styleUrls: ['./add-usuarios-wc.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonInput,
    IonList,
    IonSelectOption,
    IonSelect
  ]
})
export class AddUsuariosWcComponent  implements OnInit {
  // Arrays para llenar con la información de las tablas paises y documentos
  // para poder mostrarlas en los select de la vista según traiga la información el servicio
  paises = signal<PaisesInterface[]>([]);
  documentos = signal<DocumentosInterface[]>([]);
  roles = signal<RolesInterface[]>([]);
  
  // Porque ajá, es mucho complique el signal en llamado a [(ngModel)], mejor el uso normal
  dataUsuarioWc1 = signal<UsuariosWebClosterInterface[]>([]);
  dataUsuarioWc = {
      id_usuario_wc: 0,
      id_tipo_documento: 0,
      nombre_completo: '',
      correo: '',
      id_rol_usuario: 0,
      contrasena: '',
      documento: '',
      contacto: '',
      nombre_usuario: '',
    }

  // Inyección de dependencias
  constructor(private modalController: ModalController, 
    private usuariosWebClosterService: UsuariosWebClosterService, 
    private documentosService: DocumentosService,
  private rolesUsuariosService: RolesUsuariosService) { }

  ngOnInit() {}

  listarDocumentos(){
    this.documentosService.getDocuments().subscribe({
      next: (res: DocumentosInterface[]) => {
        this.documentos.set(res)
      },
      error: (err) => {
        console.error("Error al listar documentos: ", err.message)
      }
    })
  }

  listarRoles(){
    this.rolesUsuariosService.getRoles().subscribe({
      next: (res: RolesInterface[]) => {
        this.roles.set(res)
      },
      error: (err) => {
        console.error("Error al listar roles: ", err.message)
      }
    })
  }

  cancelar(){
    this.modalController.dismiss(null, "cancelar")
  }

  guardar(){
    this.modalController.dismiss(this.dataUsuarioWc, "guardar")
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
