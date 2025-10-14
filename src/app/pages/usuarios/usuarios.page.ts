import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
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
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

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
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterLink,
    IonSearchbar,
    NotFoundComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosPage implements OnInit {
  folder = signal('Usuarios Mecodex');
  // * Una señal de tipo array de UsuariosInterface que contiene un array vacío como valor inicial
  usuarios = signal<UsuariosInterface[]>([]);

  // * Señal para guardar los usuarios originales sin filtrar
  usuariosOriginales = signal<UsuariosInterface[]>([]);

  // * Una señal de tipo string que contiene una cadena vacía como valor inicial. 
  // * Se utiliza para almacenar el texto de búsqueda ingresado por el usuario en el buscador que es enviada por [(ngModel)]="searchUsers".
  searchUsers = signal<string>('');

  // * Variable para controlar cuántos usuarios se han cargado (máximo 20)
  usuariosLimitados = signal<UsuariosInterface[]>([]);

  // * Índice para controlar desde dónde cargar más usuarios
  indiceActual = signal<number>(0);

  // * Límite máximo de usuarios a mostrar
  LIMITE_USUARIOS = 10;

  constructor() {}

  private usuariosServices = inject(UsuariosService)

  ngOnInit() {
      this.usuariosServices.getUsuarios().subscribe({
        next: (res: UsuariosInterface[]) => {
          // Guardar los usuarios originales sin modificar
          this.usuariosOriginales.set(res);
          // Establecer el índice inicial en 0
          this.indiceActual.set(0);
          // Cargar los primeros 20 usuarios
          this.cargarUsuariosInicial();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
  }

  // * Método para cargar los primeros usuarios al iniciar
  cargarUsuariosInicial() {
    const usuariosInicial = this.usuariosOriginales().slice(0, this.LIMITE_USUARIOS);
    this.usuarios.set(usuariosInicial);
    this.indiceActual.set(this.LIMITE_USUARIOS);
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
    const usuariosFiltrados = this.usuariosOriginales().filter((usuario) =>
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
  loadMore(event: any){
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
    const siguienteIndice = Math.min(indice + this.LIMITE_USUARIOS, totalUsuarios);
    
    // Obtener los nuevos usuarios desde indice hasta siguienteIndice
    const nuevosUsuarios = this.usuariosOriginales().slice(indice, siguienteIndice);
    
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
}
