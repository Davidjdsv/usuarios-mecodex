import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PaisesInterface } from 'src/app/models/paises-interface';
import { PaisServicioService } from 'src/app/services/pais-servicio.service';

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
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
  ],
})
export class AddClientComponent implements OnInit {
  nuevoUsuario = <UsuariosInterface[]>[];
  paises = signal<PaisesInterface[]>([]);
  usuario = this.nuevoUsuario[0]

  constructor(private usuariosService: UsuariosService, private paisServicioService: PaisServicioService) {}

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
}
