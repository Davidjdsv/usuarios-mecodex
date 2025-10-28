import { Component, OnInit, signal, Input } from '@angular/core';
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
import { PaisServicioService } from 'src/app/services/pais-servicio.service';
import { PaisesInterface } from 'src/app/models/paises-interface';

import { UsuariosInterface } from 'src/app/models/usuarios-interface';

import { DocumentosInterface } from 'src/app/models/documentos-interface';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
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
export class EditClientComponent  implements OnInit {

  paises = signal<PaisesInterface[]>([]);
  documentos = signal<DocumentosInterface[]>([]);
  @Input() datacliente: UsuariosInterface = {} as UsuariosInterface;

  constructor(private mdlController: ModalController, 
    private paisServicioService: PaisServicioService, 
    private documentosService: DocumentosService) { }

  ngOnInit() {}

    listarPaises(){
    this.paisServicioService.getPaises().subscribe({
      next: (respuesta: PaisesInterface[]) => {
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
