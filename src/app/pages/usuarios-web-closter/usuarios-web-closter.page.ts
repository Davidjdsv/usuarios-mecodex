import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonText,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  ModalController,
  AlertController
} from '@ionic/angular/standalone';
import { UsuariosWebClosterService } from 'src/app/core/services/usuarios-webcloster.service';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
import { AddUsuariosWcComponent } from 'src/app/components/webcloster/add-usuarios-wc/add-usuarios-wc.component';

@Component({
  selector: 'app-usuarios-web-closter',
  templateUrl: './usuarios-web-closter.page.html',
  styleUrls: ['./usuarios-web-closter.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonSearchbar,
    IonText,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosWebClosterPage implements OnInit {
  folder = signal('Usuarios web closter')
  usuariosWc = signal(<UsuariosWebClosterInterface[]>([]))

  constructor(private usuariosWebClosterService: UsuariosWebClosterService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.getUsuariosWebCloster()
  }

  getUsuariosWebCloster(){
    this.usuariosWebClosterService.getUsuariosWebCloster().subscribe({
      next: (res: UsuariosWebClosterInterface[]) => {
        console.log(res)
        this.usuariosWc.set(res)
      }
    })
  }

  // TODO: Modales de alerta
  private async showAddSuccesAlert(nombre?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Usuario agregado',
      message: `El usuario ${nombre || ''} ha sido registrado con éxito.`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showEditSuccesAlert(nombre?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Usuario editado correctamente',
      message: `El usuario ${nombre || ''} ha sido editado con éxito.`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showDeleteSuccesAlert(nombre?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Usuario eliminado correctamente',
      message: `El usuario ${nombre || ''} ha sido eliminado con éxito.`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showErrorAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Ups! Ocurrió un error al realizar esta acción',
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  // Añadiendo un nuevo usuario de webcloster
  async addUsuarioWebCloster(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddUsuariosWcComponent
    })
    await modal.present()

    const { data, role } = await modal.onWillDismiss();
    console.log("data:", data, "role:", role)

    if(role === "guardar"){
      this.usuariosWebClosterService.createUsuariosWebCloster(data).subscribe({
        next: (res: UsuariosWebClosterInterface[]) => {
          console.log(res)
          this.showAddSuccesAlert(data.nombre)
        },
        error: (err) => {
          console.error("Error al crear un nuevo usuario: ", err.message)
          this.showErrorAlert()
        }
      })
    }
  }

}
