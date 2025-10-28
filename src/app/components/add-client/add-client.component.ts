import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  ModalController,
} from '@ionic/angular/standalone';

import { UsuariosInterface } from 'src/app/models/usuarios-interface';

import { PaisesInterface } from 'src/app/models/paises-interface';
import { PaisServicioService } from 'src/app/services/pais-servicio.service';

import { DocumentosInterface } from 'src/app/models/documentos-interface';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonButtons,
  ],
})
export class AddClientComponent implements OnInit {
  paises = signal<PaisesInterface[]>([]);
  documentos = signal<DocumentosInterface[]>([]);
  
  nuevoUsuario = <UsuariosInterface[]>[];

  datacliente = {
    nombre: '',
    segundo_nombre: '',
    apellido: '',
    segundo_apellido: '',
    telefono: '',
    direccion: '',
    id_tipo_documento: '',
    documento: '',
    fecha_expedicion: '',
    correo: '',
    id_pais: '',
    observacion_cliente: '',
    observacion_comercial: '',
    observacion_soporte: '',
    observacion_cuenta: '',
    fecha_creacion: '',
    id_usuario_sensei: '',
    fecha_modificacion: '',
  }


  constructor(private mdlController: ModalController,
    private paisServicioService: PaisServicioService,
    private documentosService: DocumentosService,
  ) {}

  ngOnInit() { }

  listarPaises(){
    this.paisServicioService.getPaises().subscribe({
      next: (respuesta: PaisesInterface[]) => {
        console.log(respuesta)
        this.paises.set(respuesta)
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  listarDocumentos(){
    this.documentosService.getDocuments().subscribe({
      next: (res: DocumentosInterface[]) => {
        console.log(res)
        this.documentos.set(res)
      }
    })
  }

  cancelar(){
    return this.mdlController.dismiss(null, "cancelar")
  }

  guardar(){
    return this.mdlController.dismiss(this.datacliente, "guardar")
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
