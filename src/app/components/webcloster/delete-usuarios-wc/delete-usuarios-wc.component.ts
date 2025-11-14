import { Component, OnInit, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonText,
  IonFooter,
  IonButtons,
  IonButton,
  ModalController,
} from '@ionic/angular/standalone';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';

@Component({
  selector: 'app-delete-usuarios-wc',
  templateUrl: './delete-usuarios-wc.component.html',
  styleUrls: ['./delete-usuarios-wc.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonText,
    IonFooter,
    IonButtons,
    IonButton,
  ],
})
export class DeleteUsuariosWcComponent implements OnInit {
  @Input() dataUsuarioWc: UsuariosWebClosterInterface = {} as UsuariosWebClosterInterface;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  guardar(){
    this.modalController.dismiss(this.dataUsuarioWc, "guardar")
  }

  cancelar(){
    this.modalController.dismiss(null, "cancelar")
  }
}
