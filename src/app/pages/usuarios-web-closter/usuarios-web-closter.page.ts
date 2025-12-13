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
import { RouterLink } from '@angular/router';
import { UsuariosWebClosterService } from 'src/app/core/services/usuarios-webcloster.service';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
import { AddUsuariosWcComponent } from 'src/app/components/webcloster/add-usuarios-wc/add-usuarios-wc.component';
import { EditUsuariosWcComponent } from 'src/app/components/webcloster/edit-usuarios-wc/edit-usuarios-wc.component';
import { DeleteUsuariosWcComponent } from 'src/app/components/webcloster/delete-usuarios-wc/delete-usuarios-wc.component';
import type { InfiniteScrollCustomEvent } from '@ionic/angular';

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
    RouterLink
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

  // TODO: INICIO MODALES DE ALERTA
  private async showSuccesAlert(mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Acción realizada con éxito',
      message: `${mensaje}`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showErrorAlert(mensaje?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Ups, algo ha fallado!',
      message: `${mensaje}`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }
  // TODO: FIN MODALES DE ALERTA


  // * INICIO OPERACIONES CRUD
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
          this.showSuccesAlert("Usuario agregado satisfactoriamente");
        },
        error: (err) => {
          this.showErrorAlert("Error al agregar el usuario, por favor intenta de nuevo");
        },
      });
    }
  }

  async editUsuario(usuario: UsuariosWebClosterInterface): Promise<void> {
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
        next: (_res: UsuariosWebClosterInterface[]) => {
          this.usuariosWebClosterService.getUsuariosWebCloster().subscribe({
            next: (_res: UsuariosWebClosterInterface[]) => {
              this.usuariosWc.set(_res);
              this.applyFiltersAndPaging();
            },
          });
          this.showSuccesAlert("Usuario editado satisfactoriamente");
        },
        error: () => {
          this.showErrorAlert("Error al editar el usuario, por favor intenta de nuevo");
        },
      });
    }
  }

  async eliminarUsuarioWebCloster(usuario: UsuariosWebClosterInterface): Promise<void>{
    const modal = await this.modalController.create({
      component: DeleteUsuariosWcComponent,
      componentProps: {
        dataUsuarioWc: usuario,
      },
      
    })
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === "guardar"){
      this.usuariosWebClosterService.deleteUsuarioWebCloster(data.id_usuario_wc).subscribe({
        next: async (_res: UsuariosWebClosterInterface[]) => {
          this.usuariosWebClosterService.getUsuariosWebCloster().subscribe({
            next: (_res: UsuariosWebClosterInterface[]) => {
              this.usuariosWc.set(_res);
              this.applyFiltersAndPaging(); 
            },
          });
          this.showSuccesAlert("Usuario eliminado satisfactoriamente");
        },
        error: () => {
          this.showErrorAlert("Error al eliminar el usuario, por favor intenta de nuevo");
        },
      })
    }
  }
  // * FIN OPERACIONES CRUD
}
