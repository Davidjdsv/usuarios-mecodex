import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonThumbnail,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonSearchbar,
  IonInfiniteScroll,
  AlertController,
  ModalController,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AddClientComponent } from 'src/app/components/add-client/add-client.component';
import { EditClientComponent } from 'src/app/components/edit-client/edit-client.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonItem,
    IonLabel,
    IonText,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterLink,
    IonSearchbar,
    NotFoundComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UsuariosPage implements OnInit {
  folder = signal('Clientes Mecodex');
  // * Una señal de tipo array de UsuariosInterface que contiene un array vacío como valor inicial
  usuarios = signal<UsuariosInterface[]>([]);

  // * Señal para guardar los usuarios originales sin filtrar
  usuariosOriginales = signal<UsuariosInterface[]>([]);

  // * Una señal de tipo string que contiene una cadena vacía como valor inicial.
  // * Se utiliza para almacenar el texto de búsqueda ingresado por el usuario en el buscador que es enviada por [(ngModel)]="searchUsers".
  searchUsers = signal<string>('');

  // * Índice para controlar desde dónde cargar más usuarios
  indiceActual = signal<number>(0);

  // * Límite máximo de usuarios a mostrar por scroll del ion-infinite-scroll
  LIMITE_USUARIOS = 10;

  cont_usuarios_pro_plus = signal<number>(0);
  cont_usuarios_pro_plus_web = signal<number>(0);
  cont_usuarios_pro = signal<number>(0);
  cont_usuarios_lite = signal<number>(0);

  cont_usuarios_totales = signal<number>(0);

  // Se puede injectar las dependencias en el constructor (Clásico)
  constructor(
    private mdlController: ModalController,
    private alertController: AlertController
  ) {}

  // O se pueden injectar por inject (Mas moderno)
  private usuariosServices = inject(UsuariosService);

  ngOnInit() {
    this.usuariosServices.getUsuarios().subscribe({
      next: (res: UsuariosInterface[]) => {
        // Guardar los usuarios originales sin modificar
        this.usuariosOriginales.set(res);
        // Establecer el índice inicial en 0
        this.indiceActual.set(0);
        // Cargar los primeros usuarios
        this.cargarUsuariosInicial();
        // Contar usuarios por tipo después de cargar
        this.contarUsuariosPorTipo();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // * Método para cargar los primeros usuarios al iniciar (Según la cantidad LIMITE_USUARIOS)
  cargarUsuariosInicial() {
    const usuariosInicial = this.usuariosOriginales().slice(
      0,
      this.LIMITE_USUARIOS
    );
    this.usuarios.set(usuariosInicial);
    this.indiceActual.set(this.LIMITE_USUARIOS);
  }

  // * Método para contar los usuarios por tipo (más eficiente)
  // * Recorre el array una sola vez en lugar de 5 veces
  contarUsuariosPorTipo() {
    // Objeto para almacenar los contadores
    const contadores = {
      proPlus: 0,
      proPlusWeb: 0,
      pro: 0,
      lite: 0,
      total: 0,
    };

    // Recorrer una sola vez y contar según el plan
    this.usuariosOriginales().forEach((usuario) => {
      // Incrementar contador total
      contadores.total++;

      // Clasificar por tipo de plan
      switch (usuario.PLAN_MECODEX) {
        case 'PRO PLUS':
          contadores.proPlus++;
          break;
        case 'PRO PLUS WEB':
          contadores.proPlusWeb++;
          break;
        case 'PRO':
          contadores.pro++;
          break;
        case 'LITE':
          contadores.lite++;
          break;
      }
    });

    // Actualizar todas las señales con los contadores
    this.cont_usuarios_pro_plus.set(contadores.proPlus);
    this.cont_usuarios_pro_plus_web.set(contadores.proPlusWeb);
    this.cont_usuarios_pro.set(contadores.pro);
    this.cont_usuarios_lite.set(contadores.lite);
    this.cont_usuarios_totales.set(contadores.total);
  }

  // * Método que filtra los usuarios basados en la cadena de búsqueda
  // * Se ejecuta cada vez que el usuario escribe en el searchbar
  filterUsers() {
    // Obtener el texto de búsqueda y convertir a minúsculas
    const query = this.searchUsers().toLowerCase();

    // Si la búsqueda está vacía, mostrar todos los usuarios originales
    if (!query || query.trim() === '') {
      this.usuarios.set(this.usuariosOriginales());
      return;
    }

    // Filtrar usuarios que coincidan por nombre, correo o teléfono
    const usuariosFiltrados = this.usuariosOriginales().filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(query) ||
        usuario.correo.toLowerCase().includes(query) ||
        usuario.telefono.toLowerCase().includes(query) ||
        usuario.documento.trim().toLowerCase().includes(query)
    );

    // Verificar si encontró usuarios
    if (usuariosFiltrados.length === 0) {
      console.log('No se encontró ningún usuario');
    } else {
      console.log(`Se encontraron ${usuariosFiltrados.length} usuario(s)`);
    }

    // Actualizar la señal con los usuarios filtrados
    this.usuarios.set(usuariosFiltrados);
  }

  // * Método para cargar más usuarios cuando se alcanza el final de la lista
  loadMore(event: any) {
    // Obtener el índice actual (desde dónde cargar)
    const indice = this.indiceActual();

    // Obtener el total de usuarios disponibles
    const totalUsuarios = this.usuariosOriginales().length;

    // Verificar si ya se cargaron todos los usuarios
    if (indice >= totalUsuarios) {
      console.log('Todos los usuarios han sido cargados');
      event.target.disabled = true; // Deshabilitar infinite scroll
      event.target.complete();
      return;
    }

    // Calcular el siguiente índice (índice actual + LIMITE_USUARIOS)
    const siguienteIndice = Math.min(
      indice + this.LIMITE_USUARIOS,
      totalUsuarios
    );

    // Obtener los nuevos usuarios desde indice hasta siguienteIndice
    const nuevosUsuarios = this.usuariosOriginales().slice(
      indice,
      siguienteIndice
    );

    // Agregar los nuevos usuarios a los que ya están mostrados
    const usuariosActuales = this.usuarios();
    const usuariosCombinados = [...usuariosActuales, ...nuevosUsuarios];

    // Actualizar la señal de usuarios
    this.usuarios.set(usuariosCombinados);

    // Actualizar el índice actual para la próxima carga
    this.indiceActual.set(siguienteIndice);

    // Finalizar la carga
    event.target.complete();
  }

  // * Modales de alerta

  private async showAddSuccesAlert(nombre?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Cliente agregado',
      message: `El cliente ${nombre || ''} ha sido registrado con éxito.`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showEditSuccesAlert(nombre?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Cliente editado correctamente',
      message: `El cliente ${nombre || ''} ha sido editado con éxito.`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showEditErrorAlert(nombre?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error al editar cliente',
      message: `El cliente ${nombre || ''} no ha sido editado con éxito.`,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showErrorAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error al agregar cliente',
      message: 'Ups! Ocurrió un error al registrar el cliente',
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  // * Fin de modales de alerta

  async addClient() {
    const modal = await this.mdlController.create({
      component: AddClientComponent,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log('datos recibidos de la moda: ', data, role);

    if (role === 'guardar') {
      this.usuariosServices.createUser(data).subscribe({
        next: async (_res: any) => {
          // Tras crear el cliente, recargamos la lista desde el backend para reflejar los cambios.
          this.usuariosServices.getUsuarios().subscribe({
            next: async (lista: UsuariosInterface[]) => {
              this.usuariosOriginales.set(lista);

              // Mostrar alerta de éxito
              await this.showAddSuccesAlert(data.nombre);

              // Reinicia la carga inicial y actualiza contadores
              this.cargarUsuariosInicial();
              this.contarUsuariosPorTipo();
            },
            error: async (err) => {
              console.log('Error al refrescar la lista de usuarios: ', err);
              await this.showErrorAlert();
            },
          });
        },
        error: (err) => {
          console.log('Error al crear el usuario: ', err);
          if (err?.error) {
            console.log('Detalle del backend: ', err.error);
          }
        },
      });
    }
  }

  async editClient(usuario: UsuariosInterface) {
    const modal = await this.mdlController.create({
      component: EditClientComponent,
      componentProps: {
        datacliente: usuario, // Obtener los datos del cliente
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'guardar') {
      this.usuariosServices.updateUser(data).subscribe({
        next: async (_res: any) => {
          // Tras actualizar el cliente, recargamos la lista desde el backend para reflejar los cambios.
          this.usuariosServices.getUsuarios().subscribe({
            next: async (lista: UsuariosInterface[]) => {
              this.usuariosOriginales.set(lista);

              // Mostrar alerta de éxito
              await this.showEditSuccesAlert(data.nombre);

              // Reinicia la carga inicial y actualiza contadores
              this.cargarUsuariosInicial();
              this.contarUsuariosPorTipo();
            },
            error: async (err) => {
              console.log('Error al refrescar la lista de usuarios: ', err);
              await this.showEditErrorAlert();
            },
          });
        },
        error: (err) => {
          console.log('Error al actualizar el usuario: ', err);
          if (err?.error) {
            console.log('Detalle del backend: ', err.error);
          }
          this.usuariosServices.updateUser(usuario);
        },
      });
    }
  }
}
