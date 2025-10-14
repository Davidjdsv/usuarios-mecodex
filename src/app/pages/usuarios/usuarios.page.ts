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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonThumbnail,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar
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
    NotFoundComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosPage implements OnInit {
  folder = signal('Usuarios Mecodex');
  // * Una señal de tipo array de UsuariosInterface que contiene un array vacío como valor inicial
  usuarios = signal<UsuariosInterface[]>([]);

  // * Señal para guardar los usuarios originales sin filtrar
  usuariosOriginales = signal<UsuariosInterface[]>([]);

  // * Una señal de tipo string que contiene una cadena vacía como valor inicial
  searchUsers = signal<string>('');

  constructor() {}

  private usuariosServices = inject(UsuariosService)

  ngOnInit() {
      this.usuariosServices.getUsuarios().subscribe({
        next: (res: UsuariosInterface[]) => {
          // Guardar los usuarios originales sin modificar
          this.usuariosOriginales.set(res);
          this.usuarios.set(res);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
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
}
