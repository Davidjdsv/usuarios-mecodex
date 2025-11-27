import { Component, OnInit, signal, inject, computed, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  ModalController, } from '@ionic/angular/standalone';
import { PaisServicioService } from 'src/app/core/services/pais-servicio.service';
import { PaisesInterface } from 'src/app/models/paises-interface';
import { CuentaService } from 'src/app/core/services/cuenta.service';
import { LicenciaService } from 'src/app/core/services/licencia.service';
import { LicenciaInterface } from 'src/app/models/licencia';
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

  @Input() id_cliente: number | null = null;

  cuentaService = inject(CuentaService)
  licenciaService = inject(LicenciaService)

  paises = signal<PaisesInterface[]>([])
  licencias = signal<LicenciaInterface[]>([])

  getCurrentIdCliente = signal<number | null>(null)

  dataCuenta = {
    correo: "",
    password: "",
    id_licencia: 0,
    estado: "",
    id_pais: 0,
    id_cliente: this.getCurrentIdCliente(),
    fecha: new Date().toLocaleDateString(),
  }

  ngOnInit() {
    // Una vez cargado el componente, se le asigna el id que se obtiene desde las propiedades del componente
    this.getCurrentIdCliente.set(this.id_cliente)
  }

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

  listarLicencias(){
    this.licenciaService.getLicenciasService().subscribe({
      next: (licencias) => {
        this.licencias.set(licencias.data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  idLicencia = signal<number | null>(null);
  showIdlicencia = computed(() => this.idLicencia());

  getLicenciaSeleccionada(event: CustomEvent) {
    console.log('ionChange fired with value: ' + event.detail.value);
    return this.idLicencia.set(event.detail.value);
  }



  // Método para guardar la licencia seleccionada
  // setIdLicencia(valor: number): void {
  //   this.cuentaService.idLicenciaSeleccionada.set(valor);
  // }
  
  // // Método para actualizar el plan. Obtiene el id que se seleccionó en el select.
  // actualizarPlan(idCliente: number): void {
  //   const licencia = this.cuentaService.idLicenciaSeleccionada();
    
  //   if (licencia === null) {
  //     console.error('Debe seleccionar una licencia');
  //     return;
  //   }
    
  //   this.cuentaService.updateCuentaLicencia(licencia, idCliente).subscribe({
  //     next: (res) => {
  //       console.log('Plan actualizado:', res);
  //       // Aquí puedes mostrar un mensaje de éxito
  //     },
  //     error: (err) => {
  //       console.error('Error al actualizar:', err);
  //       // Aquí puedes mostrar un mensaje de error
  //     }
  //   });
  // }

  guardar(){
    this.dataCuenta.id_cliente = this.getCurrentIdCliente()
    return this.modalController.dismiss(this.dataCuenta, "guardar")
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
