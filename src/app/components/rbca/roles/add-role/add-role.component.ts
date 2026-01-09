import { Component, OnInit } from '@angular/core';
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
  IonNote
} from '@ionic/angular/standalone';

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
    IonNote
  ],
})
export class AddRoleComponent implements OnInit {
  dataRole = {
    nombre_rol: '',
    descripcion: '',
    activo: true,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    this.modalCtrl.dismiss(this.dataRole, 'confirm');
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.modalCtrl.dismiss(this.dataRole, 'confirm');
    } else {
      // Marca los controles como tocados para que se muestren estados de error si agregas mensajes
      Object.values(form.controls).forEach(c => c.markAsTouched())
    }
  }
}
