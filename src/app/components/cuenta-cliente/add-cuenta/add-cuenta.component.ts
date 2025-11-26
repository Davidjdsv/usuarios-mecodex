import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput,
  IonDatetime,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonIcon,
  ModalController, } from '@ionic/angular/standalone';
import { PaisServicioService } from 'src/app/core/services/pais-servicio.service';
import { CuentaInterface } from 'src/app/models/cuenta-interface';
import { PaisesInterface } from 'src/app/models/paises-interface';
@Component({
  selector: 'app-add-cuenta',
  templateUrl: './add-cuenta.component.html',
  styleUrls: ['./add-cuenta.component.scss'],
  standalone: true,
  imports: [
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  FormsModule,
  ]
})
export class AddCuentaComponent  implements OnInit {

  constructor(private modalController: ModalController,
    private paisServicio: PaisServicioService,
  ) { }

  dataCuenta = signal<CuentaInterface | undefined>(undefined)
  paises = signal<PaisesInterface[]>([])

  mostrarDatetime = signal<boolean>(false);


  ngOnInit() {}

  listarPaises(){
    this.paisServicio.getPaises().subscribe({
      next: (paises) => {
        this.paises.set(paises)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  guardar(){
    return this.modalController.dismiss(this.dataCuenta(), "guardar")
  }

  cancelar(){
    return this.modalController.dismiss(null, "cancelar")
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.guardar()
    } else {
      Object.values(form.controls).forEach(c => c.markAsTouched())
    }
  }

}
