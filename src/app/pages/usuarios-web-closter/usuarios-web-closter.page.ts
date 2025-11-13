import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  computed,
} from '@angular/core';
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
  AlertController,
} from '@ionic/angular/standalone';
import { UsuariosWebClosterService } from 'src/app/core/services/usuarios-webcloster.service';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
import { AddUsuariosWcComponent } from 'src/app/components/webcloster/add-usuarios-wc/add-usuarios-wc.component';
import type { InfiniteScrollCustomEvent } from '@ionic/angular';
import { EditUsuariosWcComponent } from 'src/app/components/webcloster/edit-usuarios-wc/edit-usuarios-wc.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosWebClosterPage implements OnInit {
  folder = signal('Usuarios web closter');
  usuariosWc = signal(<UsuariosWebClosterInterface[]>[]);
  searchQuery = signal('');
  pageSize = signal(10);
  visibleCount = signal(10);
  visibleUsuariosWc = signal(<UsuariosWebClosterInterface[]>[]);
  hasMore = computed(
    () => this.filterUsuarios(this.searchQuery()).length > this.visibleCount()
  );

  constructor(
    private usuariosWebClosterService: UsuariosWebClosterService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.getUsuariosWebCloster();
  }

  getUsuariosWebCloster() {
    this.usuariosWebClosterService.getUsuariosWebCloster().subscribe({
      next: (res: UsuariosWebClosterInterface[]) => {
        console.log(res);
        this.usuariosWc.set(res);
        this.applyFiltersAndPaging();
      },
    });
  }

  onSearch(ev: any) {
    const value = ev?.detail?.value ?? ev?.target?.value ?? '';
    this.searchQuery.set(String(value).toLowerCase());
    this.visibleCount.set(this.pageSize());
    this.applyFiltersAndPaging();
  }

  loadMore(ev: InfiniteScrollCustomEvent) {
    this.visibleCount.update((n) => n + this.pageSize());
    this.applyFiltersAndPaging();
    ev.target.complete();
  }

  private applyFiltersAndPaging() {
    const filtered = this.filterUsuarios(this.searchQuery());
    const slice = filtered.slice(0, this.visibleCount());
    this.visibleUsuariosWc.set(slice);
  }

  // TODO: Buscar usuario por nombre, correo, contacto, documento o nombre de usuario
  private filterUsuarios(query: string): UsuariosWebClosterInterface[] {
    const q = query.trim();
    const list = this.usuariosWc();
    if (!q) return list;
    return list.filter((u) => {
      const nombre = (u.nombre_completo || '').toLowerCase();
      const correo = (u.correo || '').toLowerCase();
      const documento = (u.documento || '').toLocaleLowerCase();
      const usuario = (u.nombre_usuario || '').toLowerCase();
      const contacto = String(u.contacto || '');
      return (
        nombre.includes(q) ||
        correo.includes(q) ||
        contacto.includes(q) ||
        documento.includes(q) ||
        usuario.includes(q)
      );
    });
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
      component: AddUsuariosWcComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('data:', data, 'role:', role);

    if (role === 'guardar') {
      this.usuariosWebClosterService.createUsuariosWebCloster(data).subscribe({
        next: (res: UsuariosWebClosterInterface[]) => {
          this.usuariosWebClosterService.getUsuariosWebCloster().subscribe({
            next: (_res: UsuariosWebClosterInterface[]) => {
              this.usuariosWc.set(_res);
              this.applyFiltersAndPaging();
            },
          });
          console.log(res);
          this.showAddSuccesAlert(data.nombre);
        },
        error: (err) => {
          console.error('Error al crear un nuevo usuario: ', err.message);
          this.showErrorAlert();
        },
      });
    }
  }

  async editUsuario(usuario: UsuariosWebClosterInterface) {
    const modal = await this.modalController.create({
      component: EditUsuariosWcComponent,
      componentProps: {
        dataUsuarioWc: usuario,
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('data:', data, 'role:', role);

    if (role === 'guardar') {
      this.usuariosWebClosterService.updateUsuariosWebCloster(data).subscribe({
        next: (res: UsuariosWebClosterInterface[]) => {
          this.usuariosWebClosterService.getUsuariosWebCloster().subscribe({
            next: (_res: UsuariosWebClosterInterface[]) => {
              this.usuariosWc.set(_res);
              this.applyFiltersAndPaging();
            },
          });
          console.log(res);
          this.showEditSuccesAlert(usuario.nombre_completo);
        },
        error: (err) => {
          console.error('Error al editar un usuario: ', err.message);
          this.showErrorAlert();
        },
      });
    }
  }
}
