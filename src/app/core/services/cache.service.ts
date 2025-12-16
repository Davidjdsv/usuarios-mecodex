import { Injectable, signal } from '@angular/core';
import { UsuariosInterface } from 'src/app/models/usuarios-interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // Caché para usuarios
  private usuariosCache = signal<UsuariosInterface[]>([]);

  // Indica si tiene cache valida
  private cacheValido = signal<boolean>(false);

  // Obtiene los datos del caché
  getusuarios(){
    return this.usuariosCache();
  }

  // Guarda los usuarios en caché
  setUsuarios(usuarios: UsuariosInterface[]){
    this.usuariosCache.set(usuarios);
    this.cacheValido.set(true);
  }

  // Verificar si el caché es valido
  isCacheValido(){
    return this.cacheValido();
  }

  // Invalida el caché (cuando agregas/editas/eliminas usuarios)
  invalidarCache() {
    this.cacheValido.set(false);
  }
}
