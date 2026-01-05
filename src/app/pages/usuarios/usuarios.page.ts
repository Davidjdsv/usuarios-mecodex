import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
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
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';

import { UsuariosInterface } from 'src/app/models/usuarios-interface';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { CuentaService } from 'src/app/core/services/cuenta.service';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AddClientComponent } from 'src/app/components/clientes/add-client/add-client.component';
import { EditClientComponent } from 'src/app/components/clientes/edit-client/edit-client.component';
import { DeleteClientComponent } from 'src/app/components/clientes/delete-client/delete-client.component';
import { CacheUsuarioService } from 'src/app/core/services/cache/cache-usuario.service';
import { CuentaInterface } from 'src/app/models/cuenta-interface';
import { CacheCuentaService } from 'src/app/core/services/cache/cache-cuenta.service';

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
    IonCardHeader,
    IonCardTitle,
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
    IonSearchbar,
    NotFoundComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSegment,
    IonSegmentButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosPage implements OnInit {
  folder = signal('Clientes Mecodex');
  
  // * SIGNALS PARA CLIENTES
  usuarios = signal<UsuariosInterface[]>([]);
  usuariosOriginales = signal<UsuariosInterface[]>([]);
  indiceActual = signal<number>(0);
  LIMITE_USUARIOS = 5;

  // * SIGNALS PARA CUENTAS
  cuentas = signal<CuentaInterface[]>([]);
  cuentasOriginales = signal<CuentaInterface[]>([]);
  indiceActualCuentas = signal<number>(0);
  LIMITE_CUENTAS = 5;

  // * SIGNAL PARA BÚSQUEDA (compartido)
  searchUsers = signal<string>('');
  searchCuentas = signal<string>('');

  // * CONTADORES
  cont_usuarios_pro_plus = signal<number>(0);
  cont_usuarios_pro_plus_web = signal<number>(0);
  cont_usuarios_pro = signal<number>(0);
  cont_usuarios_lite = signal<number>(0);
  cont_usuarios_totales = signal<number>(0);

  id = signal<number | null>(null);

  // * SIGNAL PARA EL SEGMENT
  selectedSegment = signal<string>('clientes');
  
  private mdlController = inject(ModalController);
  private alertController = inject(AlertController);
  private router = inject(Router);
  private usuariosServices = inject(UsuariosService);
  private cacheService = inject(CacheUsuarioService);
  private cuentaService = inject(CuentaService);
  private cacheCuentaService = inject(CacheCuentaService);

  constructor() {
    effect(() => {
      const segment = this.selectedSegment();
      console.log('Segment cambió a:', segment);
      
      // Solo ejecuta la carga si ya pasó el ngOnInit
      if (segment === 'clientes') {
        // Si ya hay datos de usuarios cargados, no hace nada
        if (this.usuariosOriginales().length > 0) {
          this.cargarUsuariosInicial();
        }
      } else if (segment === 'cuentas') {
        // Si no hay cuentas cargadas, las carga
        if (this.cuentasOriginales().length === 0) {
          this.cargarCuentas();
        } else {
          // Si ya están cargadas, solo muestra las primeras
          this.cargarCuentasInicial();
        }
      }
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  private cargarClientes() {
    if (this.cacheService.isCacheValido()) {
      const usuariosCache = this.cacheService.getUsuarios();
      this.usuariosOriginales.set(usuariosCache);
      this.cargarUsuariosInicial();
      this.contarUsuariosPorTipo();
    } else {
      this.usuariosServices.getUsuarios().subscribe({
        next: (res: UsuariosInterface[]) => {
          this.cacheService.setUsuarios(res);
          this.usuariosOriginales.set(res);
          this.cargarUsuariosInicial();
          this.contarUsuariosPorTipo();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  cargarUsuariosInicial() {
    const usuariosInicial = this.usuariosOriginales().slice(
      0,
      this.LIMITE_USUARIOS
    );
    this.usuarios.set(usuariosInicial);
    this.indiceActual.set(this.LIMITE_USUARIOS);
  }

  // 👇 MÉTODOS PARA CARGAR CUENTAS
  private cargarCuentas() {
    if (this.cacheCuentaService.isCacheValido()) {
      const cuentasCache = this.cacheCuentaService.getCuentas();
      this.cuentasOriginales.set(cuentasCache);
      this.cargarCuentasInicial();
    } else {
      this.cuentaService.getCuentas().subscribe({
        next: (res: CuentaInterface[]) => {
          this.cacheCuentaService.setCuentas(res);
          this.cuentasOriginales.set(res);
          this.cargarCuentasInicial();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  cargarCuentasInicial() {
    const cuentasInicial = this.cuentasOriginales().slice(
      0,
      this.LIMITE_CUENTAS
    );
    this.cuentas.set(cuentasInicial);
    this.indiceActualCuentas.set(this.LIMITE_CUENTAS);
  }

  contarUsuariosPorTipo() {
    const contadores = {
      proPlus: 0,
      proPlusWeb: 0,
      pro: 0,
      lite: 0,
      total: 0,
    };

    this.usuariosOriginales().forEach((usuario) => {
      contadores.total++;

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

    this.cont_usuarios_pro_plus.set(contadores.proPlus);
    this.cont_usuarios_pro_plus_web.set(contadores.proPlusWeb);
    this.cont_usuarios_pro.set(contadores.pro);
    this.cont_usuarios_lite.set(contadores.lite);
    this.cont_usuarios_totales.set(contadores.total);
  }

  filterUsers() {
    const query = this.searchUsers().toLowerCase();

    if (!query || query.trim() === '') {
      this.indiceActual.set(0);
      this.cargarUsuariosInicial();
      return;
    }

    const usuariosFiltrados = this.usuariosOriginales().filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(query) ||
        usuario.correo.toLowerCase().includes(query) ||
        usuario.telefono.toLowerCase().includes(query) ||
        usuario.documento.trim().toLowerCase().includes(query)
    );

    if (usuariosFiltrados.length === 0) {
      console.log('No se encontró ningún usuario');
    } else {
      console.log(`Se encontraron ${usuariosFiltrados.length} usuario(s)`);
    }

    this.usuarios.set(usuariosFiltrados);
  }

  filterCuentas() {
    const query = this.searchCuentas().toLowerCase();

    if (!query || query.trim() === '') {
      this.indiceActualCuentas.set(0);
      this.cargarCuentasInicial();
      return;
    }

    const cuentasFiltradas = this.cuentasOriginales().filter(
      (cuenta) =>
        cuenta.cliente_nombre.toLowerCase().includes(query) ||
        cuenta.correo.toLowerCase().includes(query)
    );

    if (cuentasFiltradas.length === 0) {
      console.log('No se encontró ninguna cuenta');
    } else {
      console.log(`Se encontraron ${cuentasFiltradas.length} cuenta(s)`);
    }

    this.cuentas.set(cuentasFiltradas);
    this.indiceActualCuentas.set(this.LIMITE_CUENTAS);
  }

  // 👇 Infinite scroll para CLIENTES
  loadMore(event: any) {
    const indice = this.indiceActual();
    const totalUsuarios = this.usuariosOriginales().length;
    console.log('Total usuarios:', totalUsuarios);

    if (indice >= totalUsuarios) {
      console.log('Todos los usuarios han sido cargados');
      event.target.disabled = true;
      event.target.complete();
      return;
    }

    const siguienteIndice = Math.min(
      indice + this.LIMITE_USUARIOS,
      totalUsuarios
    );

    const nuevosUsuarios = this.usuariosOriginales().slice(
      indice,
      siguienteIndice
    );

    const usuariosActuales = this.usuarios();
    const usuariosCombinados = [...usuariosActuales, ...nuevosUsuarios];

    this.usuarios.set(usuariosCombinados);
    this.indiceActual.set(siguienteIndice);

    event.target.complete();
  }

  // 👇 Infinite scroll para CUENTAS (nuevo método)
  loadMoreCuentas(event: any) {
    const indice = this.indiceActualCuentas();
    const totalCuentas = this.cuentasOriginales().length;
    console.log('Total cuentas:', totalCuentas);

    if (indice >= totalCuentas) {
      console.log('Todas las cuentas han sido cargadas');
      event.target.disabled = true;
      event.target.complete();
      return;
    }

    const siguienteIndice = Math.min(
      indice + this.LIMITE_CUENTAS,
      totalCuentas
    );

    const nuevasCuentas = this.cuentasOriginales().slice(
      indice,
      siguienteIndice
    );

    const cuentasActuales = this.cuentas();
    const cuentasCombinadas = [...cuentasActuales, ...nuevasCuentas];

    this.cuentas.set(cuentasCombinadas);
    this.indiceActualCuentas.set(siguienteIndice);

    event.target.complete();
  }

  /**
   * Navega al detalle de un usuario específico
   * Usa el cache en memoria (usuariosOriginales) para evitar modificar el array de usuarios mostrados
   * @param usuarioId - ID del usuario
   * @param cuentaCliente - ID de la cuenta del cliente
   */
getUser(usuarioId: number, cuentaCliente: number) {
  // 👇 Busca en memoria SIN modificar el array
  const usuarioEncontrado = this.usuariosOriginales().find(
    (usuario) => usuario.id === usuarioId && usuario.id_cuenta === cuentaCliente
  );

  if (!usuarioEncontrado) {
    console.error('⚠️ Usuario no encontrado con ID:', usuarioId, 'y cuenta:', cuentaCliente);
    return;
  }

  // 👇 Navega directamente sin tocar el signal usuarios()
  this.router.navigate(['/usuario', usuarioEncontrado.id], {
    queryParams: { id_cuenta: cuentaCliente }
  });
}

  // * INICIO DE MODALES DE ALERTA
  private async showSuccessAlert(mensaje?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Operación exitosa',
      message: mensaje || 'La operación se ha realizado con éxito.',
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }

  private async showErrorAlert(mensaje?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje || 'Ups! Ocurrió un error al ejecutar la acción',
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }
  // * FIN DE MODALES DE ALERTA

  // * INICIO DE OPERACIONES DE CRUD
  async addClient() {
    const modal = await this.mdlController.create({
      component: AddClientComponent,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'guardar') {
      this.usuariosServices.createUser(data).subscribe({
        next: async (_res: any) => {
          this.cacheService.invalidarCache();
          this.usuariosServices.getUsuarios().subscribe({
            next: async (lista: UsuariosInterface[]) => {
              this.cacheService.setUsuarios(lista);
              this.usuariosOriginales.set(lista);

              await this.showSuccessAlert(
                'El cliente fue agregado satisfactoriamente!'
              );

              this.cargarUsuariosInicial();
              this.contarUsuariosPorTipo();
            },
            error: async (err) => {
              await this.showErrorAlert('Algo falló al agregar al cliente');
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

  async deleteClient(usuario: UsuariosInterface) {
    const modal = await this.mdlController.create({
      component: DeleteClientComponent,
      componentProps: {
        userData: usuario,
      },
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirmar') {
      this.usuariosServices.deleteUser(usuario.id).subscribe({
        next: async (_res) => {
          this.cacheService.invalidarCache();
          this.usuariosServices.getUsuarios().subscribe({
            next: async (lista: UsuariosInterface[]) => {
              this.cacheService.setUsuarios(lista);
              this.usuariosOriginales.set(lista);

              await this.showSuccessAlert(
                'El cliente fue eliminado satisfactoriamente!'
              );

              this.cargarUsuariosInicial();
              this.contarUsuariosPorTipo();
            },
            error: async (err) => {
              await this.showErrorAlert('Algo falló al eliminar al cliente');
            },
          });
        },
      });
    }
  }

  async editClient(usuario: UsuariosInterface) {
    const modal = await this.mdlController.create({
      component: EditClientComponent,
      componentProps: {
        datacliente: usuario,
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'guardar') {
      this.usuariosServices.updateUser(data).subscribe({
        next: async (_res: any) => {
          this.cacheService.invalidarCache();
          this.usuariosServices.getUsuarios().subscribe({
            next: async (lista: UsuariosInterface[]) => {
              this.cacheService.setUsuarios(lista);
              this.usuariosOriginales.set(lista);

              await this.showSuccessAlert(
                'El cliente fue actualizado satisfactoriamente!'
              );

              this.cargarUsuariosInicial();
              this.contarUsuariosPorTipo();
            },
            error: async () => {
              await this.showErrorAlert('Algo falló al actualizar al cliente');
            },
          });
        },
        error: async (err) => {
          console.log('Error al actualizar el usuario: ', err);
          await this.showErrorAlert('Algo falló al actualizar al cliente');
          if (err?.error) {
            console.log('Detalle del backend: ', err.error);
          }
          this.usuariosServices.updateUser(usuario);
        },
      });
    }
  }
  // * FIN DE OPERACIONES DE CRUD

  // * Método para cambiar el segment activo
  onSegmentChange(event: any) {
    this.selectedSegment.set(event.detail.value);
    // 👆 El effect() detectará el cambio automáticamente
  }
}
