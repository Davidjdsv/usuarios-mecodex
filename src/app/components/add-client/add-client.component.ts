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
} from '@ionic/angular/standalone';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
  ],
})
export class AddClientComponent implements OnInit {
  nuevoUsuario = <UsuariosInterface[]>[];
  usuario = this.nuevoUsuario[0]

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.listarPaises()
  }

  listarPaises(){
    this.usuariosService.getUsuarios().subscribe({
      next: (respuesta: UsuariosInterface[]) => {
        console.log(respuesta)
        this.nuevoUsuario = respuesta
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }
}
