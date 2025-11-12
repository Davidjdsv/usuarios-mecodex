import { Component, OnInit, Input } from '@angular/core';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonButton,
  IonIcon,
  IonFooter,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonButton,
    IonIcon,
    IonFooter,
    IonButtons
  ]
})
export class DeleteClientComponent implements OnInit {
  // Recibir los datos que le manda el usuario
  @Input() userData: UsuariosInterface = {} as UsuariosInterface;

  // Inyectar el modalController para poder ser usado
  constructor(private mdlController: ModalController) {}

  ngOnInit() {}

  // * Crear tanto la opción de cancelar como confirmar

  // Si se elige cancelar, el dato es null y el role es cancelar
  cancel() {
    return this.mdlController.dismiss(null, 'cancelar');
  }

  // Si se elige confimar, el dato es el id del usuario para ser eliminado y el role es confirmar
  confirm() {
    return this.mdlController.dismiss(this.userData.id, 'confirmar');
  }
}
